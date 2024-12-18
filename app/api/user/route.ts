
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getAuth, clerkClient } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export async function GET(req: NextRequest) {
  try {
    console.log('API route called');
    const { userId } = getAuth(req);

    if (!userId) {
      console.log('User not authenticated');
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    console.log('Authenticated user ID:', userId);

    // Check if user exists in Supabase
    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select('*, completed_modules(module_id)')
      .eq('id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // No rows returned
        console.log('Profile not found, creating new profile');

        // Fetch user data from Clerk
        const user = await clerkClient.users.getUser(userId);

        if (!user) {
          return NextResponse.json({ error: 'Error fetching Clerk user' }, { status: 500 });
        }

        console.log('Clerk user:', user);

        const newProfile = {
          id: userId,
          username: user.username || '',
          phone_number: user.phoneNumbers?.[0]?.phoneNumber || '',
          profile_pic: user.imageUrl || ''
        };

        const { data: newProfileData, error: insertError } = await supabase
          .from('user_profiles')
          .insert(newProfile)
          .select()
          .single();

        if (insertError) {
          console.error('Supabase insert error:', insertError);
          return NextResponse.json({ error: 'Error creating user profile in Supabase', details: insertError }, { status: 500 });
        }

        console.log('New profile created:', newProfileData);
        return NextResponse.json(newProfileData);
      } else {
        // Handle other fetch errors
        return NextResponse.json({ error: 'Error fetching user profile from Supabase', details: error }, { status: 500 });
      }
    }

    console.log('Existing profile found:', profile);
    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error in user API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const { moduleId } = await req.json();

    if (!moduleId) {
      return NextResponse.json({ error: 'Module ID is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('completed_modules')
      .insert({ user_id: userId, module_id: moduleId })
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Error marking module as completed', details: error }, { status: 500 });
    }

    return NextResponse.json({ message: 'Module marked as completed', data });
  } catch (error) {
    console.error('Error in POST route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
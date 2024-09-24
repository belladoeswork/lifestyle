import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js'
import { auth, clerkClient } from '@clerk/nextjs/server';


const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
    try {
        console.log('API route called');
        const { userId } = auth();
    
        if (!userId) {
            console.log('User not authenticated');

      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    console.log('Authenticated user ID:', userId);

    
        // Check if user exists in Supabase
        const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

            if (error) {
                console.error('Supabase error:', error);
                throw new Error('Error fetching user profile from Supabase');
            }

        if (!profile) {
            console.log('Profile not found, creating new profile');

            // User doesn't exist, create a new profile
            let clerkUser;
            try {
                clerkUser = await clerkClient.users.getUser(userId);
            } catch (clerkError) {
                console.error('Error fetching Clerk user:', clerkError);
                return NextResponse.json({ error: 'Error fetching Clerk user', details: clerkError }, { status: 500 });
            }
            console.log('Clerk user:', clerkUser);

            const newProfile = {
                id: userId,
                username: clerkUser.username || '',
                phone_number: clerkUser.primaryPhoneNumber?.phoneNumber || '',
                profile_pic: clerkUser.imageUrl || ''
            };

            console.log(clerkUser);


            const { data, error: insertError } = await supabase
                .from('profiles')
                .insert(newProfile)
                .single();

                if (insertError) {
                    console.error('Supabase insert error:', insertError);
                    return NextResponse.json({ error: 'Error creating user profile in Supabase', details: insertError }, { status: 500 });
                }

                console.log('New profile created:', data);
                return NextResponse.json(data);
        }
        console.log('Existing profile found:', profile);

        return NextResponse.json(profile);
    } catch (error) {
        console.error('Error in user API route:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';


export async function GET() {
  // Fetch all modules and their associated pages
  const { data: modules, error: moduleError } = await supabase
    .from('modules')
    .select('id, name, icon, pages (id, title, subtitle, content, interactive_element, rive_animation)');

  if (moduleError) {
    console.error('Error fetching modules:', moduleError);
    return NextResponse.json({ error: moduleError.message }, { status: 500 });
  }

  // Validate and transform the data if needed
  const processedModules = modules?.map(module => ({
    ...module,
    pages: module.pages?.map(page => ({
      ...page,
      // Handle rive_animation data if it exists
      rive_animation: page.rive_animation 
        ? (typeof page.rive_animation === 'string' 
          ? JSON.parse(page.rive_animation) 
          : page.rive_animation)
        : null
    }))
  }));

  return NextResponse.json(processedModules || [], { status: 200 });
}

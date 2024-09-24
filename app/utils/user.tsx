// import { supabase } from '@/lib/supabase';
// // import { auth } from '@clerk/nextjs/server';
// import { auth, currentUser } from '@clerk/nextjs';


// export async function getOrCreateUser() {
//   const { userId } = auth();
  
//   if (!userId) {
//     throw new Error('User not authenticated');
//   }

//   // Check if user exists in Supabase
//   const { data: profile, error } = await supabase
//     .from('profiles')
//     .select('*')
//     .eq('id', userId)
//     .single();

//   if (error && error.code !== 'PGRST116') {
//     throw new Error('Error fetching user profile');
//   }

//   if (!profile) {
//     // User doesn't exist, create a new profile
//     // const user = await currentUser();
//     // if (!user) {
//     //   throw new Error('User not found');
//     // }
//     const user = await auth().getUser(userId);

//     const newProfile = {
//       id: userId,
//       username: user.username || '',
//       phone_number: user.primaryPhoneNumber?.phoneNumber || ''
//     };

//     const { data, error: insertError } = await supabase
//       .from('profiles')
//       .insert(newProfile)
//       .single();

//     if (insertError) {
//       throw new Error('Error creating user profile');
//     }

//     return data;
//   }

//   return profile;
// }
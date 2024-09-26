// // import { supabase } from '@/lib/supabase';
// // import { auth, currentUser } from '@clerk/nextjs/server';

// // export async function getOrCreateUser() {
// //   const { userId } = auth();
  
// //   if (!userId) {
// //     throw new Error('User not authenticated');
// //   }

// //   // Check if user exists in Supabase
// //   const { data: profile, error } = await supabase
// //     .from('profiles')
// //     .select('*')
// //     .eq('id', userId)
// //     .single();

// //   if (error && error.code !== 'PGRST116') {
// //     throw new Error('Error fetching user profile');
// //   }

// //   if (!profile) {
// //     // User doesn't exist, create a new profile
// //     const user = await currentUser();
// //     if (!user) {
// //       throw new Error('User not found');
// //     }

// //     const newProfile = {
// //       id: userId,
// //       username: user.username || '',
// //       phone_number: user.primaryPhoneNumber?.phoneNumber || ''
// //     };

// //     const { data, error: insertError } = await supabase
// //       .from('profiles')
// //       .insert(newProfile)
// //       .single();

// //     if (insertError) {
// //       throw new Error('Error creating user profile');
// //     }

// //     return data;
// //   }

// //   return profile;
// // }



// return (
//     <div className="flex flex-col items-center space-y-8 p-4">
//       <div className="flex items-center justify-center w-64 h-64 border-2 border-gray-300 rounded-lg p-4">
//         {visibleIcons.map((icon, index) => (
//           <div key={index} className="mx-2">
//             {icon}
//           </div>
//         ))}
//       </div>
//       <div className="w-full max-w-md">
//         <div className="relative">
//           <div className="absolute top-1/2 left-0 w-full h-2 bg-yellow-100 rounded-full -translate-y-1/2">
//             <div 
//               className="absolute top-0 left-0 h-full bg-yellow-300 rounded-full" 
//               style={{ width: `${(sliderValue / 75) * 100}%` }}
//             ></div>
//           </div>
//           <Slider
//             min={0}
//             max={75}
//             step={25}
//             value={[sliderValue]}
//             onValueChange={handleSliderChange}
//             className="custom-slider"
//           />
//           <div className="absolute top-1/2 left-0 w-full flex justify-between -mt-2 pointer-events-none">
//             {[0, 25, 50, 75].map((stop, index) => (
//               <div 
//                 key={stop} 
//                 className={`bg-white border-2 rounded-full ${sliderValue >= stop ? 'border-yellow-300 bg-yellow-300' : 'border-yellow-200'}`}
//                 style={{
//                   width: `${12 + index * 4}px`,
//                   height: `${12 + index * 4}px`,
//                   marginTop: `-${(index * 2)}px`
//                 }}
//               />
//             ))}
//           </div>
//         </div>
//         <div className="flex justify-between mt-2">
//           <span className="text-sm">Close</span>
//           <span className="text-sm">Distant</span>
//         </div>
//       </div>
//     </div>
//   );
// };
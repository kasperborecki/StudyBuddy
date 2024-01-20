import supabase from '../../config/SupabaseClient';

async function getUserDataFromProvider() {
  const response = await supabase.auth.getUser();
  const user = response.data?.user;

  if (user) {
    if (Array.isArray(user.identities)) {
      for (const identity of user.identities) {
        const email = identity.identity_data?.email;
        const avatarUrl = identity.identity_data?.avatar_url;
        const fullName = identity.identity_data?.full_name;

        if (email && avatarUrl && fullName) {
          try {
            // Fetch the image blob
            const imageBlob = await fetch(avatarUrl).then((res) => res.blob());

            // Create a unique file name
            const fileName = `${email}_${Date.now()}.png`; // You can customize the file name as needed

            // Upload the image to Supabase Storage
            const { data: storageData, error: storageError } = await supabase
              .storage.from('avatars')
              .upload(fileName, imageBlob);

            if (storageError) {
              console.error('Error uploading image to Supabase Storage', storageError);
              return;
            }

            // Update 'avatar_url' and 'name' columns in the 'profiles' table
            const { error: updateError } = await supabase
              .from('profiles')
              .update({ avatar_url: fileName, name: fullName })
              .eq('email', email);

            if (updateError) {
              console.error('Error updating "avatar_url" and "name" columns', updateError);
            }
          } catch (error) {
            console.error('Error processing user identity', error);
          }
        }
      }
    }
  }
}

export default getUserDataFromProvider;

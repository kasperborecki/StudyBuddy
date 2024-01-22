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
            const imageBlob = await fetch(avatarUrl).then((res) => res.blob());
            const fileName = `${email}_${Date.now()}.png`;

            const { data: existingProfile, error: profileError } = await supabase
            .from('profiles')
            .select('avatar_url')
            .eq('email', email);
          
          if (!existingProfile || existingProfile.length >= 0) {

            const { data: storageData, error: storageError } = await supabase
              .storage.from('avatars')
              .upload(fileName, imageBlob);
              if (storageError) {
                console.error('Error uploading image to Supabase Storage', storageError);
                return;
              }

              const { error: updateError } = await supabase
                .from('profiles')
                .update({ avatar_url: fileName, name: fullName })
                .eq('email', email);

              if (updateError) {
                console.error('Error updating "avatar_url" and "name" columns', updateError);
              }
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

import BottomBar from '../../components/bottomBar/BottomBar';
import supabase from '../../config/SupabaseClient';

const HomePage = () => {
  const handleLogOut = async () => {
    try {
      const {error} = await supabase.auth.signOut();
      if (error) {
        console.error('Error during logout:', (error as Error).message);
      } else {
        console.log('Logout successful');
        // You can redirect or perform other actions after successful logout
      }
    } catch (error) {
      console.error('Error during logout:', (error as Error).message);
    }
  };

  return (
    <>
      <button onClick={handleLogOut}>Wyloguj</button>
      <BottomBar />
    </>
  );
};

export default HomePage;

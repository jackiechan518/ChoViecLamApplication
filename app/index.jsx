import { useUser } from '@clerk/clerk-expo';
import { Link, Redirect } from 'expo-router';
import { View, Text } from 'react-native';



export default function Index() {

  const {user} = useUser();

  return (
    <View style={{ 
      flex: 1, 
      }}>
      {/* {user ? ( <Redirect href='/(tabs)/home' /> ) : ( <Redirect href='/login/onboarding' /> )} */}
      {user ? ( <Redirect href='/(tabs)/home' /> ) : ( <Redirect href='/(tabs)/home' /> )}

    </View>
  )
}

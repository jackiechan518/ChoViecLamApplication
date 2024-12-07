import { useAuth, useUser } from '@clerk/clerk-expo';
import { Link, Redirect, router } from 'expo-router';
import { useEffect } from 'react';
import { View, Text } from 'react-native';



export default function Index() {


  return (
    <View style={{ 
      flex: 1, 
      }}>
      {/* {user ? ( <Redirect href='/(tabs)/home' /> ) : ( <Redirect href='/login/onboarding' /> )} */}
      <Redirect href='/(tabs)/home' />

    </View>
  )
}

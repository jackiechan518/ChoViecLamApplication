import { Link } from 'expo-router';
import { View, Text } from 'react-native';



export default function Index() {
  return (
    <View style={{ 
      flex: 1, 
      }}>
      <Link href='/login/onboarding'>
        <Text>Go to Login</Text>
      </Link>
    </View>
  )
}

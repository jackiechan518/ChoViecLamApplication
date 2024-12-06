import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SecureStore from 'expo-secure-store';

//token cache đăng nhập google
const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key)
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}




export default function RootLayout() {
//đăng nhập google
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

if (!publishableKey) {
  throw new Error(
    'Thiếu key cho Clerk',
  )
}


//font
  useFonts({
    'Baloo2': require('../assets/fonts/Baloo2-Regular.ttf'),
    'Baloo2-Medium': require('../assets/fonts/Baloo2-Medium.ttf'),
    'Baloo2-Bold': require('../assets/fonts/Baloo2-Bold.ttf'),
  });
  return (
    <ClerkProvider 
    tokenCache={tokenCache} 
    publishableKey={publishableKey}>
    <Stack>

      <Stack.Screen name='index' />
      <Stack.Screen name='login/index' 
        options={{
          headerShown: false,
        }}
      />
    </Stack>
      </ClerkProvider>
  );
}

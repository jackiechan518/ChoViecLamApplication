import { ClerkProvider, ClerkLoaded, useUser, useAuth } from '@clerk/clerk-expo'
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SecureStore from 'expo-secure-store';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
//token cache đăng nhập google
if (!publishableKey) {
  throw new Error(
    'Thiếu key cho Clerk',
  )
}

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key)
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
}

export default function RootLayout() {
//đăng nhập google

//font
  useFonts({
    'Baloo2': require('../assets/fonts/Baloo2-Regular.ttf'),
    'Baloo2-Medium': require('../assets/fonts/Baloo2-Medium.ttf'),
    'Baloo2-Bold': require('../assets/fonts/Baloo2-Bold.ttf'),
  });
  return (

    <Stack>

      <Stack.Screen name='index' />
      <Stack.Screen name='(tabs)' 
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name='login/index' 
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

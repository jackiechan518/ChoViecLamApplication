import { View, Text, TextInput, Pressable, StyleSheet, Image } from 'react-native';
import React, { useCallback, useState } from 'react';
import Colors from '../../constants/Colors';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';

//xử lý login google
export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

export default function Login() {
  useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/home', { scheme: 'myapp' }),
      })

      if (createdSessionId) {
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
    }
  }, [])

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [rememberMe, setRememberMe] = useState(false); 

  const handleLogin = () => {
    router.push('/home'); 
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logoChoViecLam.png')} style={styles.logo} />
      <Text style={styles.title}>Đăng nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="abc@email.com"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Mật khẩu"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer}>
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
        </Pressable>
      </View>
      <View style={styles.rememberMeContainer}>
        <View style={styles.rememberMeLeft}>
          <Pressable onPress={() => setRememberMe(!rememberMe)} style={styles.rememberMeToggle}>
            <Ionicons name={rememberMe ? "checkbox" : "square-outline"} size={24} color="gray" />
          </Pressable>
          <Text style={styles.rememberMeText}>Ghi nhớ đăng nhập</Text>
        </View>
        <Pressable onPress={() => {/* Handle forgot password */}} style={styles.forgotPasswordLink}>
          <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
        </Pressable>
      </View>
      <Pressable style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText} >ĐĂNG NHẬP</Text>
      </Pressable>
      <Text style={styles.orText}>HOẶC</Text>
      <Pressable style={styles.socialButton} onPress={onPress}>
        <Image source={require('../../assets/images/google-icon.png')} style={styles.icon} />
        <Text style={styles.socialButtonText}>Đăng nhập bằng Google</Text>
      </Pressable>
      <Text style={styles.registerText}>Chưa có tài khoản? <Text style={styles.registerLink}>Đăng ký</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    padding: 15, 
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    width: '80%', 
    alignSelf: 'center', 
  },
  loginButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: Colors.gray,
    borderWidth: 1,
    marginBottom: 10,
    justifyContent: 'center',
  },
  socialButtonText: {
    fontFamily: 'Baloo2-Bold',
    color: Colors.black,
    marginLeft: 10,
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  registerText: {
    textAlign: 'center',
  },
  registerLink: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  logo: {
    marginTop: -200,
    marginBottom: -50,
    width: '80%',
    // height: '80%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between', // Align items to the edges
  },
  rememberMeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeToggle: {
    marginRight: 10,
  },
  rememberMeText: {
    fontFamily: 'Baloo2-Bold',
    color: Colors.black,
    fontSize: 16,
  },
  forgotPasswordLink: {
    fontFamily: 'Baloo2-Bold',
    color: Colors.blue,
    fontSize: 16,
  },
  forgotPasswordText: {
    fontFamily: 'Baloo2-Bold',
    color: Colors.black,
    fontSize: 16,
  },
});
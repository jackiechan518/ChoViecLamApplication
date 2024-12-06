import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <Tabs.Screen name="home" 
        options={{
          title: 'Trang Chủ',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="compass-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="inbox" 
      options={{
        title: 'Tin Nhắn',
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <Ionicons name="chatbubble-outline" size={24} color={color} />
        ),
      }}
      />
       <Tabs.Screen name="map" 
      options={{
        title: '',
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <View style={{ 
            backgroundColor: Colors.primary, 
            borderRadius: 100, 
            width: 50, 
            height: 50, 
            justifyContent: 'center', 
            alignItems: 'center', 
            elevation: 10, 
            position: 'relative',
            top: -15, 
          }}>
            <Ionicons name="map" size={30} color={"white"} /> 
          </View>
        ),
      }}
      />
      <Tabs.Screen name="favorite"
      options={{
        title: 'Yêu Thích',
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <Ionicons name="heart-circle-outline" size={24} color={color} />
        ),
      }}
      />
      <Tabs.Screen name="profile"
      options={{
        title: 'Hồ Sơ',
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <Ionicons name="person-outline" size={24} color={color} />
        ),
      }}
      />
    </Tabs>
  )
}
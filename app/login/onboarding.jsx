// app/login/index.jsx
import { View, Text, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors'
import { router } from 'expo-router';

export default function Onboarding() {
  const [currentPage, setCurrentPage] = useState(0); // Trạng thái để theo dõi trang hiện tại

  const pages = [
    { image: require('../../assets/images/Onboarding1.png')},
    { image: require('../../assets/images/Onboarding2.png')},
  ];

  return (
    <View style={{ position: 'relative' }}>
      <Image source={pages[currentPage].image} 
          style={{ width: '100%', height: '100%' }}   
      />
      <Text style={{ position: 'absolute', bottom: 100, left: 20, color: Colors.white }}>
        {pages[currentPage].text}
      </Text>
      <Pressable style={{
        position: 'absolute',
        left: 20,
        bottom: 20,
        padding: 10,
        borderRadius: 10,
      }} onPress={() => currentPage > 0 ? setCurrentPage(currentPage - 1) : router.push('/login')}>
        <Text style={{ color: Colors.white }}>
          {currentPage > 0 ? 'Trở lại' : 'Bỏ qua'}
        </Text>
      </Pressable>
      <Pressable style={{
        position: 'absolute',
        right: 20,
        bottom: 20,
        padding: 10,
        borderRadius: 10,
      }} onPress={() => {
        if (currentPage < pages.length - 1) {
          setCurrentPage(currentPage + 1); // Chuyển sang trang tiếp theo
        } else {
          router.push('/login'); // Điều hướng đến trang đăng nhập
        }
      }}>
        <Text style={{ color: Colors.white }}>{currentPage < pages.length - 1 ? 'Tiếp theo' : 'Đăng nhập'}</Text>
      </Pressable>
    </View>
  )
}
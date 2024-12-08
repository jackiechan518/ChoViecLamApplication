import { View, Text, Image } from 'react-native'
import React from 'react'

export default function JobSubInfoCard({ icon, title, value }) {
  return (
    <View style={
        {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: 10,
            borderRadius: 10,
            margin: 5,
            gap: 10,
            flex: 1
        }
      }>
        <Image source={icon} 
            style={{ width: 40, height: 40 }}
        />
        <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontFamily: 'Baloo2-Regular' }}>
            {title}
        </Text>
        <Text style={{ fontSize: 16, fontFamily: 'Baloo2-Bold' }}>
            {value}
        </Text>
        </View>
      </View>
  )
}
import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors';

export default function AboutJob({job}) {
    const [readMore, setReadMore] = useState(true);
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontFamily: 'Baloo2-Bold' }}>Yêu Cầu Công Việc</Text>
      <Text 
        numberOfLines={readMore ? 3 : 20}
        style={{ 
            fontSize: 16, 
            fontFamily: 'Baloo2-Regular' 
        }}>{job?.require}</Text>
        {readMore &&
        <Pressable onPress={() => setReadMore(false)}>
            <Text style={{
                fontSize: 16, 
                fontFamily: 'Baloo2-Regular',
                color: Colors.primary
            }}>Xem thêm</Text>
        </Pressable>}
    </View>
  )
}
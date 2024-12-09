import { View, Text, Image } from 'react-native'
import React from 'react'
import MarkFav from '../MarkFav';


export default function JobInfo({ job}) {
  return (
    <View>
      <Image source={{ uri: job?.image }} 
      style={{ 
          width: '100%', 
          height: 300,
          objectFit: 'cover'
        }}/>
        <View style={{ 
            padding: 20,
            marginRight: 2,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <View>
                <Text style={{ fontSize: 20, fontFamily: 'Baloo2-Bold' }}>{job?.title}</Text>
                <Text style={{ fontSize: 16, fontFamily: 'Baloo2-Regular' }}>{job?.address}</Text>
            </View>
        </View>  
    </View>
  )
}
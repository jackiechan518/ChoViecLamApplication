import { View, Text, Image } from 'react-native'
import React from 'react'
import JobSubInfoCard from './JobSubInfoCard'

export default function JobSubInfo({ job }) {

  return (
    <View style={{ 
        paddingHorizontal: 20 
    }}>
        <View style={{ display: 'flex', flexDirection: 'row'}}>
           <JobSubInfoCard icon={require('./../../assets/images/calendar.png')} title='Loại Công Việc' value={job?.category} />
           <JobSubInfoCard icon={require('./../../assets/images/bone.png')} title='Lương' value={job?.salary + 'k/h'} />
        </View>
        <View style={{ display: 'flex', flexDirection: 'row'}}>
           <JobSubInfoCard icon={require('./../../assets/images/sex.png')} title='Giới Tính' value={job?.sex} />
           <JobSubInfoCard icon={require('./../../assets/images/weight.png')} title='Số Lượng' value={job?.quantity} />
        </View>
    </View>
  )
}
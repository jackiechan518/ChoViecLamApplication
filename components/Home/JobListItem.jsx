import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
    
// import MarkFav from './../../components/MarkFav';

const categoryNames = {
    bartender: 'Pha Chế',
    waiter: 'Phục Vụ',
    casual: 'Casual',
    urgent: 'Gấp',
    tutor: 'Dạy Kèm',
    sale: 'Bán Hàng',
    kitchen: 'Phụ Bếp',
    security: 'Bảo Vệ',
    'pg/pb': 'PG/PB',
    orther: 'Khác'
};

export default function JobListItem({ job }) {
    const router = useRouter();


    return (
        <TouchableOpacity
            onPress={() => router.push({
                pathname: '/job-details',
                params: job
            })}
            style={{
                marginTop: 20,
                padding: 10,
                marginRight: 15,
                marginLeft: 20,
                backgroundColor: Colors.white2,
                borderRadius: 10,
            }}
        >
            <View style={{
                position: 'absolute',
                zIndex: 10,
                right: 10,
                top: 10
            }}>
                {/* <MarkFav job={job} color={'white'} /> */}
            </View>
            <Image source={{ uri: job?.image }} style={{
                width: 250,
                height: 135,
                objectFit: 'cover',
                borderRadius: 10,
            }} />
            <Text style={{
                fontSize: 18,
                fontFamily: 'Baloo2-Medium',
                marginTop: 10,
            }}>{job.title}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                <Text style={{
                    backgroundColor: Colors.danger,
                    padding: 5,
                    borderRadius: 5,
                    fontSize: 12,
                    fontFamily: 'Baloo2-Regular',
                }}>{'Số lượng: ' + job.quantity}</Text>
                <Text style={{
                    backgroundColor: Colors.pastel,
                    padding: 5,
                    borderRadius: 5,
                    fontSize: 12,
                    fontFamily: 'Baloo2-Regular',
                }}>
                    {categoryNames[job.category] || job.category}
                </Text>
                <Text style={{
                    backgroundColor: Colors.green,
                    padding: 5,
                    borderRadius: 5,
                    fontSize: 12,
                    fontFamily: 'Baloo2-Regular',
                }}>{'Lương: ' + job.salary}</Text>
            </View>
            <View style={{ width: 250, height: 25 }}>
                <Text style={{
                    fontSize: 12,
                    fontFamily: 'Baloo2-Regular',
                    marginTop: 10,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                }}>{'Địa chỉ: ' + job.address}</Text>
            </View>
        </TouchableOpacity>
    )
}
import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function OwnerInfo({ job }) {

    return (
        <View style={styles.container}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 20
            }}>
                <Image source={{ uri: job?.userImage }}
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 100
                    }}
                />
                <View>
                    <Text style={{
                        fontFamily: 'Baloo2-Regular',
                        color: Colors.gray
                    }}>Người Đăng</Text>
                    <Text style={{
                        fontFamily: 'Baloo2-Bold',
                        fontSize: 17
                    }}>{job?.username || "Tên không có"}</Text>
                </View>
            </View>
            <Ionicons name="send-sharp" size={24} color={Colors.primary} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        borderColor: Colors.primary,
        backgroundColor: Colors.white,
        justifyContent: 'space-between'
    }
})

import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../config/FirebaseConfig';

export default function Slider() {

    useEffect(() => {
        GetSlider();
    }, []);
   
    const GetSlider = async () => {
        const snapshot = await getDocs(collection(db, 'Sliders'));
        snapshot.forEach((doc) => {
            console.log("data: ", doc.data());
        });
        setLoading(false);
    }

    return (
        <View>
                <Text>Slider</Text>
        </View>
    )
}
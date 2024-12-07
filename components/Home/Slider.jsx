import { View, Text, ActivityIndicator, StyleSheet, FlatList, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../config/FirebaseConfig';

export default function Slider() {

    const [sliderList, setSliderList] = useState([]);

    useEffect(() => {
        GetSlider();
    }, []);
   
    const GetSlider = async () => {
        setSliderList([]);
        const snapshot = await getDocs(collection(db, 'Sliders'));
        snapshot.forEach((doc) => {
            //Check xem có tải được chưa 
            // console.log("data: ", doc.data());
            setSliderList(sliderList => [...sliderList, doc.data()]);
        });
    }

    return (
        <View style={{ marginTop: -20 }}>
            <Text style={{ fontSize: 20, fontFamily: 'Baloo2-Medium', marginLeft: 20 }}>Tuyển Gấp</Text>
                <FlatList
                    data={sliderList}
                    horizontal={true}
                    renderItem={({item,index}) => (
                        <View>
                            <Image source={{ uri: item?.imageUrl }}
                                style={styles.sliderImage}
                            />
                        </View>
                    )}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    sliderImage: {
        width: Dimensions.get('screen').width*0.9,
        height: 150,
        borderRadius: 10,
        marginRight: 5,
        marginLeft: 15
    }
})
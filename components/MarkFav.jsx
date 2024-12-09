import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Shared from '../Shared/Shared';
import { appInfo } from '../constants/appInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MarkFav() {
    const [favList, setFavList] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                const response = await fetch(`${appInfo.baseUrl}/users/me`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setUser(data);
                } else {
                    console.error("Error fetching user: ", data);
                }
            } catch (error) {
                console.error("Error fetching user: ", error);
            }
        };

        fetchUser();
    }, []);



    return (
        <Pressable>
            <AntDesign name="hearto" size={24} color="black" />
        </Pressable>
    );
}

const styles = StyleSheet.create({});
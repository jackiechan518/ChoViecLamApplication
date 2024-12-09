import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import Colors from '../../constants/Colors';
import JobInfo from '../../components/JobDetails/JobInfo';
import JobSubInfo from '../../components/JobDetails/JobSubInfo';
import AboutJob from '../../components/JobDetails/AboutJob';
import OwnerInfo from '../../components/JobDetails/OwnerInfo';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { appInfo } from '../../constants/appInfo';
import { ToastAndroid } from 'react-native';

export default function jobDetails() {
    const job=useLocalSearchParams();
    const navigation=useNavigation();
    const router=useRouter();

    useEffect(()=>{
        navigation.setOptions({
            headerTransparent:true,
            headerTitle:''
        })
    },[])



 const InitiateChat=async()=>{
        console.log('InitiateChat called');
        const token = await AsyncStorage.getItem('userToken');

        if (!token) {
            ToastAndroid.show('Token không tồn tại. Vui lòng đăng nhập lại.', ToastAndroid.SHORT);
            return;
        }

        let user;
        try {
            const userResponse = await axios.get(`${appInfo.baseUrl}/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            user = userResponse.data.data; // Lưu thông tin người dùng
            console.log('User data:', user);
        } catch (error) {
            console.error('Error fetching user data:', error);
            return;
        }

        const userEmail = user?.email || 'unknown_email';
        const userImageUrl = user?.photoUrl || 'default_image_url';
        const userName = user?.name || 'Unknown User';

        const jobEmail = job?.email || 'unknown_job_email';
        const jobImageUrl = job?.image || 'default_job_image_url';
        const jobName = job?.title || 'Unknown Job';

        const docId1 = `${userEmail}_${jobEmail}`;
        const docId2 = `${jobEmail}_${userEmail}`;

        const q = query(collection(db, 'Chat'), where('id', 'in', [docId1, docId2]));
        const querySnapshot = await getDocs(q);
        console.log('Query snapshot:', querySnapshot.docs.length);

        if (querySnapshot.docs?.length === 0) {
            try {
                await setDoc(doc(db, 'Chat', docId1), {
                    id: docId1,
                    users: [
                        {
                            email: userEmail,
                            imageUrl: userImageUrl,
                            name: userName
                        },
                        {
                            email: jobEmail,
                            imageUrl: jobImageUrl,
                            name: jobName
                        }
                    ],
                    userIds: [userEmail, jobEmail]
                });
                console.log('Document created successfully with docId:', docId1);
                router.push({
                    pathname: '/chat',
                    params: { id: docId1 }
                });
            } catch (error) {
                console.error('Error creating document:', error);
            }
        } else {
            querySnapshot.forEach(doc => {
                console.log(doc.data());
                router.push({
                    pathname: '/chat',
                    params: { id: doc.id }
                });
            });
        }
    }
    /**
     * Used to Initiate the chat between two users
     */
  return (
    <View>
        <ScrollView>
        {/* job Info  */}
            <JobInfo job={job} />
        {/* job SubInfo  */}
            <JobSubInfo job={job} />
        {/* about  */}
            <AboutJob job={job} />
        {/* owner details   */}
            <OwnerInfo job={job} />
            <View style={{height:70}}>

            </View>
           
        </ScrollView>
        {/* apply me button  */}
        <View style={styles?.bottomContainer}>
            <TouchableOpacity 
            onPress={InitiateChat}
            style={styles.applyBtn}>
                <Text style={{
                    textAlign:'center',
                    fontFamily:'Baloo2-Medium',
                    fontSize:20,
                    color:Colors.white
                }}>Ứng Tuyển Ngay</Text>
            </TouchableOpacity>
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
    applyBtn:{
        padding:15,
        backgroundColor:Colors.primary,
    },
    bottomContainer:{
        position:'absolute',
        width:'100%',
        bottom:0,
    }
})
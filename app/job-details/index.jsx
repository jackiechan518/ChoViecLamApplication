import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import Colors from '../../constants/Colors';
import { useUser } from '@clerk/clerk-expo';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import JobInfo from '../../components/JobDetails/JobInfo';
import JobSubInfo from '../../components/JobDetails/JobSubInfo';
import AboutJob from '../../components/JobDetails/AboutJob';
import OwnerInfo from '../../components/JobDetails/OwnerInfo';

export default function jobDetails() {
    const job=useLocalSearchParams();
    const navigation=useNavigation();
    useEffect(()=>{
        navigation.setOptions({
            headerTransparent:true,
            headerTitle:''
        })
    },[])

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
            // onPress={InitiateChat}
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
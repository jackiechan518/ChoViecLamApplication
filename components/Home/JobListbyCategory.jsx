import { View, Text, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import Category from './Category'
import { db } from '../../config/FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import JobListItem from './JobListItem';

export default function JobListbyCategory() {
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    GetListJobs('waiter');
  }, []);

  const GetListJobs = async (category) => {
    try {
      setJobList([]);
      const q = query(collection(db, 'Jobs'), where('category', '==', category));
      const querySnapshot = await getDocs(q);
      const jobs = [];
      querySnapshot.forEach((doc) => {
        jobs.push({ id: doc.id, ...doc.data() });
        console.log(jobs);
      });
      setJobList(jobs);
    } catch (error) {
      console.error("Error fetching jobs: ", error);
    }
  }



  return (
    <View>
      <Category category={(value) => GetListJobs(value)} />
      <FlatList
        horizontal={true}
        data={jobList}
        renderItem={({ item }) => (
          <JobListItem job={item} />
        )}
      />
    </View>
  )
}
import { View, Text, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import Category from './Category'
import { db } from '../../config/FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import JobListItem from './JobListItem';

export default function JobListbyCategory() {
  const [jobList, setJobList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    GetListJobs('waiter');
  }, []);

  const GetListJobs = async (category) => {
    try {
      setLoader(true);
      const q = query(collection(db, 'Jobs'), where('category', '==', category));
      const querySnapshot = await getDocs(q);
      const jobs = [];
      querySnapshot.forEach((doc) => {
        jobs.push(doc.data());
      });
      setJobList(jobs);
      console.log("jobList: ", jobs);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching jobs: ", error);
      setLoader(false);
    }
  }
  



  return (
    <View>
      <Category category={(value) => GetListJobs(value)} />
      <FlatList
        horizontal={true}
        data={jobList}
        refreshing={loader}
        onRefresh={() => GetListJobs(category)}
        renderItem={({ item }) => (
          <JobListItem job={item} />
        )}
      />
    </View>
  )
}
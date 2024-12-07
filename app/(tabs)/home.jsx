import { Text, View } from 'react-native';
import Header from '../../components/Home/Header';
import { useUser } from '@clerk/clerk-expo';
import Slider from '../../components/Home/Slider';
import JobListbyCategory from '../../components/Home/JobListbyCategory';

export default function Home() {

  return(
    <View>
      {/* Header */}
      <Header />
      {/* Slider */}
      <Slider />
      {/* Job List + Category */}
      <JobListbyCategory />
      {/* Add New Jobs */}
    </View>
  )
}

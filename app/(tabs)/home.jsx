import { Text, View } from 'react-native';
import Header from '../../components/Home/Header';
import { useUser } from '@clerk/clerk-expo';
import Slider from '../../components/Home/Slider';

export default function Home() {

  return(
    <View>
      {/* Header */}
      <Header />
      {/* Slider */}
      <Slider />
      {/* Category */}
      {/* List of Jobs */}
      {/* Add New Jobs */}
    </View>
  )
}

import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Home/Header';
// import { useUser } from '@clerk/clerk-expo';
import Slider from '../../components/Home/Slider';
import JobListbyCategory from '../../components/Home/JobListbyCategory';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from '../../constants/Colors';
import { Link } from 'expo-router';
export default function Home() {

  return(
    
    <ScrollView>
      {/* Header */}
      <Header />
      {/* Slider */}
      <Slider />
      {/* Job List + Category */}
      <JobListbyCategory />
      {/* Add New Jobs */}
      
      <Link href="/add-new-job" style={styles.addNewJobContainer}>
        <MaterialIcons name="add-shopping-cart" size={30} color="white" />
        <Text style={{fontSize: 18, fontFamily: 'Baloo2-Bold', marginLeft: 10, color: Colors.white2}}>Thêm Việc Làm</Text>
      </Link>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  addNewJobContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center', 
    padding: 20,
    textAlign: 'center',
    marginHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 15,
    borderWidth: 1,
    shadowColor: Colors.gray,
    shadowOffset: { width: 10, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 10,
    marginTop: 20,
    marginBottom: 30
}})

import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../../config/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Colors from '../../constants/Colors';

export default function Category() {
  const [selectedCategory, setSelectedCategory] = useState('partime');
  const [categoryList, setCategoryList] = useState([]);

  const categoryNames = {
    partime: 'Bán Thời Gian',
    fulltime: 'Toàn Thời Gian',
    casual: 'Casual',
    urgent: 'Gấp',
    tutor: 'Dạy Kèm',
    orther: 'Khác'
  };

  const categoryOrder = ['partime', 'fulltime', 'casual', 'tutor', 'pb/pg', 'urgent', 'orther'];

  useEffect(() => {
    GetCategories();
  }, []);

  const GetCategories = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, 'Category'));
    const categories = [];
    snapshot.forEach((doc) => {
      categories.push(doc.data());
    });
    
    const sortedCategories = categories.sort((a, b) => {
      return categoryOrder.indexOf(a.name) - categoryOrder.indexOf(b.name);
    });

    setCategoryList(sortedCategories);
  }



  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 20, fontFamily: 'Baloo2-Medium', marginLeft: 20 }}>Danh Mục</Text>
      <FlatList
        style={{ marginLeft: 5 }}
        data={categoryList}
        horizontal={true}
        renderItem={({item,index}) => (
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setSelectedCategory(item?.name)}>
            <View style={[styles.container,
              selectedCategory === item?.name ? { backgroundColor: Colors.primary } : { backgroundColor: Colors.secondary }
            ]}>
              <Image source={{ uri: item?.imageUrl }} style={{ width: 50, height: 50 }} />
            </View>
            <Text style={{ textAlign: 'center', fontSize: 12, fontFamily: 'Baloo2-Medium' }}>{categoryNames[item?.name] || item?.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.primary,
    margin: 5
  }
})
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import Colors from '../../constants/Colors';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { db } from '../../config/FirebaseConfig';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { appInfo } from '../../constants/appInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AddNewJob() {

  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    category: 'waiter',
    sex: 'all',
  });
  const [gender, setGender] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('waiter');
  const [image, setImage] = useState();
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  



  const categoryNames = {
    bartender: 'Pha Chế',
    waiter: 'Phục Vụ',
    casual: 'Casual',
    urgent: 'Gấp',
    tutor: 'Dạy Kèm',
    sale: 'Bán Hàng',
    kitchen: 'Phụ Bếp',
    security: 'Bảo Vệ',
    'pg/pb': 'PG/PB',
    orther: 'Khác'
  };

  const categoryOrder = ['waiter', 'bartender', 'tutor', 'casual', 'urgent', 'sale', 'pg/pb', 'kitchen', 'security', 'orther'];

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

  const handleImageUpload = async (uri) => {
    const type = 'image/jpg';
    const name = uri.split('/').pop();

    const formData = new FormData();
    formData.append('image', { uri, type, name });

    const config = {
      method: 'post',
      url: `${appInfo.baseUrl}/upload/uploadImage`,
      data: formData,
    };

    try {
      const response = await axios.request(config);
      if (response.status === 200) {
        console.log('Upload thành công:', response.data);
        return response.data.data.secure_url;
      }
    } catch (error) {
      console.error('Lỗi khi tải ảnh lên:', error.response ? error.response.data : error.message);
      console.error('Error details:', error);
    }
    return null;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const uploadedImageUrl = await handleImageUpload(result.assets[0].uri);
      if (uploadedImageUrl) {
        setImage(uploadedImageUrl);
      }
    }
  };

  const handeInputChange = (fieldName, fieldValue) => {
    setFormData(prev=>({
      ...prev,
      [fieldName]: fieldValue
    }));
  }


  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Thêm Việc Làm'
    });
    GetCategories();
  }, []);

  const onSubmit = async () => {
    if(Object.keys(formData).length < 6 || !image) {
      ToastAndroid.show('Vui lòng điền đầy đủ các trường có dấu * và tải ảnh lên', ToastAndroid.SHORT);
      return;
    }

    const token = await AsyncStorage.getItem('userToken');

    if (!token) {
      ToastAndroid.show('Token không tồn tại. Vui lòng đăng nhập lại.', ToastAndroid.SHORT);
      return;
    }

    try {
      const userResponse = await axios.get(`${appInfo.baseUrl}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const userData = userResponse.data.data;

      const dataToSubmit = { 
        ...formData, 
        image, 
        fullname: userData.fullname, 
        email: userData.email, 
        userId: userData._id 
      };
      console.log(dataToSubmit);

      const docRef = await addDoc(collection(db, 'Jobs'), dataToSubmit);
      console.log('Document written with ID: ', docRef.id);
      ToastAndroid.show('Đăng việc thành công!', ToastAndroid.SHORT);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin người dùng hoặc đẩy dữ liệu lên Firestore:', error);
      ToastAndroid.show('Đã xảy ra lỗi. Vui lòng thử lại.', ToastAndroid.SHORT);
    }
  }

  const SaveFormData = async (image) => {
    const dataToSubmit = { ...formData, image };
    console.log(dataToSubmit);
  }

  return (
    <ScrollView style={{
      padding: 20
    }}>
      <Text style={{
        fontSize: 20,
        fontFamily: 'Baloo2-Bold',
        // fontWeight: 'bold'
      }}>Thêm Việc, Tìm Người</Text>


      <Pressable onPress={pickImage}>
        {!image?  <Image source={require('../../assets/images/adaptive-icon.png')} 
        style={{
        width: 100,
        height: 100,
        resizeMode: 'contain',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Colors.primary,
        marginVertical: 10
        }} />: 
        <Image source={{uri: image}} style={{
          width: 100,
          height: 100,
          borderRadius: 15,
          borderWidth: 1,
        }} />}
      </Pressable>


      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tiêu đề công việc *</Text>
        <TextInput onChangeText={(value) => handeInputChange('title', value)} placeholder='Nhập tiêu đề công việc' style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Vị trí *</Text>
        <Picker 
          selectedValue={selectedCategory}
          style={[styles.input, { height: 50}]}
          onValueChange={(itemValue, itemIndex) =>{
            setSelectedCategory(itemValue)
            handeInputChange('category', itemValue)
          }}>
          {categoryList.map((category, index) => (
            <Picker.Item key={index} label={categoryNames[category.name]} value={category.name} />
          ))}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Số lượng *</Text>
        <TextInput keyboardType='number-pad' onChangeText={(value) => handeInputChange('quantity', value)} placeholder='Nhập số lượng công việc' style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Giới tính *</Text>
        <Picker 
          selectedValue={gender}
          style={[styles.input, { height: 50}]}
          onValueChange={(itemValue, itemIndex) =>{
            setGender(itemValue)
            handeInputChange('gender', itemValue)
          }}>
          <Picker.Item label="Không phân biệt" value="all" />
          <Picker.Item label="Nam" value="male" />
          <Picker.Item label="Nữ" value="female" />
        </Picker>
      </View>



      <View style={styles.inputContainer}>
        <Text style={styles.label}>Lương *</Text>
        <TextInput  
          onChangeText={(value) => handeInputChange('salary', value)} 
          placeholder='Nhập lương công việc' 
          style={[styles.input]}
          keyboardType='number-pad'
        />
      </View>

      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Địa chỉ *</Text>
        <TextInput  
          onChangeText={(value) => handeInputChange('address', value)} 
          placeholder='Nhập địa chỉ công việc' 
          style={[styles.input]}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mô tả</Text>
        <TextInput 
          onChangeText={(value) => handeInputChange('require', value)} 
          placeholder='Nhập mô tả công việc' 
          style={[styles.input, { height: 100, borderRadius: 10, borderWidth: 0 }]}
          numberOfLines={10} 
          multiline={true} 
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Đăng Tuyển</Text>
      </TouchableOpacity>


    </ScrollView>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5
  },
  input: {
    backgroundColor: Colors.white2,
    borderRadius: 10,
    padding: 10
  },
  label: {
    fontFamily: 'Baloo2-Medium',
    fontSize: 16,
    marginVertical: 5
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    marginBottom: 30
  },
  buttonText: {
    color: Colors.white,
    fontFamily: 'Baloo2-Medium',
    fontSize: 16,
    textAlign: 'center'
  }
})
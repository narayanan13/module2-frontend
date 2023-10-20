import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker'; // Import Picker from the new package
import { useNavigation } from '@react-navigation/native';
import { Notifications } from 'expo-notifications';
import Scanner from './scanner';

const ProductForm = () => {
  const navigation = useNavigation()
  const [productName, setProductName] = useState('');
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dateType, setDateType] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [date, setDate] = useState(new Date())
  const [showPicker,setShowPicker]=useState(false)
  const [selected, setSelected] = React.useState("");
  const [remainderDate, setRemainderDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker]= useState(false);


  const handleNotification=()=>{
    console.log('Notification Clicked');
    navigation.navigate('Notification');
  }
  const handleScanner=()=>{
    console.log('scanner clicked')
    navigation.navigate('Scanner')
  }  
  
  const confirmIOSDate = () =>{
          setExpiryDate(date.toDateString())
          toggleDate()
      }
  const toggleDate =()=>{
          setShowPicker(!showPicker)
      }

    const onChange = ({type}, selectedDate)=>{
      if(type == "set"){
          const currentDate = selectedDate
          setDate(currentDate)

          if(Platform.OS === "android"){
              
              toggleDate()
              setExpiryDate(currentDate.toDateString())
              
          }
          
      }
      else{
          toggleDate()
      }
  }
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://categservice.onrender.com/getCategories");
        if (response.data.categories) {
          setCategoryData(response.data.categories);
          console.log(categoryData);
        } else {
          console.error("No categories found in the response.");
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };

    fetchCategories();
  }, []); // Fetch categories once when the component mounts

  const handleDateChange=(event,remainderDate)=>{
    if(remainderDate!==undefined){
      setRemainderDate(remainderDate);
    }
    setShowDatePicker(Platform.OS==='ios');
  }

  const toggleDatePicker=()=>{
    setShowDatePicker((prev)=>!prev);
  }

  const openDatePicker = async () => {
    try {
      const { action, year, month, day } = await DateTimePicker.open({
        date: new Date(),
        mode: 'spinner',
      });
      if (action !== DateTimePicker.dismissedAction) {
        // Selected date
        const selectedDate = `${year}-${month + 1}-${day}`;
        setExpiryDate(selectedDate);
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  const handleSubmit = async() => {
    // Handle form submission logic here
    if(expiryDate<new Date()){
      alert('Expiry date must be in the future!');
    }
    console.log('onsubmit', {
      productName,
      selectedCategory,
      dateType,
      expiryDate,
      // imageUri,
    });

    
    try{
      
      axios.post('https://categservice.onrender.com/addProductService', {
      productName:productName,
      categoryName:selectedCategory,
      dateType:dateType,
      expiryDate:expiryDate,
    }).then((res)=>{
      if(res.data.message==='success'){
        alert('Successfully added');
        navigation.navigate('Main');
      }else{
        alert('Error occured');
      }
    })
    }
    catch (error) {
    console.log('error occurred while axios', error);  
    }
  };

  return (
    <View style={{ padding: 20}}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>New Product</Text>

      {/* Add Image Button */}
      
      {/* Product Name */}
      <Text style={{marginTop:10}}>Enter Product Name:</Text>
      <TextInput
        value={productName}
        onChangeText={(text) => setProductName(text)}
        style={{ borderWidth: 1, padding: 10 }}
      />

      {/* Category Dropdown */}
      <View style={{ marginTop: 10,borderWidth: 1, padding: 5, height:60 }}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        >
          <Picker.Item label="Select a category" value="" />
          {categoryData.map((category) => (
            <Picker.Item key={category._id} label={category.categoryName} value={category.categoryName} />
          ))}
        </Picker>
      </View>

      {/* Date Type Dropdown */}
      <View style={{ marginTop: 10, borderWidth: 1, padding: 10 }}>
        <Picker
          selectedValue={dateType}
          onValueChange={(itemValue) => setDateType(itemValue)}
        >
          <Picker.Item label="Select date type" value="" />
          <Picker.Item label="Expiry" value="Expiry" />
          <Picker.Item label="Warranty" value="Warranty" />
          <Picker.Item label="Guarantee" value="Guarantee" />
        </Picker>
      </View>

      {/* Expiry Date */}
      <Text style={{marginTop:10}}>Enter Date:</Text>
      <View style={{borderWidth:1, padding:10 }} >
       {showPicker && (
      <DateTimePicker
          mode ="date"
          display="spinner"
          value={date}
          onChange={onChange}
      />
      )}

      {showPicker && Platform.OS==="ios" && (
          <View
          style={{flexDirection:"row",
                  justifyContent:"space-around"
              }}
      >
          <TouchableOpacity style={[{backgroundColor:"#11182711"},]}
              onPress={toggleDate}>
              <Text style={[{color: "#075985"}]}>
                 Cancel 
              </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={confirmIOSDate}>
            <Text>
              Confirm 
            </Text>
          </TouchableOpacity>
      </View>
      )}
      
      {!showPicker && (
      <Pressable
          onPress={toggleDate}>
          
      <TextInput
        
          placeholder='Choose Date'
          value={expiryDate}
          onChangeText={setExpiryDate}
          placeholderTextColor="#11182744"
          editable={false}
          onPressIn={toggleDate}
          >

      </TextInput>
      </Pressable>)
      }
  </View>
  
      {/* Scanner Button */}
      <View style={{marginTop:10}}>
      <Button title="Scan QR" onPress={handleScanner} style={{ marginTop: 20 }} />
      </View>
      <View style={{marginTop:10}}>
        <Button title="Add Product" onPress={handleSubmit} style={{ marginTop: 20 }} />
      </View>
        </View>
  );
};

export default ProductForm;

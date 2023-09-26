// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Pressable,
//   TouchableOpacity,
// } from 'react-native';
// import axios from 'axios';
// import DateTimePicker from '@react-native-community/datetimepicker';
// // import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker'; // Import Picker from the new package
// import { useNavigation } from '@react-navigation/native';

// const ProductForm = () => {
//   const navigation = useNavigation()
//   const [productName, setProductName] = useState('');
//   const [categoryData, setCategoryData] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [dateType, setDateType] = useState('');
//   const [expiryDate, setExpiryDate] = useState('');
//   const [date, setDate] = useState(new Date("1999-07-10"))
//   const [showPicker,setShowPicker]=useState(false)
//   const [selected, setSelected] = React.useState("");

//   const confirmIOSDate = () =>{
//           setExpiryDate(date.toDateString())
//           toggleDate()
//       }
//   const toggleDate =()=>{
//           setShowPicker(!showPicker)
//       }

//     const onChange = ({type}, selectedDate)=>{
//       if(type == "set"){
//           const currentDate = selectedDate
//           setDate(currentDate)

//           if(Platform.OS === "android"){
              
//               toggleDate()
//               setExpiryDate(currentDate.toDateString())
              
//           }
          
//       }
//       else{
//           toggleDate()
//       }
//   }
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("https://categservice.onrender.com/getCategories");
//         if (response.data.categories) {
//           setCategoryData(response.data.categories);
//         } else {
//           console.error("No categories found in the response.");
//         }
//       } catch (error) {
//         console.error("Error occurred:", error);
//       }
//     };

//     fetchCategories();
//   }, []); // Fetch categories once when the component mounts

  
//   const openDatePicker = async () => {
//     try {
//       const { action, year, month, day } = await DateTimePickerAndroid.open({
//         date: new Date(),
//         mode: 'spinner',
//       });
//       if (action !== DateTimePickerAndroid.dismissedAction) {
//         // Selected date
//         const selectedDate = `${year}-${month + 1}-${day}`;
//         setExpiryDate(selectedDate);
//       }
//     } catch ({ code, message }) {
//       console.warn('Cannot open date picker', message);
//     }
//   };

//   const handleSubmit = () => {
//     // Handle form submission logic here
//     console.log('onsubmit', {
//       productName,
//       selectedCategory,
//       dateType,
//       expiryDate,
//       // imageUri,
//     });
//     try{
//       axios.post('https://categservice.onrender.com/addProductService', {
//       productName:productName,
//       categoryName:selectedCategory,
//       dateType:dateType,
//       expiryDate:expiryDate
//     }).then((res)=>{
//       if(res.data.message==='success'){
//         alert('Succesfully added');
//         navigation.navigate('Main');
//       }else{
//         alert('Error occured');
//       }
//     })
//     }
//     catch (error) {
//     console.log('error occured while axios', error);  
//     }
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>New Product</Text>

//       {/* Add Image Button */}
      
//       {/* Product Name */}
      
//       <TextInput
//       placeholder='Enter Product Name'
//         value={productName}
//         onChangeText={(text) => setProductName(text)}
//         style={{ marginTop: 10, borderWidth: 1, padding: 10 }}
//       />

//       {/* Category Dropdown */}
//       <View style={{ marginTop: 10,borderWidth: 1, padding: 5, height:60 }}>
//         <Picker
//           selectedValue={selectedCategory}
//           onValueChange={(itemValue) => setSelectedCategory(itemValue)}
//         >
//           <Picker.Item label="Select a category" value="" />
//           {categoryData.map((category) => (
//             <Picker.Item key={category._id} label={category.categoryName} value={category.categoryName} />
//           ))}
//         </Picker>
//       </View>

//       {/* Date Type Dropdown */}
//       <View style={{ marginTop: 10, borderWidth: 1, padding: 10 }}>
//         <Picker
//           selectedValue={dateType}
//           onValueChange={(itemValue) => setDateType(itemValue)}
//         >
//           <Picker.Item label="Select date type" value="" />
//           <Picker.Item label="Expiry Date" value="Expiry Date" />
//           <Picker.Item label="Warranty Date" value="Warranty Date" />
//           <Picker.Item label="Guarantee Date" value="Guarantee Date" />
//         </Picker>
//       </View>

//       {/* Expiry Date */}
//       <View style={{borderWidth:1, marginTop:10, padding:10 }} >
//        {showPicker && (
//       <DateTimePicker
//           mode ="date"
//           display="spinner"
//           value={date}
//           onChange={onChange}
//       />
//       )}

//       {showPicker && Platform.OS==="ios" && (
//           <View
//           style={{flexDirection:"row",
//                   justifyContent:"space-around"
//               }}
//       >
//           <TouchableOpacity style={[{backgroundColor:"#11182711"},]}
//               onPress={toggleDate}>
//               <Text style={[{color: "#075985"}]}>
//                  Cancel 
//               </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={confirmIOSDate}>
//             <Text>
//               Confirm 
//             </Text>
//           </TouchableOpacity>
//       </View>
//       )}
      
//       {!showPicker && (
//       <Pressable
//           onPress={toggleDate}>
          
//       <TextInput
        
//           placeholder='Choose Date'
//           value={expiryDate}
//           onChangeText={setExpiryDate}
//           placeholderTextColor="#11182744"
//           editable={false}
//           onPressIn={toggleDate}
//           >

//       </TextInput>
//       </Pressable>)
//       }
//   </View>

//       {/* Submit Button */}
//       <View style={{marginTop:10}}>
//         <Button title="Submit" onPress={handleSubmit} style={{ marginTop: 20 }} />
//       </View>
//     </View>
//   );
// };

// export default ProductForm;

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import PushNotification from 'react-native-push-notification'; // Import the push notification library

const ProductForm = () => {
  const navigation = useNavigation();
  const [productName, setProductName] = useState('');
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dateType, setDateType] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [date, setDate] = useState(new Date("1999-07-10"));
  const [showPicker, setShowPicker] = useState(false);
  const [selected, setSelected] = useState('');
  const [reminderDays, setReminderDays] = useState('');
  const [reminderDate, setReminderDate] = useState('');

  const confirmIOSDate = () => {
    setExpiryDate(date.toDateString());
    calculateReminderDate();
    toggleDate();
  };

  const toggleDate = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === 'android') {
        toggleDate();
        setExpiryDate(currentDate.toDateString());
        calculateReminderDate();
      }
    } else {
      toggleDate();
    }
  };

  const calculateReminderDate = () => {
    if (expiryDate && reminderDays) {
      const expiry = new Date(expiryDate);
      const reminder = new Date(expiry);
      reminder.setDate(expiry.getDate() - parseInt(reminderDays));
      setReminderDate(reminder.toDateString());
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'https://categservice.onrender.com/getCategories'
        );
        if (response.data.categories) {
          setCategoryData(response.data.categories);
        } else {
          console.error('No categories found in the response.');
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    };

    fetchCategories();
  }, []);

  const scheduleNotification = () => {
    PushNotification.localNotification({
      title: 'Product Reminder',
      message: `Reminder for ${productName}`,
      date: new Date(reminderDate),
    });
  };

  const handleSubmit = () => {
    console.log('onsubmit', {
      productName,
      selectedCategory,
      dateType,
      expiryDate,
      reminderDate,
    });
    try {
      axios
        .post('https://categservice.onrender.com/addProductService', {
          productName: productName,
          categoryName: selectedCategory,
          dateType: dateType,
          expiryDate: expiryDate,
        })
        .then((res) => {
          if (res.data.message === 'success') {
            alert('Successfully added');
            navigation.navigate('Main');
            if (reminderDate) {
              scheduleNotification();
            }
          } else {
            alert('Error occurred');
          }
        });
    } catch (error) {
      console.log('error occurred while axios', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
        New Product
      </Text>

      <TextInput
        placeholder="Enter Product Name"
        value={productName}
        onChangeText={(text) => setProductName(text)}
        style={{ marginTop: 10, borderWidth: 1, padding: 10 }}
      />

      <View style={{ marginTop: 10, borderWidth: 1, padding: 5, height: 60 }}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        >
          <Picker.Item label="Select a category" value="" />
          {categoryData.map((category) => (
            <Picker.Item
              key={category._id}
              label={category.categoryName}
              value={category.categoryName}
            />
          ))}
        </Picker>
      </View>

      <View style={{ marginTop: 10, borderWidth: 1, padding: 10 }}>
        <Picker
          selectedValue={dateType}
          onValueChange={(itemValue) => setDateType(itemValue)}
        >
          <Picker.Item label="Select date type" value="" />
          <Picker.Item label="Expiry Date" value="Expiry Date" />
          <Picker.Item label="Warranty Date" value="Warranty Date" />
          <Picker.Item label="Guarantee Date" value="Guarantee Date" />
        </Picker>
      </View>

      <View style={{ borderWidth: 1, marginTop: 10, padding: 10 }}>
        {showPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={date}
            onChange={onChange}
          />
        )}

        {showPicker && Platform.OS === 'ios' && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <TouchableOpacity style={[{ backgroundColor: '#11182711' }]} onPress={toggleDate}>
              <Text style={[{ color: '#075985' }]}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={confirmIOSDate}>
              <Text>Confirm</Text>
            </TouchableOpacity>
          </View>
        )}

        {!showPicker && (
          <Pressable onPress={toggleDate}>
            <TextInput
              placeholder="Choose Date"
              value={expiryDate}
              onChangeText={setExpiryDate}
              placeholderTextColor="#11182744"
              editable={false}
              onPressIn={toggleDate}
            />
          </Pressable>
        )}
      </View>

      <TextInput
        placeholder="Enter Reminder Days"
        value={reminderDays}
        onChangeText={(text) => setReminderDays(text)}
        style={{ marginTop: 10, borderWidth: 1, padding: 10 }}
      />

      <View style={{ marginTop: 10 }}>
        <Button title="Submit" onPress={() => { handleSubmit(); }} style={{ marginTop: 20 }} />
      </View>
    </View>
  );
};

export default ProductForm;

import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

const CategoryForm = ({navigation}) => {
  const [categoryName, setCategoryName] = useState('');

  const handleAddCategory = async() => {
    if(categoryName===''){
      Alert.alert('MISSING..',"Please enter the Category name!");
      return;
    }

    try{

      await axios.post("https://categservice.onrender.com/categService",
        {
          categoryName:categoryName
        }).then((res)=>{
          if(res.data.message==="Success"){
            Alert.alert('SUCCESS',"Category Added Successfully!");
            navigation.navigate("Main");
          }
          else{
            Alert.alert('FAILURE',res.data.message);
          }
        })
    }
    catch(e){
      console.log("Error occurred in the axios", e);
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 80}}>
      <Text style={{ fontSize: 20, fontWeight: 'bold',textAlign: 'center' }}>New Category</Text>

      {/* Category Name Input */}
      <TextInput
        placeholder="Category Name"
        value={categoryName}
        onChangeText={(text) => setCategoryName(text)}
        style={{ marginTop: 10, borderWidth: 1, padding: 10 }}
      />
      

      {/* Add Category Button */}
      <View style={{marginTop:20}}> 
      <Button
        title="Add Category"
        onPress={handleAddCategory}
        />
        </View>
    </View>
  );
};

export default CategoryForm;

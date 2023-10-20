import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Notification from './Notification';
const Main = () => {
    const navigation = useNavigation();

  const [productdata, setProductData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://categservice.onrender.com/getProducts");
        if (response.data.products) {
          setProductData(response.data.products);
        } else {
          console.error("No products found in the response.");
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };

    fetchProducts();
  }, [productdata]); // Fetch categories once when the component mounts
const handleAddCategory = ()=>{
    navigation.navigate('CategoryForm');
}
const handleAddProduct = ()=>{
    navigation.navigate('ProductForm');
    
}
const handleNotification=()=>{
  navigation.navigate(Notification);
}
const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.productName}</Text>
      <Text style={styles.cell}>{item.categoryName}</Text>
      <Text style={styles.cell}>{item.dateType}</Text>
      <Text style={styles.cell}>{item.expiryDate}</Text>
      <Button title="Notify" onPress={handleNotification}/>
      {/* Add more Text components for additional columns */}
    </View>
  );
  

  return (
    <View style={styles.container}>
      <View style={{display:'flex',flexDirection:'row'}}>
       <View style={{width:100}}>
       <Button
        title="Add Category"
        onPress={handleAddCategory}
        />
      </View>
      <View style={{width:100,marginLeft:10}}>
      <Button
        title="Add Product"
        onPress={handleAddProduct}
        />
      </View>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Product Name</Text>
        <Text style={styles.headerText}>Category</Text>
        <Text style={styles.headerText}>Date Type</Text>
        <Text style={styles.headerText}>Date</Text>
        <Text style={styles.headerText}>Action</Text>
      </View>
      <FlatList
        data={productdata}
        renderItem={renderItem}
        keyExtractor={(item) => item.productName.toString()} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
  },
});

export default Main;

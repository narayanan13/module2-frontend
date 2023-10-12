// Import necessary modules
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


export default function Scanner() {

    // Define state variables with initial values
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState("Not Yet Scanned");
    const [totalScan, setTotalScan] = useState(0);
    const navigation = useNavigation();

    // Function to ask for camera permission
    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status == 'granted');
        })()
    };

    // Call the askForCameraPermission function when the component mounts
    useEffect(() => {
        askForCameraPermission();
    }, []);

    // Function to handle barcode scanning
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        console.log(data);
        const dataArray = data.split('sEcRet');
  console.log(dataArray)
  
  const objectPush = {
    productName:dataArray[0],
    categoryName:dataArray[1],
    dateType:dataArray[2],
    expiryDate:dataArray[3],
    reminderDate:dataArray[4]
  }
  console.log(objectPush)
        // setText(data);
        try{
            axios.post('https://categservice.onrender.com/addProductService',objectPush).then((res)=>{
                console.log(res.data);
                if(res.data.message==='success'){
                    alert('Successfully added');
                    navigation.navigate('Main');
                  }else{
                    alert(res.data.message);
                  }
            })
        }
        catch(e){
            console.log("Error Occurred in axios", e);
        }
    };

    // Show message while asking for camera permission
    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting For Camera Permission</Text>
            </View>
        );
    }

    // Show message when camera permission is not granted
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 15 }}>No Access To Camera !</Text>
                <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
            </View>
        );
    }

    // Show the barcode scanner view when camera permission is granted
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 36, fontWeight: 'bold', margin: 30 }}>Qr Code Scanner</Text>
            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 400, width: 400 }}
                />
            </View>
        </View>
    );
}

// Define styles for the components
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    barcodebox: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 340,
        width: 340,
        overflow: 'hidden',
        borderRadius: 50,
    }
});
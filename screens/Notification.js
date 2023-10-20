import React, { useEffect, useState, useRef } from 'react';
import { Text, View, Button, Platform, TextInput, StyleSheet } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Notification({ route }) {
  const { product, expiryDate } = route.params; // Get product and expiryDate from navigation params

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notifyOn, setNotifyOn] = useState(new Date()); // New state for notifyOn
  const [showDatePicker, setShowDatePicker] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const toggleDatePicker=()=>{
    setShowDatePicker((prev)=>!prev);
  }

  const handleDateChange=(event, notifyOn)=>{
    if(notifyOn !== undefined){
        setNotifyOn(notifyOn);
    }
    setShowDatePicker(Platform.OS === 'ios');
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));
  }, []);

  const scheduleNotification = async () => {
    if (!notifyOn) {
      alert('Please select a notifyOn date and time.');
      return;
    }

    // Convert the notifyOn date to a JavaScript Date object
    const notifyOnDate = new Date(notifyOn);

    // Ensure the date is in the future
    if (notifyOnDate <= new Date()) {
      alert('NotifyOn date and time must be in the future.');
      return;
    }

    // Save the notification details in your collection (not implemented here)
    const notificationDetails = {
      product,
      expiryDate,
      notifyOn: notifyOnDate,
    };
    // You can implement a storage mechanism here to save notificationDetails.

    // Schedule the notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Notification Title',
        body: `Notify about ${product} on ${expiryDate}`,
      },
      trigger: {
        date: notifyOnDate,
      },
    });

    alert('Notification scheduled successfully.');
  };

  return (
    <View style={styles.container}>
        <View>
            <Text>Product Name:</Text>
            <TextInput style={styles.disabledInput} value={product} editable={false} />

            <Text>Expiry Date:</Text>
            <TextInput style={styles.disabledInput} value={expiryDate} editable={false} />
        </View>
        <Text>Notify On:</Text>
        <View>
    <TouchableOpacity onPress={toggleDatePicker}>
        <Text>{notifyOn.toDateString()}</Text>
    </TouchableOpacity>
    {showDatePicker && (
        <DateTimePicker
            value={notifyOn}
            mode="date"
            placeholder="spinner"
            onChange={handleDateChange}
        />
    )}
</View>

        <View>
            <Button title="Press to schedule a notification" onPress={scheduleNotification} />
        </View>
      </View>
  );
}

async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use a physical device for Push Notifications');
    }
  
    return token;
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  infoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#eee',
    width: 200,
    padding: 10,
    marginBottom: 10,
  },
  disabledInput: {
    backgroundColor: '#eee',
    width: 200,
    padding: 10,
    marginBottom: 10,
  },
});

// LogoutButton.js
import React from 'react';
import { Alert, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function LogoutButton() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              // Remove stored token / user info
              await AsyncStorage.removeItem('userToken');
              await AsyncStorage.removeItem('userData'); // optional

              // Reset navigation so user cannot go back
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }], // replace with your login route name
              });
            } catch (err) {
              console.error('Logout error:', err);
              // Optionally show error toast
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={{
      padding: 12, backgroundColor: '#fff', borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#ddd'
    }}>
      <Text style={{ color: '#e53935', fontWeight: '600' }}>Logout</Text>
    </TouchableOpacity>
  );
}

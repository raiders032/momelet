import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
// import Checkbox from "react-native-check-box";

export default function App({ value, idx, setUsers }) {
  if (value) {
    return <MaterialIcons name="check-box" size={25} color="black" />;
  } else {
    return <MaterialIcons name="check-box-outline-blank" size={25} color="black" />;
  }
}

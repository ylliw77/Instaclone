import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements';

const Add = () => {
  return (
    <SafeAreaView>
      <View style={{padding:100, marginTop:300}}> 
        <Button
          title="Upload Image"
        />
      </View>
    </SafeAreaView>
  );
}

export default Add

const styles = StyleSheet.create({})
import React, { Component } from 'react';
import { View, Switch, StyleSheet }

from 'react-native';

export default ToggleSwitch = (props) => {
   return (
      <View style = {switchStyle.container}>
         <Switch
         onValueChange = {props.toggleSwitch}
         value = {props.switchValue}/>
      </View>
   )
}
const switchStyle = StyleSheet.create ({
   container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 100
   }
})

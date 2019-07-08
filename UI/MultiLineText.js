import React, { Component } from 'react';
import {TextInput } from 'react-native';

class MultiLineText extends Component {
  render() {
    return (
      <TextInput
        {...this.props} 
        editable = {true}
        maxLength = {200}
      />
    );
  }
}

export default MultiLineText;
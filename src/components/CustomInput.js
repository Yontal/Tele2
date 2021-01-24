import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const CustomInput = (props) => {
  return <TextInput {...props} style={{...styles.input, ...props.style}} />;
};

const styles = StyleSheet.create({
  input: {
    borderColor: 'grey',
    borderWidth: 1,
    margin: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default CustomInput;

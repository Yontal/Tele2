import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const CustomButton = (props) => {
  return (
    <TouchableOpacity {...props} style={{...styles.button, ...props.style}}>
      <Text style={styles.text}>{props.children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    height: 50,
    margin: 5,
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  text: {
    color: '#ffffff',
  },
});

export default CustomButton;

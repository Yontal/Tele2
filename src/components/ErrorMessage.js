import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ErrorMessage = (props) => {
  return (
    <View style={{...styles.messageContainer, ...props.style}}>
      <Text style={styles.messageText}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    margin: 5,
    paddingHorizontal: 10,
  },
  messageText: {
    color: 'red',
  },
});

export default ErrorMessage;

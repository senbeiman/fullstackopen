import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  default: {
    borderColor: theme.colors.backgroundPrimary,
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    margin: 12,
    marginBottom: 0
  },
  error: {
    borderColor: theme.colors.textError
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.default, error && styles.error, style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
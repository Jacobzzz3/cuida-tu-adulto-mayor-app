import React from 'react';
import { View, TextInput, TextInputProps, StyleSheet } from 'react-native';
import CustomText from './Text';
import { theme } from '../styles/style'; 

interface CustomInputProps extends TextInputProps {
  label: string;
}

const CustomInput = ({ label, style, ...props }: CustomInputProps) => {
  return (
    <View style={styles.container}>
      <CustomText variant="caption" style={styles.label}>{label}</CustomText>
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={theme.colors.textSecondary}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.m,
  },
  label: {
    marginBottom: 4,
    fontWeight: '600',
  },
  input: {
    height: 50,
    backgroundColor: '#F9F9F9',
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.small,
    paddingHorizontal: 15,
    fontSize: 16,
    color: theme.colors.textPrimary,
  }
});

export default CustomInput;
import React from 'react';
import { TouchableOpacity, ActivityIndicator, StyleSheet, TouchableOpacityProps } from 'react-native';
import CustomText from './Text';
import { theme } from '../styles/style'; 

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'danger' | 'outline';
  isLoading?: boolean;
}

const CustomButton = ({ title, variant = 'primary', isLoading = false, style, ...props }: CustomButtonProps) => {
  const getBackgroundColor = () => {
    if (variant === 'danger') return theme.colors.danger;
    if (variant === 'outline') return 'transparent';
    return theme.colors.primary;
  };

  const getTextColor = () => {
    if (variant === 'outline') return theme.colors.primary;
    return '#FFFFFF';
  };

  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        { backgroundColor: getBackgroundColor() },
        variant === 'outline' && styles.outlineBorder,
        props.disabled && styles.disabled,
        style
      ]} 
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <CustomText style={[styles.text, { color: getTextColor() }]}>{title}</CustomText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: theme.borderRadius.small,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.m,
    flexDirection: 'row',
  },
  outlineBorder: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontWeight: 'bold',
  }
});

export default CustomButton;
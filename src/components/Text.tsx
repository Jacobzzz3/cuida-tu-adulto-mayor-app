import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { theme } from '../styles/style';

interface CustomTextProps extends TextProps {
  variant?: 'title' | 'subtitle' | 'body' | 'caption';
  color?: string;
  align?: 'left' | 'center' | 'right';
}

const CustomText = ({ variant = 'body', color, align = 'left', style, children, ...props }: CustomTextProps) => {
  return (
    <Text 
      style={[
        styles[variant], 
        { textAlign: align },
        color && { color }, 
        style
      ]} 
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  body: {
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  caption: {
    fontSize: 13,
    color: theme.colors.textSecondary,
  }
});

export default CustomText;
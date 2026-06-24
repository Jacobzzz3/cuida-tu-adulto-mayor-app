import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { theme } from '../styles/style';

interface CardProps extends ViewProps {}

const Card = ({ children, style, ...props }: CardProps) => (
  <View style={[styles.card, style]} {...props}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.m,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  }
});

export default Card;
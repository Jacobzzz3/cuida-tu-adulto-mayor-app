import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface StatusCardProps {
  iconName: string;
  title: string;
  value: string;
  color: string;
}
const StatusCard = ({ iconName, title, value, color }: StatusCardProps) => (
  <View style={styles.card}>
    <View style={styles.titleContainer}>
      <Icon name={iconName} size={24} color={color} />
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
    <Text style={[styles.cardValue, { color }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
      },
      titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      cardTitle: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
      },
      cardValue: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 8,
        textAlign: 'right',
      },
});

export default StatusCard;
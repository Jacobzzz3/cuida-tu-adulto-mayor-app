import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from './Text';
import { theme } from '../styles/style';

interface BatteryCardProps {
    nivelBateria: number | null;
}

const BatteryCard = ({ nivelBateria }: BatteryCardProps) => {
    const obtenerColorBateria = (nivel: number | null) => {
        if (nivel === null || nivel === undefined) return '#9E9E9E';
        if (nivel > 50) return '#4CAF50';
        if (nivel > 20) return '#FF9800';
        return '#F44336';
    };

    const getBatteryIcon = (nivel: number | null) => {
        if (nivel === null || nivel === undefined) return 'battery-unknown';
        if (nivel > 90) return 'battery';
        if (nivel > 70) return 'battery-80';
        if (nivel > 50) return 'battery-60';
        if (nivel > 30) return 'battery-40';
        if (nivel > 10) return 'battery-20';
        return 'battery-alert';
    };

    return (
        <View style={styles.batteryCard}>
            <Icon 
                name={getBatteryIcon(nivelBateria)} 
                size={36} 
                color={obtenerColorBateria(nivelBateria)} 
            />
            <View style={styles.statusTextContainer}>
                <CustomText variant="title" style={styles.statusTitle} color={theme.colors.textPrimary}>
                    Nivel de Batería
                </CustomText>
                {nivelBateria !== null ? (
                    <CustomText style={{ fontSize: 16, fontWeight: 'bold', color: obtenerColorBateria(nivelBateria) }}>
                        {nivelBateria}%
                    </CustomText>
                ) : (
                    <CustomText variant="body" color={theme.colors.textSecondary}>
                        Calculando...
                    </CustomText>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    batteryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.xl,
        borderRadius: theme.borderRadius.large,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
        marginTop: theme.spacing.l,
    },
    statusTextContainer: {
        marginLeft: theme.spacing.l,
        flex: 1,
    },
    statusTitle: {
        fontWeight: 'bold',
        marginBottom: 4,
    }
});

export default BatteryCard;
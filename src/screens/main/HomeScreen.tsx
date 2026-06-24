import React from 'react';
import { View, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useUser } from '../../contexts/UserContext';
import CustomText from '../../components/Text';
import BatteryCard from '../../components/BatteryCard';
import { theme } from '../../styles/style';
import { styles } from './Styles/Homescreen.styles';
import { useUserData } from '../../hooks/useUserData';
import { useDeviceStatus } from '../../hooks/useDeviceStatus';

const HomeScreen = () => {
    const { user } = useUser();
    const { dispositivosVinculados, userName } = useUserData(user?.id);
    const dispositivoId = dispositivosVinculados.length > 0 ? dispositivosVinculados[0] : null;
    const isMonitoring = dispositivoId !== null;
    const { isOnline, nivelBateria } = useDeviceStatus(dispositivoId, isMonitoring);

    const getGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour >= 5 && currentHour < 12) return 'Buenos días';
        if (currentHour >= 12 && currentHour < 20) return 'Buenas tardes';
        return 'Buenas noches';
    };

    const getStatusColor = () => {
        if (!isMonitoring) return theme.colors.textSecondary;
        if (!isOnline) return theme.colors.danger;
        return theme.colors.primary;
    };

    const getStatusIcon = () => {
        if (!isMonitoring) return "wifi-off";
        if (!isOnline) return "alert-network";
        return "wifi";
    };

    const getStatusTitle = () => {
        if (!isMonitoring) return "Sin Dispositivo";
        if (!isOnline) return "Sensor Desconectado";
        return "Monitoreo Activo";
    };

    const getStatusDescription = () => {
        if (!isMonitoring) return "Ve a configuraciones para vincular";
        if (!isOnline) return "El equipo perdió conexión o energía";
        return "El sistema está operando correctamente";
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                
                <View style={styles.header}>
                    <CustomText style={styles.greetingText}>
                        {getGreeting()},{' '}
                    </CustomText>
                    <CustomText style={styles.nameText} color={theme.colors.primary}>
                        {userName || 'Cuidador'}
                    </CustomText>
                </View>

                <View style={styles.centerContent}>
                    <View style={[
                        styles.statusCard, 
                        isMonitoring && !isOnline && styles.statusCardError 
                    ]}>
                        <Icon 
                            name={getStatusIcon()} 
                            size={36} 
                            color={getStatusColor()} 
                        />
                        <View style={styles.statusTextContainer}>
                            <CustomText variant="title" style={styles.statusTitle} color={isMonitoring && !isOnline ? theme.colors.danger : theme.colors.textPrimary}>
                                {getStatusTitle()}
                            </CustomText>
                            <CustomText variant="body" color={theme.colors.textSecondary}>
                                {getStatusDescription()}
                            </CustomText>
                        </View>
                    </View>

                    {isMonitoring && (
                        <BatteryCard nivelBateria={nivelBateria} />
                    )}
                </View>

            </View>
        </SafeAreaView>
    );
};
export default HomeScreen;
import React from 'react';
import { View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { useUser } from '../../contexts/UserContext';
import { useDeviceEvents } from '../../hooks/useDeviceEvents';
import CustomText from '../../components/Text';
import { theme } from '../../styles/style';
import { styles } from './Styles/Monitoringscreen.styles';

interface Event {
    id: string;
    tipo_evento: string;
    fecha_hora: any;
    fuerza_g?: number;
}

const MonitoringScreen = () => {
    const { user, userPlan } = useUser();
    const { events, loading } = useDeviceEvents(user?.id, userPlan);
    const formatTime = (timestamp: any) => {
        if (!timestamp || typeof timestamp.toDate !== 'function') {
            return 'Procesando fecha...';
        }
        const date = timestamp.toDate();
        return date.toLocaleString('es-CL');
    };

    if (userPlan === 'basico') {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.muroContainer}>
                    <CustomText style={styles.candadoIcon}>!</CustomText>
                    <CustomText variant="title" style={styles.muroTitle}>
                        Acceso Restringido
                    </CustomText>
                    <CustomText variant="body" color={theme.colors.textSecondary} style={styles.muroText} align="center">
                        El historial de caídas son funciones exclusivas del Plan Familiar.
                    </CustomText>
                </View>
            </SafeAreaView>
        );
    }

    if (loading) {
        return (
            <SafeAreaView style={styles.centerContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <CustomText variant="body" color={theme.colors.textSecondary} style={styles.loadingText}>
                    Cargando historial...
                </CustomText>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <CustomText variant="title" style={styles.headerTitle}>
                    Historial de Eventos
                </CustomText>
                
                <FlatList
                    data={events}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => { 
                        const eventName = (item.tipo_evento || '').toLowerCase();
                        const isFall = eventName.includes('caida') || eventName.includes('caída');
                        
                        return (
                            <View style={[
                                styles.eventCard, 
                                isFall ? styles.fallBorder : styles.normalBorder
                            ]}>
                                <View>
                                    <CustomText 
                                        variant="subtitle" 
                                        color={isFall ? theme.colors.danger : theme.colors.primary}
                                    >
                                        {item.tipo_evento}
                                    </CustomText>
                                    
                                    <CustomText variant="caption" style={styles.eventDate}>
                                        {formatTime(item.fecha_hora)}
                                    </CustomText>
                                </View>
                                
                                {item.fuerza_g !== undefined && (
                                    <CustomText variant="subtitle" style={styles.gForce}>
                                        {item.fuerza_g} G
                                    </CustomText>
                                )}
                            </View>
                        );
                    }}
                    ListEmptyComponent={
                        <CustomText variant="body" align="center" style={styles.emptyText}>
                            No hay eventos registrados para tus equipos vinculados.
                        </CustomText>
                    }
                    contentContainerStyle={styles.flatlistContent}
                />
            </View>
        </SafeAreaView>
    );
};
export default MonitoringScreen;
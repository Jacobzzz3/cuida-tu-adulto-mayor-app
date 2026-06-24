import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView, Alert, TextInput, TouchableOpacity } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useUser } from '../../contexts/UserContext';
import { useUserData } from '../../hooks/useUserData';
import CustomText from '../../components/Text';
import CustomButton from '../../components/CustomButton';
import Card from '../../components/Card';
import { theme } from '../../styles/style';
import { styles } from './Styles/Settingsscreen.styles';

const SettingsScreen = () => {
    const { user, logout, userPlan, cambiarPlan } = useUser();
    
    const [codigoDispositivo, setCodigoDispositivo] = useState('');
    const [isVinculando, setIsVinculando] = useState(false);
    const { dispositivosVinculados, userName } = useUserData(user?.id);
    const vincularDispositivo = async () => {
        const nuevoCodigo = codigoDispositivo.trim().toUpperCase();

        if (!nuevoCodigo) {
            Alert.alert("Atención", "Por favor ingresa un código válido.");
            return;
        }

        if (userPlan === 'basico' && dispositivosVinculados.length >= 1) {
            Alert.alert("Límite Alcanzado", "El Plan Básico solo permite 1 dispositivo. Cambia al Plan Familiar en la configuración para vincular más equipos.");
            return;
        }

        if (dispositivosVinculados.includes(nuevoCodigo)) {
            Alert.alert("Atención", "Este equipo ya se encuentra vinculado a tu cuenta.");
            return;
        }

        setIsVinculando(true);
        try {
            const userRef = doc(db, 'USUARIOS', user!.id);
            const nuevosDispositivos = [...dispositivosVinculados, nuevoCodigo];
            
            await setDoc(userRef, {
                dispositivos: nuevosDispositivos,
                dispositivo_id: nuevoCodigo 
            }, { merge: true });

            Alert.alert("Éxito", `Tu aplicación ahora está vinculada al equipo: ${nuevoCodigo}`);
            setCodigoDispositivo('');
        } catch (error) {
            Alert.alert("Error", "No se pudo vincular el equipo.");
        } finally {
            setIsVinculando(false);
        }
    };

    const initial = user?.email ? user.email.charAt(0).toUpperCase() : 'C';
    const limiteAlcanzado = userPlan === 'basico' && dispositivosVinculados.length >= 1;

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                
                <CustomText variant="title" style={styles.screenTitle}>Configuración</CustomText>

                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <CustomText style={styles.avatarText}>{initial}</CustomText>
                    </View>
                    <View style={styles.profileInfo}>
                        <CustomText variant="subtitle">{userName || 'Cuidador'}</CustomText>
                        <CustomText variant="caption" color={theme.colors.textSecondary} style={styles.userEmail}>
                            {user?.email || "Cargando correo..."}
                        </CustomText>
                        <View style={styles.statusBadge}>
                            <View style={styles.statusDot} />
                            <CustomText variant="caption" style={styles.statusText}>Cuenta Activa</CustomText>
                        </View>
                    </View>
                </View>

                <CustomText variant="caption" color={theme.colors.textSecondary} style={styles.sectionTitle}>
                    Simulador de Suscripción
                </CustomText>
                
                <Card>
                    <CustomText variant="subtitle" style={styles.planStatusText}>
                        Plan actual: {userPlan === 'basico' ? 'BÁSICO' : 'FAMILIAR'}
                    </CustomText>
                    
                    <View style={styles.planButtonsContainer}>
                        <TouchableOpacity 
                            style={[styles.planButton, userPlan === 'basico' ? styles.planButtonActive : styles.planButtonInactive]}
                            onPress={() => cambiarPlan('basico')}
                        >
                            <CustomText style={[styles.planButtonText, userPlan === 'basico' ? styles.planTextActive : styles.planTextInactive]}>
                                Plan Básico
                            </CustomText>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.planButton, userPlan === 'familiar' ? styles.planButtonActive : styles.planButtonInactive]}
                            onPress={() => cambiarPlan('familiar')}
                        >
                            <CustomText style={[styles.planButtonText, userPlan === 'familiar' ? styles.planTextActive : styles.planTextInactive]}>
                                Plan Familiar
                            </CustomText>
                        </TouchableOpacity>
                    </View>
                </Card>

                <CustomText variant="caption" color={theme.colors.textSecondary} style={styles.sectionTitle}>
                    Equipos Vinculados
                </CustomText>
                
                <Card>
                    {dispositivosVinculados.length > 0 ? (
                        dispositivosVinculados.map((disp, index) => (
                            <View key={index} style={styles.currentDeviceContainer}>
                                <CustomText variant="caption" style={styles.currentDeviceLabel}>
                                    Equipo {index + 1}:
                                </CustomText>
                                <CustomText variant="subtitle" style={styles.currentDeviceText}>
                                    {disp}
                                </CustomText>
                            </View>
                        ))
                    ) : (
                        <CustomText variant="caption" color={theme.colors.textSecondary} style={styles.settingDescription}>
                            No tienes ningún equipo vinculado. Ingresa el código de tu sensor.
                        </CustomText>
                    )}
                    
                    <CustomText variant="caption" color={theme.colors.textSecondary} style={styles.settingDescription}>
                        {limiteAlcanzado 
                            ? "Límite de 1 equipo alcanzado en el Plan Básico." 
                            : "Ingresa el código del nuevo sensor aquí:"}
                    </CustomText>
                    
                    <View style={styles.inputRow}>
                        <TextInput
                            style={styles.input}
                            placeholder="Ej: CUIDA-1234"
                            placeholderTextColor={theme.colors.textSecondary}
                            value={codigoDispositivo}
                            onChangeText={setCodigoDispositivo}
                            autoCapitalize="characters"
                            autoCorrect={false}
                            editable={!limiteAlcanzado}
                        />
                        <CustomButton 
                            title="Vincular" 
                            onPress={vincularDispositivo} 
                            isLoading={isVinculando}
                            style={styles.bindButton}
                            disabled={limiteAlcanzado}
                        />
                    </View>
                </Card>

                <CustomButton 
                    title="Cerrar Sesión" 
                    variant="danger" 
                    onPress={logout} 
                    style={styles.logoutButton} 
                />

            </ScrollView>
        </SafeAreaView>
    );
};

export default SettingsScreen;
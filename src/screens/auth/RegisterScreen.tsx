import React, { useState } from 'react';
import { View, SafeAreaView, Alert, ScrollView, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import CustomText from '../../components/Text';
import CustomInput from '../../components/CustomImputs';
import CustomButton from '../../components/CustomButton';
import { theme } from '../../styles/style';

const RegisterScreen = ({ navigation }: any) => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dispositivoId, setDispositivoId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async () => {
        setErrorMessage('');
        
        if (!nombre.trim() || !email.trim() || !password.trim() || !dispositivoId.trim()) {
            setErrorMessage('Por favor, completa todos los campos.');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden.');
            return;
        }

        setIsLoading(true);
        try {
            const credencialUsuario = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(credencialUsuario.user);
            
            await setDoc(doc(db, "USUARIOS", credencialUsuario.user.uid), {
                nombre: nombre,
                email: email.toLowerCase(),
                fcmToken: null,
                dispositivo_id: dispositivoId.trim().toUpperCase(),
                fechaRegistro: new Date()
            });

            Alert.alert(
                "¡Cuenta creada!", 
                "Revisa tu correo para verificar tu cuenta.", 
                [{ text: "OK", onPress: () => navigation.navigate('Login') }]
            );
        } catch (error: any) {
            setErrorMessage('Error: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                
                <CustomText variant="title" align="center" style={styles.titleSpacing}>
                    Crear Cuenta
                </CustomText>
                
                <CustomInput 
                    label="Nombre Completo" 
                    value={nombre} 
                    onChangeText={setNombre} 
                />
                
                <CustomInput 
                    label="Correo Electrónico" 
                    value={email} 
                    onChangeText={setEmail} 
                    autoCapitalize="none" 
                    keyboardType="email-address" 
                />
                
                <CustomInput 
                    label="ID del Dispositivo Sensor" 
                    value={dispositivoId} 
                    onChangeText={setDispositivoId} 
                    placeholder="Ej: CUIDA-1001"
                    autoCapitalize="characters"
                />
                
                <CustomInput 
                    label="Contraseña" 
                    value={password} 
                    onChangeText={setPassword} 
                    secureTextEntry 
                />
                
                <CustomInput 
                    label="Confirmar Contraseña" 
                    value={confirmPassword} 
                    onChangeText={setConfirmPassword} 
                    secureTextEntry 
                />
                
                <View style={styles.buttonSpacing}>
                    <CustomButton 
                        title="Registrarme" 
                        onPress={handleRegister} 
                        isLoading={isLoading} 
                    />
                </View>

                {errorMessage ? (
                    <CustomText align="center" color={theme.colors.danger} style={styles.errorText}>
                        {errorMessage}
                    </CustomText>
                ) : null}

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: theme.colors.background 
    },
    scrollContainer: { 
        padding: theme.spacing.l,
        paddingBottom: theme.spacing.xl 
    },
    titleSpacing: { 
        marginBottom: theme.spacing.xl,
        marginTop: theme.spacing.m 
    },
    buttonSpacing: {
        marginTop: theme.spacing.m,
        marginBottom: theme.spacing.m
    },
    errorText: { 
        marginTop: theme.spacing.s 
    }
});

export default RegisterScreen;
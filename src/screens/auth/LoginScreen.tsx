import React, { useState } from 'react';
import { View, Alert, TouchableOpacity, Platform, PermissionsAndroid, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { auth, db } from '../../firebaseConfig';
import { useUser } from '../../contexts/UserContext'; 
import CustomText from '../../components/Text';
import CustomInput from '../../components/CustomImputs';
import CustomButton from '../../components/CustomButton';
import { theme } from '../../styles/style';

const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    
    const { login } = useUser(); 

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Por favor ingresa correo y contraseña");
            return;
        }

        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;

            if (Platform.OS === 'android' && Platform.Version >= 33) {
                await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
            }

            await messaging().requestPermission();
            const token = await messaging().getToken();
            const sessionToken = Date.now().toString();

            if (token) {
                const userRef = doc(db, 'USUARIOS', uid);
                await setDoc(userRef, { 
                    fcmToken: token,
                    email: email.toLowerCase(),
                    sessionToken: sessionToken
                }, { merge: true });
            }

            await login({ email: email.toLowerCase(), uid: uid, sessionToken: sessionToken });

        } catch (error) {
            Alert.alert("Error", "Credenciales incorrectas o problema de red");
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async () => {
        if (!email) {
            Alert.alert("Atención", "Ingresa tu correo en el campo superior para enviarte el enlace.");
            return;
        }

        setIsResetting(true);
        try {
            const usuariosRef = collection(db, 'USUARIOS');
            const q = query(usuariosRef, where('email', '==', email.toLowerCase()));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                Alert.alert("Error", "Este correo no se encuentra registrado en nuestro sistema.");
                setIsResetting(false);
                return;
            }

            await sendPasswordResetEmail(auth, email.toLowerCase());
            Alert.alert("Éxito", "Revisa tu bandeja de entrada para restablecer tu contraseña.");
            
        } catch (error) {
            Alert.alert("Error", "Este correo no se encuentra Registrado.");
        } finally {
            setIsResetting(false);
        }
    };

    return (
        <View style={styles.container}>
            <CustomText variant="title" align="center" style={styles.titleSpacing}>
                Iniciar Sesión
            </CustomText>

            <CustomInput
                label="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <CustomInput
                label="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity onPress={handlePasswordReset} disabled={isResetting}>
                <CustomText 
                    variant="caption" 
                    align="right" 
                    color={isResetting ? theme.colors.textSecondary : theme.colors.primary} 
                    style={styles.forgotPassword}
                >
                    {isResetting ? "Verificando correo..." : "¿Olvidaste tu contraseña?"}
                </CustomText>
            </TouchableOpacity>

            <View style={styles.buttonSpacing}>
                <CustomButton 
                    title="Entrar" 
                    onPress={handleLogin} 
                    isLoading={loading} 
                    disabled={isResetting}
                />
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <CustomText variant="body" align="center" color={theme.colors.primary} style={styles.registerText}>
                    ¿No tienes cuenta? Regístrate aquí
                </CustomText>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        padding: theme.spacing.l, 
        backgroundColor: theme.colors.surface 
    },
    titleSpacing: { 
        marginBottom: theme.spacing.xl 
    },
    forgotPassword: { 
        marginBottom: theme.spacing.l,
        fontWeight: '500'
    },
    buttonSpacing: { 
        marginBottom: theme.spacing.l 
    },
    registerText: { 
        marginTop: theme.spacing.m,
        fontWeight: '500' 
    },
});
export default LoginScreen;
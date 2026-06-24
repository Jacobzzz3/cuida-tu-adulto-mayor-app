import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const useUserData = (userId: string | undefined) => {
    const [dispositivosVinculados, setDispositivosVinculados] = useState<string[]>([]);
    const [userName, setUserName] = useState<string>('');
    const [loadingUserData, setLoadingUserData] = useState(true);

    useEffect(() => {
        if (!userId) {
            setLoadingUserData(false);
            return;
        }

        const unsubscribe = onSnapshot(doc(db, 'USUARIOS', userId), (userDoc) => {
            if (userDoc.exists()) {
                const data = userDoc.data();
                
                if (data.dispositivos && Array.isArray(data.dispositivos)) {
                    setDispositivosVinculados(data.dispositivos);
                } else if (data.dispositivo_id) {
                    setDispositivosVinculados([data.dispositivo_id]);
                } else {
                    setDispositivosVinculados([]);
                }

                if (data.nombre) {
                    setUserName(data.nombre);
                }
            } else {
                setDispositivosVinculados([]);
            }
            setLoadingUserData(false);
        }, (error) => {
            console.error("Error leyendo datos del usuario:", error);
            setLoadingUserData(false);
        });

        return () => unsubscribe();
    }, [userId]);

    return { dispositivosVinculados, userName, loadingUserData };
};
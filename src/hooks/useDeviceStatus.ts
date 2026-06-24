import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const useDeviceStatus = (dispositivoId: string | null, isMonitoring: boolean) => {
    const [lastHeartbeat, setLastHeartbeat] = useState<number | null>(null);
    const [isOnline, setIsOnline] = useState<boolean>(false);
    const [nivelBateria, setNivelBateria] = useState<number | null>(null);

    useEffect(() => {
        if (!dispositivoId) return;

        const unsubscribe = onSnapshot(doc(db, 'DISPOSITIVOS', dispositivoId), (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                let timestampVal = 0;

                if (data?.ultima_conexion) {
                    if (typeof data.ultima_conexion.toMillis === 'function') {
                        timestampVal = data.ultima_conexion.toMillis();
                    } else if (data.ultima_conexion.seconds) {
                        timestampVal = data.ultima_conexion.seconds * 1000;
                    }
                }

                if (timestampVal > 0) {
                    setLastHeartbeat(timestampVal);
                }

                if (data?.bateria_porcentaje !== undefined) {
                    setNivelBateria(data.bateria_porcentaje);
                } else if (data?.bateria !== undefined) {
                    setNivelBateria(data.bateria);
                }
            }
        });

        return () => unsubscribe();
    }, [dispositivoId]);

    useEffect(() => {
        if (!isMonitoring || !lastHeartbeat) {
            setIsOnline(false);
            return;
        }

        const checkConnection = () => {
            const now = Date.now();
            let diffMs = now - lastHeartbeat;

            if (diffMs < 0) {
                diffMs = Math.abs(diffMs);
            }

            const diffMinutes = diffMs / 1000 / 60;

            if (diffMinutes > 6) {
                setIsOnline(false);
            } else {
                setIsOnline(true);
            }
        };

        checkConnection();
        const intervalId = setInterval(checkConnection, 10000);

        return () => clearInterval(intervalId);
    }, [lastHeartbeat, isMonitoring]);

    return { isOnline, nivelBateria };
};
import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Alert } from 'react-native';

interface Event {
    id: string;
    tipo_evento: string;
    fecha_hora: any;
    fuerza_g?: number;
}

export const useDeviceEvents = (userId: string | undefined, userPlan: string) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId || userPlan === 'basico') {
            setLoading(false);
            return;
        }

        let unsubscribeEvents = () => {};

        const unsubscribeUser = onSnapshot(doc(db, 'USUARIOS', userId), (userDoc) => {
            if (userDoc.exists()) {
                const data = userDoc.data();
                let dispositivosAVigilar: string[] = [];

                if (data.dispositivos && Array.isArray(data.dispositivos) && data.dispositivos.length > 0) {
                    dispositivosAVigilar = data.dispositivos;
                } else if (data.dispositivo_id) {
                    dispositivosAVigilar = [data.dispositivo_id];
                }

                if (dispositivosAVigilar.length === 0) {
                    setEvents([]);
                    setLoading(false);
                    return;
                }

                unsubscribeEvents();

                const q = query(
                    collection(db, 'LECTURAS_EVENTOS'),
                    where('dispositivo_id', 'in', dispositivosAVigilar),
                    orderBy('fecha_hora', 'desc')
                );

                unsubscribeEvents = onSnapshot(q, (querySnapshot) => {
                    const fetchedEvents = querySnapshot.docs.map(docSnap => ({
                        id: docSnap.id,
                        ...docSnap.data()
                    })) as Event[];

                    setEvents(fetchedEvents);
                    setLoading(false);
                }, (error) => {
                    Alert.alert("Error de Monitoreo", "No se pudo cargar el historial.");
                    setLoading(false);
                });
            } else {
                setLoading(false);
            }
        }, (error) => {
            setLoading(false);
        });

        return () => {
            unsubscribeUser();
            unsubscribeEvents();
        };
    }, [userId, userPlan]);

    return { events, loading };
};
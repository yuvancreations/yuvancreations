import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc, setDoc, updateDoc, increment, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const VisitorContext = createContext();

export const useVisitors = () => useContext(VisitorContext);

const VisitorProvider = ({ children }) => {
    const [visitorCount, setVisitorCount] = useState(0);

    useEffect(() => {
        const statsRef = doc(db, 'site_stats', 'visitors');

        // Listen for real-time updates
        const unsubscribe = onSnapshot(statsRef, (docSnap) => {
            if (docSnap.exists()) {
                const total = docSnap.data().total || 0;
                // UI mein 5650 se kam nahi dikhayenge
                setVisitorCount(total < 5650 ? 5650 : total);
            } else {
                setDoc(statsRef, { total: 5650 });
            }
        });

        // Increment count only once per session
        const hasVisited = sessionStorage.getItem('visited_session');
        if (!hasVisited) {
            const incrementStats = async () => {
                try {
                    const snap = await getDoc(statsRef);
                    let newTotal = 5651;
                    if (snap.exists()) {
                        const currentTotal = snap.data().total || 0;
                        newTotal = Math.max(currentTotal + 1, 5651);
                        await updateDoc(statsRef, { total: newTotal });
                    } else {
                        await setDoc(statsRef, { total: 5651 });
                    }
                    sessionStorage.setItem('visited_session', 'true');
                } catch (error) {
                    console.error("Error updating visitor count:", error);
                }
            };
            incrementStats();
        }

        return () => unsubscribe();
    }, []);

    return (
        <VisitorContext.Provider value={{ visitorCount }}>
            {children}
        </VisitorContext.Provider>
    );
};

export default VisitorProvider;

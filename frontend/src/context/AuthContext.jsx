import React, { createContext, useState, useEffect, useContext } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    sendEmailVerification
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // Fetch user data from firestore to get role
                const docRef = doc(db, 'users', currentUser.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUser({ ...currentUser, ...docSnap.data() });
                } else {
                    setUser(currentUser); // fallback
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const currentUser = userCredential.user;

            if (!currentUser.emailVerified) {
                await signOut(auth);
                return { success: false, message: 'Please verify your email first. A verification link was sent to your email.' };
            }

            const docRef = doc(db, 'users', currentUser.uid);
            const docSnap = await getDoc(docRef);
            let role = 'user';

            if (email.toLowerCase() === 'yuvancreationshrd@gmail.com') {
                role = 'admin';
                // ensure it's admin in firestore too just in case
                await setDoc(docRef, { role: 'admin' }, { merge: true });
            } else if (docSnap.exists()) {
                role = docSnap.data().role || 'user';
            }

            return { success: true, role };
        } catch (err) {
            let message = 'Login failed';
            if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
                message = 'Invalid email or password';
            }
            return { success: false, message };
        }
    };

    const signup = async (name, email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const currentUser = userCredential.user;

            // Update display name
            await updateProfile(currentUser, { displayName: name });

            // Send verification email
            await sendEmailVerification(currentUser);

            // Check if admin email
            const role = email.toLowerCase() === 'yuvancreationshrd@gmail.com' ? 'admin' : 'user';

            // Save user to Firestore
            await setDoc(doc(db, 'users', currentUser.uid), {
                uid: currentUser.uid,
                name,
                email,
                role: role,
                createdAt: serverTimestamp()
            });

            // Save to Google Sheets Users tab automatically
            try {
                await fetch('https://script.google.com/macros/s/AKfycbwDSaHEY7BRrd4otYPqaLWDTrnbTqWcCVFZZr8f1qEQdT4zva9UoFn8xSx5kqO5FEFE/exec', {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        sheetName: 'Registered Users',
                        payload: {
                            UserID: currentUser.uid,
                            Name: name,
                            Email: email,
                            Role: role
                        }
                    })
                });
            } catch (err) {
                console.error("Sheet api err", err);
            }

            // Optional: Sign out immediately so they have to verify their email to login
            await signOut(auth);

            return {
                success: false, // We return false for immediate login, but with a specific message
                message: 'Account created! Please check your email to verify your account before logging in.'
            };
        } catch (err) {
            let message = 'Signup failed';
            if (err.code === 'auth/email-already-in-use') {
                message = 'Email is already registered';
            } else if (err.code === 'auth/weak-password') {
                message = 'Password should be at least 6 characters';
            }
            return { success: false, message };
        }
    };

    const logout = async () => {
        await signOut(auth);
    };

    // Keep backwards compatibility for some components using api / token
    const token = user ? user.accessToken : null;
    const api = null; // We are removing axios interceptor dependency

    return (
        <AuthContext.Provider value={{ user, token, loading, login, signup, logout, api }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

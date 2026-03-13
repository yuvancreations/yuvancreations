import { doc, getDoc, setDoc } from 'firebase/firestore';
import defaultCMSData from '../defaultCMSData.json';
import { db } from './firebase';

const restoreMainConfig = async () => {
    const docRef = doc(db, 'site_content', 'main_config');
    const snap = await getDoc(docRef);
    const currentData = snap.exists() ? snap.data() : {};

    await setDoc(docRef, { ...currentData, ...defaultCMSData });
    console.log('main_config restored with current defaultCMSData schema');
};

restoreMainConfig();

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID,
};

import { getApps, initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    signOut,
    GoogleAuthProvider,
    connectAuthEmulator,
} from "firebase/auth";
import {
    connectFirestoreEmulator,
    doc,
    getDoc,
    initializeFirestore,
    persistentLocalCache,
    persistentMultipleTabManager,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { nanoid } from "nanoid";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyAzsb3HYq6oT3eNMjjT-w6jUSDj-GcEyXQ",
//     authDomain: "c-dule.firebaseapp.com",
//     projectId: "c-dule",
//     storageBucket: "c-dule.appspot.com",
//     messagingSenderId: "574855510160",
//     appId: "1:574855510160:web:597b9e13d64d54c11d8015",
// };

// Initialize Firebase
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestoreDb = initializeFirestore(app, {
    localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager(),
    }),
});

if (globalThis?.location?.hostname === "localhost") {
    connectAuthEmulator(auth, "http://127.0.0.1:4001");
    connectFirestoreEmulator(firestoreDb, "127.0.0.1", 4002);
    connectStorageEmulator(storage, "127.0.0.1", 4007);
}

export async function createFolder(
    creator: string,
    files: string[],
    path: string,
    folderName?: string,
    additionalData?: any
) {
    if (!folderName) {
        folderName = "folder-" + nanoid(5);
    }
    const checkDoc = await getDoc(doc(firestoreDb, path, folderName));
    if (checkDoc.exists()) {
        throw new Error("Folder already exists");
    }
    await setDoc(
        doc(firestoreDb, path, folderName),
        {
            type: "folder",
            creator,
            folderName,
            files,
            createdAt: serverTimestamp(),
            ...additionalData,
        },
        { merge: true }
    );
}

export async function signInWithGoogle() {
    try {
        let provider = new GoogleAuthProvider();
        let { user } = await signInWithPopup(auth, provider);
        // set a document in firestore
        await createFolder(
            user.uid,
            [],
            "folders",
            user.displayName! + nanoid(5)
        );
        return user;
    } catch (e: any) {
        console.warn("There was an error at signInWithGoogle", e);
        await signOut(auth);
        return e.code as string;
    }
}

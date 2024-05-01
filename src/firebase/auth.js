import { GoogleAuthProvider, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updatePassword } from "firebase/auth"
import {auth } from "./firebase"

export const doCreateUserWithEmailAndPassword = async(email,password)=> {

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async(email, password) => {
    
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        let token = await userCredential.user.getIdToken();
        localStorage.setItem('firebaseToken', token);
        console.log('Stored token:', localStorage.getItem('firebaseToken'));

        if (token) {
            token = await refreshToken();
            localStorage.setItem('firebaseToken', token);
          }
        return token;
    } catch (error) {
        console.error("error", error);
        throw error;
    }
};

export const doSignInWithGoogle = async() => {
    const provider = GoogleAuthProvider();
    const result = await doSignInWithPopup(auth, provider);
    return result;
};

export const doSignOut = () => {
    return auth.signOut();
}

export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
}

export const doPasswordChange = (password) => {
    return updatePassword(auth.updateCurrentUser, password);
}

export const doSendEmailVarification = () => {
    return sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`,
    });
}

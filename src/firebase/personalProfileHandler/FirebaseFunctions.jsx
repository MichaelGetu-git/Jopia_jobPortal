import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "../firebase"
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from "../firebase";

export const uploadPortfolio = async(userId, portfolios) => {
    const uploadPromises = portfolios.map(async(file, index) => {

        const fileName = `${Date.now()}_${file.name}`;
        const storageRef = ref(storage, `users/${userId}/portfolio/${file.name}`);
        await uploadBytes(storageRef, file);

        const downloadURL = await getDownloadURL(storageRef);
        return {
            fileName: fileName,
            downloadURL: downloadURL,
        };
    });

    const uploadedPortfolios = await Promise.all(uploadPromises);
    return uploadedPortfolios;
};


export const fetchCoverPic = async(userId) => {
    try {
        const userCoverDocRef = doc(db, 'users',userId);
        const userCoverDocSnap = await getDoc(userCoverDocRef);

        if(userCoverDocSnap.exists()) {
            return userCoverDocSnap.data().coverPictureURL || null;
        } else {
            console.log("no profile pic");
            return null;
        }
    } catch (error) {
        console.error("Error", error);
    }
};

export const fetchProfilePic = async(userId) => {
    try {
        const userProfileDocRef = doc(db, 'users',userId);
        const userProfileDocSnap = await getDoc(userProfileDocRef);

        if (userProfileDocSnap.exists()) {
            return userProfileDocSnap.data().profilePictureURL || null;
        } else {
            console.log("no cover");
            return null;
        }
    } catch (error) {
        console.error("error", error);
    }
};


export const uploadProfilePictureURL = async(userId, downloadURL) => {
    try {
        const userProfileDocRef = doc(db, 'users', userId);
        await setDoc(userProfileDocRef, {profilePictureURL: downloadURL}, {merge: true});
        return true;
    } catch(error) {
        console.error("error", error);
        return false;
    }
};

export const uploadCoverPictureURL = async(userId, downloadURL) => {
    try {
        const userProfileDocRef = doc(db, 'users', userId);
        await setDoc(userProfileDocRef, {coverPictureURL: downloadURL}, {merge: true});
        return true;
    } catch(error) {
        console.error("error", error);
        return false;
    }
};
export const uploadProfilePicture = async(userId, file) => {
    try {
        const storageRef = ref(storage, `users/profilePictures/${userId}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        await uploadProfilePictureURL(userId, downloadURL);
        return downloadURL;
    } catch(error) {
        console.error("Error", error);
        return null;
    }
}

export const uploadCoverPicture = async(userId, file) => {
    try {
        const storageRef = ref(storage, `users/coverPictures/${userId}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        await uploadCoverPictureURL(userId, downloadURL);
        return downloadURL;
    } catch(error) {
        console.error("Error", error);
        return null;
    }
}

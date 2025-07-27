import {db} from "../server/firebase-config.js";

// import firebase methods
import {
    collection, 
    getDocs, 
    getDoc, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc
} from "firebase/firestore";

const userCollectionRef = collection(db, "users ");
class UserDataService {
    // user collection ref
    addUsers = (newUser) => {
        return addDoc(userCollectionRef, newUser);
    };

    updateUser = (id, udpdatedUser) => {
        const userDoc = doc(db, "users ", id);
        return updateDoc(userDoc, udpdatedUser);
    };

    deleteUser = (id) => {
        const userDoc = doc(db, "users ", id);
        return deleteDoc(userDoc);
    };

    getAllUsers = () => {
        return getDocs(userCollectionRef);
    };

    getUser = (id) => {
        const userDoc = doc(db, "users ", id);
        return getDoc(userDoc);
    };
}

export default new UserDataService();
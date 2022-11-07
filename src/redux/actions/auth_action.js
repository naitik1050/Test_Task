import auth from '@react-native-firebase/auth';

export async function logIn({ email, password }) {
    try {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        return Promise.resolve(userCredential.user);
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function signUp({ email, password }) {
    try {
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        sendVerificationEmail();
        return Promise.resolve(userCredential.user);
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function sendVerificationEmail() {
    try {
        return await auth().currentUser.sendEmailVerification();
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function signOut() {
    try {
        return await auth().signOut();
    } catch (error) {
        return Promise.reject(error);
    }
}
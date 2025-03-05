import { initializeApp } from "firebase/app";
import {
	browserSessionPersistence,
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export async function signInWithGoogle() {
	const provider = new GoogleAuthProvider();

	try {
		await auth.setPersistence(browserSessionPersistence).then(() => {
			return signInWithPopup(auth, provider);
		});
	} catch (error) {
		console.error("Error signing in with Google", error);
	}
}

export async function signOut() {
	try {
		return auth.signOut();
	} catch (error) {
		console.error("Error signing out with Google", error);
	}
}

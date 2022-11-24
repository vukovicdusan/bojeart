import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
// import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
	apiKey: "AIzaSyBGOdbm1wcqIbxvUjZQ3VMGSQLaQtIteDk",
	authDomain: "bojeart-89dc8.firebaseapp.com",
	projectId: "bojeart-89dc8",
	storageBucket: "bojeart-89dc8.appspot.com",
	messagingSenderId: "814181457842",
	appId: "1:814181457842:web:81282420b6777f53b0ceab",
	measurementId: "G-EPX03C3S8L",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
// const analytics = getAnalytics(app)

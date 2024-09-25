import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';

const FireBaseConfig = {
    apiKey: "AIzaSyBtldKTmCQlLVcrZGduSLzlusX7pmX3yck",
    authDomain: "pagina-marketplace.firebaseapp.com",
    projectId: "pagina-marketplace",
    storageBucket: "pagina-marketplace.appspot.com",
    messagingSenderId: "240055871887",
    appId: "1:240055871887:web:ce16690cf32c35a66743fa",
    measurementId: "G-KKV0P2Z924"

}

const app = initializeApp(FireBaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

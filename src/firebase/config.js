
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/app"


const firebaseConfig = {
  apiKey: "AIzaSyCjcAieWtdK5rJ-XnNX_qVxXLu70IGEfvY",
  authDomain: "miniblog-9d67c.firebaseapp.com",
  projectId: "miniblog-9d67c",
  storageBucket: "miniblog-9d67c.appspot.com",
  messagingSenderId: "304277339184",
  appId: "1:304277339184:web:8b9770446b3102fce781f5"
};

const app = initializeApp(firebaseConfig);

//inicializando o banco de dados do firebase
const db = getFirestore(app)
export {db}
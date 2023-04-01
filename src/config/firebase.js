import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  getCountFromServer,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCP-bSbKeB68d4UCUqyS7xkZ1dydYJ1W0k",
  authDomain: "auth-roles-react.firebaseapp.com",
  projectId: "auth-roles-react",
  storageBucket: "auth-roles-react.appspot.com",
  messagingSenderId: "366588030798",
  appId: "1:366588030798:web:83f54926187b52a3b5f81f",
  measurementId: "G-MET9L6V017",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();

const admin = collection(db, "admin");
const salesPerson = collection(db, "salesPerson");
const accountant = collection(db, "accountant");
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const user_typ = async (email) => {
  try {
    let q = query(admin, where("email", "==", email));

    let snapshot = await getCountFromServer(q);
    if (snapshot.data().count >= 1) {
      return "admin";
    }

    q = query(salesPerson, where("email", "==", email));

    snapshot = await getCountFromServer(q);
    if (snapshot.data().count >= 1) {
      return "salesPerson";
    }
    q = query(accountant, where("email", "==", email));

    snapshot = await getCountFromServer(q);
    if (snapshot.data().count >= 1) {
      return "accountant";
    }
  } catch (err) {
    console.error(err);
    // alert(err.message);
    throw err;
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    let user;
    await user_typ(email)
      .then((val) => {
        user = val;
      })
      .catch((err) => console.log(err));

    return user;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const snapshot = await getCountFromServer(admin);
    if (snapshot.data().count !== 0) {
      alert("An Admin Already exists.. go to login ");
      return;
    }
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(admin, {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  storage,
};

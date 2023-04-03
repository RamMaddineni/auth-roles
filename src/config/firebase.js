import {initializeApp} from "firebase/app";

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
import {getStorage} from "firebase/storage";

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
    console.log("came to login func");
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
    if (snapshot.data().count != 0) {
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
const registerEmployee = async (name, email, password, userType) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    const user = res.user;

    if (userType.toLowerCase() === "salesperson") {
      const qu = query(salesPerson, where("email", "==", email));

      const snapshot = await getCountFromServer(qu);
      console.log("came here Line 136");
      if (snapshot.data().count == 0) {
        await addDoc(salesPerson, {
          uid: user.uid,
          name,
          authProvider: "local",
          email,
          password,
        });
        alert("SalesPerson added Successfully");
      } else {
        alert("SalesPerson already Added");
      }
    }
    if (userType.toLowerCase() === "accountant") {
      const qu = query(accountant, where("email", "==", email));

      const snapshot = await getCountFromServer(qu);

      if (snapshot.data().count == 0) {
        await addDoc(accountant, {
          uid: user.uid,
          name,
          authProvider: "local",
          email,
          password,
        });
        alert("Accountant added Successfully");
      } else {
        alert("Accountant already Added");
      }
    }
    logout();

    let q = query(admin);
    const querySnapshot = await getDocs(q);
    let adminMail, adminPassword;
    querySnapshot.forEach((doc) => {
      adminMail = doc.data().email;
      adminPassword = doc.data().password;
    });

    await logInWithEmailAndPassword(adminMail, adminPassword);
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
const getObj = async (email, userType) => {
  try {
    let q = query(userType, where("email", "==", email));

    const querySnapshot = await getDocs(q);
    let Obj;
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());

      Obj = doc.data();

    });
    return Obj;
  }
  catch (err) {
    console.log(err.message);
    alert(err.message);
  }


}

const deleteUser = async (userType) => {

  const auth = app.auth();
  let email = auth?.currentUser?.email;
  let uid;
  let Obj;

  await getObj(email, userType).then((val) => {
    Obj = val;
  }).catch((err) => console.log(err));

  var emp = db.collection(userType).where('email', '==', email);
  emp.get().then(function (querySnapshot) {// delete from database
    querySnapshot.forEach(function (doc) {
      doc.ref.delete();
    });
  });
  auth.deleteUser(Obj.uid);// delete from authenticated users.


}
// const deleteUser = async (user) => {
//   // Need to create a second app to delete another user in Firebase auth list than the logged in one.
//   // https://stackoverflow.com/a/38013551/2012407
//   const secondaryApp = firebase.initializeApp(firebaseConfig, "Secondary");

//   if (!user.email || !user.password) {
//     return console.warn("Missing email or password to delete the user.");
//   }

//   await secondaryApp
//     .auth()
//     .signInWithEmailAndPassword(user.email, user.password)
//     .then(() => {
//       const userInFirebaseAuth = secondaryApp.auth().currentUser;
//       userInFirebaseAuth.delete(); // Delete the user in Firebase auth list (has to be logged in).
//       secondaryApp.auth().signOut();
//       secondaryApp.delete();

//       // Then you can delete the user from the users collection if you have one.
//     });
// };

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  storage,
  registerEmployee,
  getObj,
  deleteUser,
};

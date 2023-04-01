import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { auth, db, logout } from "../../config/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function SalesPerson() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const salesRef = collection(db, "salesPerson");
  const fetchUserName = async () => {
    try {
      const q = query(salesRef, where("uid", "==", user?.uid));

      const doc = await getDocs(q);

      const data = doc.docs[0].data();

      setName(data.username);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data Line sales");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName();
  }, [user, loading]);

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        Logged in as
        <div>{name}</div>
        <div>{user?.email}</div>
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default SalesPerson;

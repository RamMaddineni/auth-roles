import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Outlet } from "react-router-dom";

import { auth, db, logout } from "../../config/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Navbar from "../../components/Navbar";

function AdminPage() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const adminRef = collection(db, "admin");
  const fetchUserName = async () => {
    try {
      const q = query(adminRef, where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.username);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data Line admin");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    if (user) fetchUserName();
  }, [user, loading]);

  return (
    <div className="dashboard">
      <Navbar />

      <Outlet />
    </div>
  );
}

export default AdminPage;

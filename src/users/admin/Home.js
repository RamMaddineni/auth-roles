import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  collection,
  getCountFromServer,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
function Home() {
  const shows = collection(db, "shows");
  const qu = query(shows);
  let showList;
  const func_shows = async () => {
    const content = await getDocs(qu);
    const t = await getCountFromServer(qu);
    console.log(t.data().count);
    content.forEach((doc) => {
      showList = doc.data();
      console.log(showList, doc.data());
    });
  };
  func_shows();
  console.log("logger");
  console.log(showList);
  return <div>Hello</div>;
}

export default Home;

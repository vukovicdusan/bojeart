import React from "react";
import Region from "../../components/layout/Region";
import Login from "../../components/Login";
import Dashboard from "../../components/Dashboard";
import { useContext } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../public/firebase/firebase";
import LoginCtx from "../../store/LoginCtx";

const Autor = ({ categories }) => {
  const { user } = useContext(LoginCtx);

  return (
    <Region>
      <div className="center">
        {!user ? (
          <Login></Login>
        ) : (
          <Dashboard categories={categories}></Dashboard>
        )}
      </div>
    </Region>
  );
};

export default Autor;

export const getServerSideProps = async () => {
  let categories = [];

  try {
    const catsQuery = query(collection(db, "categories"));

    const catsQuerySnapshot = await getDocs(catsQuery);
    catsQuerySnapshot.forEach((doc) => {
      categories.push({ ...doc.data(), created_at: "" });
    });

    return {
      props: {
        categories: categories,
      },
    };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }
};

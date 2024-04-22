import React, { useContext, useEffect, useState } from "react";
import { db } from "../public/firebase/firebase";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import DeleteIcon from "./svg/DeleteIcon";
import styles from "../styles/ImageCategories.module.css";
import LoginCtx from "../store/LoginCtx";

const ImageCategories = (props) => {
  const [newCategory, setNewCategory] = useState("");
  const router = useRouter();
  const { user } = useContext(LoginCtx);

  const author = user === "jelena@gmail.com" ? "jelena" : "bojan";

  const addNewCategoryHandler = async (e) => {
    e.preventDefault();
    let slug = newCategory.split(" ").join("-");
    try {
      await setDoc(doc(db, "categories", slug), {
        author: author,
        category: newCategory,
        slug: slug,
      });
      router.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCatHandler = async (slug) => {
    await deleteDoc(doc(db, "categories", slug));
    router.reload();
  };

  return (
    <>
      <ul>
        {props.categories
          .filter((cat) => cat.author === author)
          .map((cat) => (
            <li key={cat.slug}>
              {cat.category}{" "}
              <button
                className={styles.delete}
                onClick={() => deleteCatHandler(cat.slug)}
              >
                <DeleteIcon></DeleteIcon>
              </button>{" "}
            </li>
          ))}
      </ul>
      <form className={styles.newCategoryform}>
        <div className="d-flex-c">
          <label htmlFor="newCategory">Dodaj Novu Kategoriju</label>
          <input
            placeholder="crteži..."
            // value={imageState.dimensions}
            name="newCategory"
            id="newCategory"
            onChange={(e) => setNewCategory(e.target.value)}
            type="text"
            autoCorrect="off"
          />
          <button onClick={(e) => addNewCategoryHandler(e)} className="button">
            Dodaj kategoriju
          </button>
        </div>
      </form>
    </>
  );
};

export default ImageCategories;

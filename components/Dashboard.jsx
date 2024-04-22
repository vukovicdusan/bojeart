import React, { useContext, useEffect, useState } from "react";
import LoginCtx from "../store/LoginCtx";
import UploadBlog from "./projects/BlogUpload";
import UploadPainting from "./UploadPainting";
import ImageCategories from "./ImageCategories";

const Dashboard = (props) => {
  let initialContent = localStorage.getItem("dashboard")
    ? localStorage.getItem("dashboard")
    : "image";
  const [dashboardContent, setDashboardContent] = useState(initialContent);
  const { user } = useContext(LoginCtx);

  useEffect(() => {
    localStorage.setItem("dashboard", dashboardContent);
  }, [dashboardContent]);

  const author = user === "jelena@gmail.com" ? "jelena" : "bojan";

  let content;
  switch (dashboardContent) {
    case "blog":
      content = <UploadBlog></UploadBlog>;
      break;
    case "image":
      content = <UploadPainting categories={props.categories}></UploadPainting>;
      break;
    case "categories":
      content = (
        <ImageCategories categories={props.categories}></ImageCategories>
      );
      break;
    default:
      "";
  }

  return (
    <div className="stack">
      <h2>{author === "jelena" ? "Dobrodošla Jelena" : "Dobrodošao Bojane"}</h2>
      <ul className="wrap">
        <li className="button" onClick={() => setDashboardContent("image")}>
          Postavi sliku
        </li>
        <li
          className="button"
          onClick={() => setDashboardContent("categories")}
        >
          Moje kategorije
        </li>
        <li className="button" onClick={() => setDashboardContent("blog")}>
          Piši malo
        </li>
      </ul>

      {content}
    </div>
  );
};

export default Dashboard;

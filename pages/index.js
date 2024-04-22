import Head from "next/head";
import ImageGrid from "../components/ImageGrid";
import Hero from "../components/Hero";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../public/firebase/firebase";
import BackToTop from "../components/svg/BackToTop";

export default function Home({ imgList, blogList, categories }) {
  return (
    <div>
      <Head>
        <title>BojeArt</title>
        <meta
          name="description"
          content="Dobrodošli u svet umetnosti Jelene Tijanić Savić i Bojana Savića."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BackToTop></BackToTop>
      <Hero></Hero>
      <ImageGrid
        imgList={imgList}
        blogList={blogList}
        categories={categories}
      ></ImageGrid>
    </div>
  );
}

export const getServerSideProps = async () => {
  let paintingsList = [];
  let projectsList = [];
  let categories = [];
  try {
    const catsQuery = query(collection(db, "categories"));

    const catsQuerySnapshot = await getDocs(catsQuery);
    catsQuerySnapshot.forEach((doc) => {
      categories.push({ ...doc.data(), created_at: "" });
    });
    const imageQuery = query(
      collection(db, "slike"),
      orderBy("created_at", "desc")
    );
    const blogQuery = query(
      collection(db, "blog"),
      orderBy("created_at", "desc")
    );
    const imageQuerySnapshot = await getDocs(imageQuery);
    imageQuerySnapshot.forEach((doc) => {
      paintingsList.push({ id: doc.id, ...doc.data(), created_at: "" });
    });
    const blogQuerySnapshot = await getDocs(blogQuery);
    blogQuerySnapshot.forEach((doc) => {
      projectsList.push({ id: doc.id, ...doc.data(), created_at: "" });
    });
    return {
      props: {
        imgList: paintingsList,
        blogList: projectsList,
        categories: categories,
      },
    };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }
};

import Head from "next/head";
import ImageGrid from "../components/ImageGrid";
import Hero from "../components/Hero";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../public/firebase/firebase";
import BackToTop from "../components/svg/BackToTop";

export default function Home({ imgList, blogList, categories }) {
  return (
    <>
      <Head>
        <title>BojeArt - umetnost Jelene Tijanić Savić i Bojana Savića</title>
        <meta
          name="description"
          content="Svet umetnosti Jelene Tijanić Savić i Bojana Savića dvoje umetnika koji žive i rade u Beogradu."
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://bojeart.com" key="canonical" />
      </Head>
      <BackToTop></BackToTop>
      <Hero></Hero>
      <ImageGrid
        imgList={imgList}
        blogList={blogList}
        categories={categories}
      ></ImageGrid>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const locale = context.locale || "sr";

  let paintingsList = [];
  let projectsList = [];
  let categories = [];

  try {
    const catsQuery = query(collection(db, "categories"));

    const imageQuery = query(
      collection(db, "slike"),
      orderBy("created_at", "desc"),
    );
    const blogQuery = query(
      collection(db, "blog"),
      orderBy("created_at", "desc"),
    );

    const catsQuerySnapshot = await getDocs(catsQuery);
    catsQuerySnapshot.forEach((doc) => {
      categories.push({ ...doc.data() });
    });

    const imageQuerySnapshot = await getDocs(imageQuery);
    imageQuerySnapshot.forEach((doc) => {
      paintingsList.push({ id: doc.id, ...doc.data() });
    });

    const blogQuerySnapshot = await getDocs(blogQuery);
    blogQuerySnapshot.forEach((doc) => {
      projectsList.push({ id: doc.id, ...doc.data() });
    });

    return {
      props: {
        messages: (await import(`../messages/${locale}.json`)).default,
        imgList: JSON.parse(JSON.stringify(paintingsList)),
        blogList: JSON.parse(JSON.stringify(projectsList)),
        categories: JSON.parse(JSON.stringify(categories)),
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        messages: (await import(`../messages/${locale}.json`)).default,
      },
    };
  }
};

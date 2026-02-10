import Head from "next/head";
import ImageGrid from "../components/ImageGrid";
import Hero from "../components/Hero";
// import { collection, getDocs, query, orderBy } from "firebase/firestore";
// import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  documentId,
} from "firebase/firestore";

import { db } from "../public/firebase/firebase";
import BackToTop from "../components/svg/BackToTop";

const PAGE_SIZE = 24;

export default function Home({ imgList, blogList, categories, imgCursor }) {
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
        imgCursor={imgCursor}
      ></ImageGrid>
    </>
  );
}

// export const getServerSideProps = async (context) => {

export const getStaticProps = async (context) => {
  const locale = context.locale || "sr";

  try {
    const catsQuery = query(collection(db, "categories"));

    const imageQuery = query(
      collection(db, "slike"),
      orderBy("created_at", "desc"),
      orderBy(documentId(), "desc"), // ✅ add this (important for paging)
      limit(PAGE_SIZE),
    );

    const blogQuery = query(
      collection(db, "blog"),
      orderBy("created_at", "desc"),
      limit(10),
    );

    const [catsSnap, imageSnap, blogSnap] = await Promise.all([
      getDocs(catsQuery),
      getDocs(imageQuery),
      getDocs(blogQuery),
    ]);

    const categories = catsSnap.docs.map((d) => ({ ...d.data() }));
    const paintingsList = imageSnap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
    const projectsList = blogSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

    const last = imageSnap.docs[imageSnap.docs.length - 1];
    const lastCursor = last
      ? {
          createdAtMs: last.data().created_at?.toMillis?.() ?? null,
          id: last.id,
        }
      : null;

    return {
      props: {
        messages: (await import(`../messages/${locale}.json`)).default,
        imgList: JSON.parse(JSON.stringify(paintingsList)),
        blogList: JSON.parse(JSON.stringify(projectsList)),
        categories: JSON.parse(JSON.stringify(categories)),
        imgCursor: lastCursor,
      },
      revalidate: 300,
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        messages: (await import(`../messages/${locale}.json`)).default,
        imgList: [],
        blogList: [],
        categories: [],
        imgCursor: null,
      },
      revalidate: 300,
    };
  }
};

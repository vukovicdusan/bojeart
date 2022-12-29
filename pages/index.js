import Head from "next/head"
import ImageGrid from "../components/ImageGrid"
import Hero from "../components/Hero"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "../public/firebase/firebase"
import BackToTop from "../components/svg/BackToTop"

export default function Home({ imgList, blogList }) {
	return (
		<div>
			<Head>
				<title>BojeArt</title>
				<meta
					name="description"
					content="Dobrodošli u svet umetnosti."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<BackToTop></BackToTop>

			<Hero></Hero>
			<ImageGrid imgList={imgList} blogList={blogList}></ImageGrid>
		</div>
	)
}

export const getServerSideProps = async () => {
	let paintingsList = []
	let projectsList = []
	try {
		const imageQuery = query(
			collection(db, "slike"),
			orderBy("date", "desc")
		)
		const blogQuery = query(collection(db, "blog"), orderBy("date", "desc"))
		const imageQuerySnapshot = await getDocs(imageQuery)
		imageQuerySnapshot.forEach((doc) => {
			paintingsList.push({ id: doc.id, ...doc.data() })
		})
		const blogQuerySnapshot = await getDocs(blogQuery)
		blogQuerySnapshot.forEach((doc) => {
			projectsList.push({ id: doc.id, ...doc.data() })
		})
		return {
			props: { imgList: paintingsList, blogList: projectsList },
		}
	} catch (err) {
		console.log(err)
		return { props: {} }
	}
}

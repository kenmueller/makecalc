import { NextPage } from 'next'
import Head from 'next/head'

import styles from 'styles/Home.module.scss'

const Home: NextPage = () => (
	<main className={styles.root}>
		<Head>
			<title key="title">makecalc</title>
		</Head>
		<h1 className={styles.title}>makecalc</h1>
		<p className={styles.description}>
			Make custom calculators for the world to use.
		</p>
	</main>
)

export default Home

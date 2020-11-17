import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import NotFound from 'pages/404'
import { CalculatorPageProps, getInitialProps } from 'lib/CalculatorPage'
import useCurrentUser from 'hooks/useCurrentUser'

import styles from 'styles/Calculator.module.scss'

const CalculatorPage: NextPage<CalculatorPageProps> = ({ calculator }) => {
	if (!calculator)
		return <NotFound />
	
	const currentUser = useCurrentUser()
	
	return (
		<>
			<Head>
				<title key="title">{calculator.name} - makecalc</title>
			</Head>
			<header className={styles.header}>
				<h1 className={styles.name}>{calculator.name}</h1>
				{currentUser?.uid === calculator.owner && (
					<Link href={`/${calculator.slug}/edit`}>
						<a className={styles.edit}>
							<FontAwesomeIcon className={styles.editIcon} icon={faEdit} />
							edit
						</a>
					</Link>
				)}
			</header>
		</>
	)
}

CalculatorPage.getInitialProps = getInitialProps

export default CalculatorPage

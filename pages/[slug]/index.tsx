import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import NotFound from 'pages/404'
import Calculator from 'models/Calculator'
import User from 'models/User'
import getCalculator from 'lib/getCalculator'
import getUser from 'lib/getUser'
import useCurrentUser from 'hooks/useCurrentUser'

import styles from 'styles/Calculator.module.scss'

interface CalculatorPageProps {
	calculator: Calculator | null
	owner: User | null
}

const CalculatorPage: NextPage<CalculatorPageProps> = ({ calculator, owner }) => {
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
			<p className={styles.owner}>
				By {owner
					? (
						<Link href={`/u/${owner.slug}`}>
							<a className={styles.ownerName}>{owner.name}</a>
						</Link>
					)
					: <span className={styles.ownerName} aria-disabled>anonymous</span>
				}
			</p>
		</>
	)
}

CalculatorPage.getInitialProps = async ({ query, res }) => {
	const calculator = await getCalculator(query.slug as string)
	
	if (!calculator && res)
		res.statusCode = 404
	
	return {
		calculator,
		owner: calculator && await getUser(calculator.owner)
	}
}

export default CalculatorPage

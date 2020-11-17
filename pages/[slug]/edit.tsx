import { useEffect } from 'react'
import { NextPage } from 'next'
import Router from 'next/router'
import Error from 'next/error'
import Head from 'next/head'

import { CalculatorPageProps, getInitialProps } from 'lib/CalculatorPage'
import authenticate from 'lib/authenticate'
import useCurrentUser from 'hooks/useCurrentUser'

import styles from 'styles/EditCalculator.module.scss'
import { toast } from 'react-toastify'

const EditCalculatorPage: NextPage<CalculatorPageProps> = ({ calculator }) => {
	if (!calculator)
		return <Error statusCode={404} />
	
	const currentUser = useCurrentUser()
	
	useEffect(() => {
		if (!calculator || currentUser === undefined)
			return
		
		if (currentUser === null) {
			authenticate()
			return
		}
		
		if (currentUser.uid === calculator.owner)
			return
		
		toast.error(`You do not have permission to edit ${calculator.name}`)
		Router.push(`/${calculator.slug}`)
	}, [calculator, currentUser])
	
	return (
		<>
			<Head>
				<title key="title">edit {calculator.name} - makecalc</title>
			</Head>
			<label className={styles.title}>
				edit calculator
			</label>
			<h1 className={styles.name}>{calculator.name}</h1>
		</>
	)
}

EditCalculatorPage.getInitialProps = getInitialProps

export default EditCalculatorPage

import { useState, useCallback, useEffect, FormEvent } from 'react'
import { NextPage } from 'next'
import Router from 'next/router'
import Error from 'next/error'
import Head from 'next/head'

import { CalculatorPageProps, getInitialProps } from 'lib/CalculatorPage'
import authenticate from 'lib/authenticate'
import editCalculator from 'lib/editCalculator'
import useCurrentUser from 'hooks/useCurrentUser'
import Input from 'components/Input'
import SaveButton from 'components/SaveButton'

import styles from 'styles/EditCalculator.module.scss'
import { toast } from 'react-toastify'

const EditCalculatorPage: NextPage<CalculatorPageProps> = ({ calculator }) => {
	if (!calculator)
		return <Error statusCode={404} />
	
	const currentUser = useCurrentUser()
	
	const [name, setName] = useState(calculator.name)
	const [isLoading, setIsLoading] = useState(false)
	
	const save = useCallback(async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		
		if (!(calculator && currentUser && currentUser.uid === calculator.owner && name !== calculator.name))
			return
		
		setIsLoading(true)
		
		try {
			await editCalculator(calculator.slug, { name })
			Router.push(`/${calculator.slug}`)
		} catch ({ message }) {
			toast.error(message)
			setIsLoading(false)
		}
	}, [calculator, currentUser, name, setIsLoading])
	
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
			<label className={styles.title}>edit calculator</label>
			<h1 className={styles.name}>{calculator.name}</h1>
			<form onSubmit={save}>
				<Input
					className={styles.nameInput}
					label="name"
					required
					placeholder={calculator.name}
					value={name}
					setValue={setName}
				/>
				<SaveButton
					className={styles.saveButton}
					loading={isLoading}
					disabled={!name || name === calculator.name}
				/>
			</form>
		</>
	)
}

EditCalculatorPage.getInitialProps = getInitialProps

export default EditCalculatorPage

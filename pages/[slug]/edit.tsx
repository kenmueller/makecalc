import { useState, useCallback, useEffect, FormEvent } from 'react'
import { NextPage } from 'next'
import Router from 'next/router'
import Error from 'next/error'
import Head from 'next/head'
import Link from 'next/link'
import { toast } from 'react-toastify'

import { CalculatorPageProps, getInitialProps } from 'lib/CalculatorPage'
import authenticate from 'lib/authenticate'
import editCalculator from 'lib/editCalculator'
import { getInitialInputs, getInitialOutputs } from 'lib/getInitialFields'
import useCurrentUser from 'hooks/useCurrentUser'
import Input from 'components/Input'
import EditFields from 'components/EditFields'
import SaveButton from 'components/SaveButton'

import styles from 'styles/EditCalculator.module.scss'

const EditCalculatorPage: NextPage<CalculatorPageProps> = ({ calculator }) => {
	if (!calculator)
		return <Error statusCode={404} />
	
	const currentUser = useCurrentUser()
	
	const [name, setName] = useState(calculator.name)
	const [inputs, setInputs] = useState(
		calculator.inputs.length ? calculator.inputs : getInitialInputs
	)
	const [outputs, setOutputs] = useState(
		calculator.outputs.length ? calculator.outputs : getInitialOutputs
	)
	const [isLoading, setIsLoading] = useState(false)
	
	const save = useCallback(async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		
		if (!(calculator && currentUser && currentUser.uid === calculator.owner))
			return
		
		setIsLoading(true)
		
		try {
			await editCalculator(calculator.slug, { name, inputs, outputs: [] })
			Router.push(`/${calculator.slug}`)
		} catch ({ message }) {
			toast.error(message)
			setIsLoading(false)
		}
	}, [calculator, currentUser, name, inputs, setIsLoading])
	
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
			<Link href={`/${calculator.slug}`}>
				<a className={styles.name}>{calculator.name}</a>
			</Link>
			<form onSubmit={save}>
				<Input
					className={styles.nameInput}
					label="name"
					required
					placeholder={calculator.name}
					value={name}
					setValue={setName}
				/>
				<h2 className={styles.fieldsLabel}>inputs</h2>
				<EditFields type="inputs" fields={inputs} setFields={setInputs} />
				<h2 className={styles.fieldsLabel}>outputs</h2>
				<EditFields type="outputs" fields={outputs} setFields={setOutputs} />
				<SaveButton className={styles.saveButton} loading={isLoading} disabled={!name} />
			</form>
		</>
	)
}

EditCalculatorPage.getInitialProps = getInitialProps

export default EditCalculatorPage

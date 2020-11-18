import { useState, useCallback, useEffect, FormEvent } from 'react'
import { NextPage } from 'next'
import Router from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { toast } from 'react-toastify'

import NotFound from 'pages/404'
import Calculator from 'models/Calculator'
import getCalculator from 'lib/getCalculator'
import authenticate from 'lib/authenticate'
import editCalculator from 'lib/editCalculator'
import { getInitialInputs, getInitialOutputs } from 'lib/getInitialFields'
import useCurrentUser from 'hooks/useCurrentUser'
import Input from 'components/Input'
import TextAreaWithLabel from 'components/TextAreaWithLabel'
import EditFields from 'components/EditFields'
import SaveButton from 'components/SaveButton'

import styles from 'styles/EditCalculator.module.scss'

interface EditCalculatorPageProps {
	calculator: Calculator | null
}

const EditCalculatorPage: NextPage<EditCalculatorPageProps> = ({ calculator }) => {
	if (!calculator)
		return <NotFound />
	
	const currentUser = useCurrentUser()
	
	const [name, setName] = useState(calculator.name)
	const [description, setDescription] = useState(calculator.description)
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
			await editCalculator(calculator.slug, { name, description, inputs, outputs })
			Router.push(`/${calculator.slug}`)
		} catch ({ message }) {
			toast.error(message)
			setIsLoading(false)
		}
	}, [calculator, currentUser, name, description, inputs, outputs, setIsLoading])
	
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
				<TextAreaWithLabel
					className={styles.descriptionInput}
					label="description"
					placeholder="tell us about your calculator"
					value={description}
					setValue={setDescription}
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

EditCalculatorPage.getInitialProps = async ({ query, res }) => {
	const calculator = await getCalculator(query.slug as string)
	
	if (!calculator && res)
		res.statusCode = 404
	
	return { calculator }
}

export default EditCalculatorPage

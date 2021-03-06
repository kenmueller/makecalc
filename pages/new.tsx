import { useState, useCallback, useEffect, FormEvent } from 'react'
import { NextPage } from 'next'
import Router from 'next/router'
import Head from 'next/head'
import { toast } from 'react-toastify'

import getUid from 'lib/getUid'
import getSlug from 'lib/getCalculatorSlug'
import createCalculator from 'lib/createCalculator'
import { getInitialInputs, getInitialOutputs } from 'lib/getInitialFields'
import useCurrentUser from 'hooks/useCurrentUser'
import Input from 'components/Input'
import TextAreaWithLabel from 'components/TextAreaWithLabel'
import EditFields from 'components/EditFields'
import SaveButton from 'components/SaveButton'

import styles from 'styles/New.module.scss'

const New: NextPage = () => {
	const currentUser = useCurrentUser()
	
	const [slug, setSlug] = useState<string | null>(null)
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [inputs, setInputs] = useState(getInitialInputs)
	const [outputs, setOutputs] = useState(getInitialOutputs)
	const [isSlugLoading, setIsSlugLoading] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	
	const save = useCallback(async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		
		if (currentUser === undefined || !slug || !name || isSlugLoading || isLoading)
			return
		
		setIsLoading(true)
		
		const uid = await getUid(currentUser)
		
		if (!uid)
			return setIsLoading(false)
		
		await createCalculator(slug, { name, description, uid, inputs, outputs })
		Router.push(`/${slug}`)
	}, [currentUser, slug, name, description, inputs, outputs, isSlugLoading])
	
	useEffect(() => {
		if (!name)
			return setSlug(undefined)
		
		let shouldContinue = true
		
		setIsSlugLoading(true)
		getSlug(name)
			.then(slug => shouldContinue && setSlug(slug))
			.catch(({ message }) => shouldContinue && toast.error(message))
			.finally(() => shouldContinue && setIsSlugLoading(false))
		
		return () => { shouldContinue = false }
	}, [name, setSlug, setIsSlugLoading])
	
	return (
		<>
			<Head>
				<title key="title">new - makecalc</title>
			</Head>
			<h1 className={styles.title}>new calculator</h1>
			<form onSubmit={save}>
				<Input
					className={styles.nameInput}
					label="name"
					required
					placeholder="pints to ounces"
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
				{slug && (
					<>
						<label className={styles.linkLabel}>
							{isSlugLoading ? 'loading...' : 'link'}
						</label>
						<p className={styles.link}>
							makecalc.com/<span className={styles.slug}>{slug}</span>
						</p>
					</>
				)}
				<h2 className={styles.fieldsLabel}>inputs</h2>
				<EditFields type="inputs" fields={inputs} setFields={setInputs} />
				<h2 className={styles.fieldsLabel}>outputs</h2>
				<EditFields type="outputs" fields={outputs} setFields={setOutputs} />
				<SaveButton
					className={styles.saveButton}
					loading={isLoading}
					disabled={currentUser === undefined || !slug || !name || isSlugLoading || isLoading}
				/>
			</form>
		</>
	)
}

export default New

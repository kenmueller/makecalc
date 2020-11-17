import { useState, useCallback, useEffect, FormEvent } from 'react'
import { NextPage } from 'next'
import Router from 'next/router'
import Head from 'next/head'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

import getUid from 'lib/getUid'
import getSlug from 'lib/getSlug'
import createCalculator from 'lib/createCalculator'
import useCurrentUser from 'hooks/useCurrentUser'
import Input from 'components/Input'
import SaveButton from 'components/SaveButton'

import styles from 'styles/New.module.scss'

const New: NextPage = () => {
	const currentUser = useCurrentUser()
	
	const [name, setName] = useState('')
	const [slug, setSlug] = useState<string | null>(null)
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
		
		await createCalculator(slug, { name, uid, inputs: [], outputs: [] })
		Router.push(`/${slug}/edit`)
	}, [currentUser, slug, name, isSlugLoading])
	
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

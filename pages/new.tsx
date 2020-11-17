import { useState, useCallback, useEffect, FormEvent } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

import getSlug from 'lib/getSlug'
import Input from 'components/Input'

import styles from 'styles/New.module.scss'

const New: NextPage = () => {
	const [name, setName] = useState('')
	
	const [slug, setSlug] = useState<string | null>(null)
	const [isSlugLoading, setIsSlugLoading] = useState(false)
	
	const save = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
	}, [])
	
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
				<button
					className={styles.saveButton}
					disabled={!name || isSlugLoading}
				>
					<FontAwesomeIcon className={styles.saveButtonIcon} icon={faSave} />
					save
				</button>
			</form>
		</>
	)
}

export default New

import { useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

import Input from 'components/Input'

import styles from 'styles/New.module.scss'

const New: NextPage = () => {
	const [name, setName] = useState('')
	
	return (
		<>
			<Head>
				<title key="title">new - makecalc</title>
			</Head>
			<h1 className={styles.title}>new calculator</h1>
			<form>
				<Input
					className={styles.nameInput}
					label="name"
					required
					placeholder="pints to ounces"
					value={name}
					setValue={setName}
				/>
				<button
					className={styles.saveButton}
					disabled={!name}
				>
					<FontAwesomeIcon className={styles.saveButtonIcon} icon={faSave} />
					save
				</button>
			</form>
		</>
	)
}

export default New

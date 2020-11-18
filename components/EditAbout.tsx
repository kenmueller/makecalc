import { useState, useCallback, ChangeEvent, FormEvent } from 'react'

import User from 'models/User'
import TextArea from './TextArea'
import SaveButton from './SaveButton'

import styles from 'styles/EditAbout.module.scss'
import { toast } from 'react-toastify'
import editUser from 'lib/editUser'

export interface EditAboutProps {
	user: User
}

const EditAbout = ({ user }: EditAboutProps) => {
	const [about, setAbout] = useState(user.about)
	const [isLoading, setIsLoading] = useState(false)
	
	const onChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
		setAbout(event.target.value)
	}, [setAbout])
	
	const save = useCallback(async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		
		if (about === user.about)
			return
		
		try {
			setIsLoading(true)
			await editUser(user.id, { about })
			
			user.about = about
		} catch ({ message }) {
			toast.error(message)
		} finally {
			setIsLoading(false)
		}
	}, [user, about, setIsLoading])
	
	return (
		<form onSubmit={save}>
			<TextArea
				className={styles.text}
				placeholder="tell us more about you"
				value={about}
				onChange={onChange}
			/>
			<SaveButton loading={isLoading} disabled={about === user.about} />
		</form>
	)
}

export default EditAbout

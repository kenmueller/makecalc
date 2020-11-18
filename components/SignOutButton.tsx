import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'

import unauthenticate from 'lib/unauthenticate'

import styles from 'styles/SignOutButton.module.scss'

const SignOutButton = () => {
	const [isLoading, setIsLoading] = useState(false)
	
	const onClick = useCallback(async () => {
		try {
			setIsLoading(true)
			await unauthenticate()
		} catch ({ message }) {
			toast.error(message)
		} finally {
			setIsLoading(false)
		}
	}, [setIsLoading])
	
	return (
		<button className={styles.root} disabled={isLoading} onClick={onClick}>
			sign out
		</button>
	)
}

export default SignOutButton

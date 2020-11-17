import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import cx from 'classnames'

import authenticate from 'lib/authenticate'
import unauthenticate from 'lib/unauthenticate'
import useCurrentUser from 'hooks/useCurrentUser'

import styles from 'styles/AuthButton.module.scss'

const AuthButton = () => {
	const [isLoading, setIsLoading] = useState(false)
	const currentUser = useCurrentUser()
	
	const onClick = useCallback(async () => {
		if (isLoading || currentUser === undefined)
			return
		
		try {
			setIsLoading(true)
			await (currentUser ? unauthenticate : authenticate)()
		} catch ({ message }) {
			toast.error(message)
		} finally {
			setIsLoading(false)
		}
	}, [isLoading, currentUser, setIsLoading])
	
	return (
		<button
			className={cx(styles.root, {
				[styles.authenticated]: currentUser
			})}
			disabled={isLoading || currentUser === undefined}
			onClick={onClick}
		>
			{isLoading || currentUser === undefined
				? 'loading...'
				: currentUser?.displayName ?? 'sign in'
			}
		</button>
	)
}

export default AuthButton

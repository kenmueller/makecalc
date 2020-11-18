import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'

import authenticate from 'lib/authenticate'
import getUser from 'lib/getUser'
import useCurrentUser from 'hooks/useCurrentUser'

import styles from 'styles/AuthButton.module.scss'

const AuthButton = () => {
	const currentUser = useCurrentUser()
	
	const [slug, setSlug] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	
	const onClick = useCallback(async () => {
		if (isLoading || currentUser !== null)
			return
		
		try {
			setIsLoading(true)
			await authenticate()
		} catch ({ message }) {
			toast.error(message)
		} finally {
			setIsLoading(false)
		}
	}, [currentUser, isLoading, setIsLoading])
	
	useEffect(() => {
		if (!currentUser)
			return setSlug(null)
		
		getUser(currentUser.uid)
			.then(({ slug }) => setSlug(slug))
			.catch(({ message }) => toast.error(message))
	}, [currentUser, setSlug])
	
	return slug
		? (
			<Link href={`/u/${slug}`}>
				<a className={styles.root}>
					{currentUser?.displayName ?? 'anonymous'}
				</a>
			</Link>
		)
		: (
			<button
				className={styles.root}
				disabled={isLoading || currentUser !== null}
				onClick={onClick}
			>
				{isLoading || currentUser !== null
					? 'loading...'
					: 'sign in'
				}
			</button>
		)
}

export default AuthButton

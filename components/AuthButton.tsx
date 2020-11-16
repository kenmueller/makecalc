import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'

import firebase from 'lib/firebase'
import useCurrentUser from 'hooks/useCurrentUser'

import styles from 'styles/AuthButton.module.scss'

import 'firebase/auth'
import 'firebase/firestore'

const auth = firebase.auth()
const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/userinfo.email')

const AuthButton = () => {
	const [isLoading, setIsLoading] = useState(false)
	const currentUser = useCurrentUser()
	
	const onClick = useCallback(async () => {
		try {
			setIsLoading(true)
			
			if (currentUser) {
				await auth.signOut()
				return
			}
			
			const {
				user,
				additionalUserInfo
			} = await auth.signInWithPopup(provider)
			
			if (!(user && additionalUserInfo))
				throw new Error('An unknown error occurred. Please try again')
			
			if (!user.email)
				throw new Error('Unable to get your email address')
			
			if (!additionalUserInfo.isNewUser)
				return
			
			await firestore.doc(`users/${user.uid}`).set({
				name: user.displayName ?? 'anonymous',
				email: user.email,
				joined: firebase.firestore.FieldValue.serverTimestamp()
			})
		} catch (error) {
			console.log(error)
			toast.error(error.message)
		} finally {
			setIsLoading(false)
		}
	}, [currentUser])
	
	return (
		<button
			className={styles.root}
			disabled={isLoading}
			onClick={onClick}
			data-name={currentUser?.displayName}
		>
			{isLoading
				? 'loading...'
				: currentUser?.displayName ?? 'sign in'
			}
		</button>
	)
}

export default AuthButton

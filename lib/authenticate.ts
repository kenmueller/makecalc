import firebase from './firebase'

import 'firebase/auth'
import 'firebase/firestore'

const auth = firebase.auth()
const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/userinfo.email')

const authenticate = async () => {
	try {
		const {
			user,
			additionalUserInfo
		} = await auth.signInWithPopup(provider)
		
		if (!(user && additionalUserInfo))
			throw new Error('An unknown error occurred. Please try again')
		
		if (!user.email)
			throw new Error('Unable to get your email address')
		
		if (additionalUserInfo.isNewUser)
			await firestore.doc(`users/${user.uid}`).set({
				name: user.displayName ?? 'anonymous',
				email: user.email,
				joined: firebase.firestore.FieldValue.serverTimestamp()
			})
		
		return user.uid
	} catch (error) {
		switch (error.code) {
			case 'auth/popup-closed-by-user':
				return null
			default:
				throw error
		}
	}
}

export default authenticate

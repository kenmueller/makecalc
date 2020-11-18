import User from 'models/User'
import firebase from './firebase'

import 'firebase/firestore'

const firestore = firebase.firestore()

const getUser = async (id: string) => {
	const snapshot = await firestore.doc(`users/${id}`).get()
	
	return snapshot.exists
		? {
			slug: snapshot.get('slug'),
			name: snapshot.get('name')
		} as User
		: null
}

export default getUser

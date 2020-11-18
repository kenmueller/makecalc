import firebase from './firebase'

import 'firebase/firestore'

const firestore = firebase.firestore()

export interface EditUserData {
	about: string
}

const editUser = (id: string, data: EditUserData) =>
	firestore.doc(`users/${id}`).update(data)

export default editUser

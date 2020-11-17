import firebase from './firebase'

import 'firebase/auth'

const auth = firebase.auth()

const unauthenticate = () =>
	auth.signOut()

export default unauthenticate

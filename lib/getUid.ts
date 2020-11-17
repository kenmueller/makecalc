import { toast } from 'react-toastify'

import firebase from './firebase'
import authenticate from './authenticate'

const getUid = async (currentUser: firebase.User | null) => {
	try {
		return currentUser?.uid ?? await authenticate()
	} catch ({ message }) {
		toast.error(message)
		return null
	}
}

export default getUid

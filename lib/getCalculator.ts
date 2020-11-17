import Calculator from 'models/Calculator'
import firebase from './firebase'

import 'firebase/firestore'

const firestore = firebase.firestore()

const getCalculator = async (slug: string) => {
	const snapshot = await firestore.doc(`calculators/${slug}`).get()
	
	return snapshot.exists
		? { slug, ...snapshot.data() } as Calculator
		: null
}

export default getCalculator

import firebase from './firebase'

import 'firebase/firestore'

const firestore = firebase.firestore()

export interface CreateCalculatorData {
	name: string
	uid: string
}

const createCalculator = (slug: string, { name, uid }: CreateCalculatorData) =>
	firestore.doc(`calculators/${slug}`).set({ name, owner: uid })

export default createCalculator

import firebase from './firebase'

import 'firebase/firestore'

const firestore = firebase.firestore()

export interface EditCalculatorData {
	name: string
}

const editCalculator = (slug: string, { name }: EditCalculatorData) =>
	firestore.doc(`calculators/${slug}`).update({ name })

export default editCalculator

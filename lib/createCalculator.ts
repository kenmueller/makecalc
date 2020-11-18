import CalculatorField from 'models/Calculator/Field'
import firebase from './firebase'
import filterFields from './filterFields'

import 'firebase/firestore'

const firestore = firebase.firestore()

export interface CreateCalculatorData {
	name: string
	description: string
	uid: string
	inputs: CalculatorField[]
	outputs: CalculatorField[]
}

const createCalculator = (slug: string, { name, description, uid, inputs, outputs }: CreateCalculatorData) =>
	firestore.doc(`calculators/${slug}`).set({
		name,
		description,
		owner: uid,
		inputs: filterFields(inputs),
		outputs: filterFields(outputs),
		users: 0,
		views: 0
	})

export default createCalculator

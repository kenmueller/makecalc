import CalculatorField from 'models/Calculator/Field'
import firebase from './firebase'
import filterFields from './filterFields'

import 'firebase/firestore'

const firestore = firebase.firestore()

export interface EditCalculatorData {
	name: string
	description: string
	inputs: CalculatorField[]
	outputs: CalculatorField[]
}

const editCalculator = (slug: string, { name, description, inputs, outputs }: EditCalculatorData) =>
	firestore.doc(`calculators/${slug}`).update({
		name,
		description,
		inputs: filterFields(inputs),
		outputs: filterFields(outputs)
	})

export default editCalculator

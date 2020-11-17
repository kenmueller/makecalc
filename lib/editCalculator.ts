import CalculatorField from 'models/Calculator/Field'
import firebase from './firebase'

import 'firebase/firestore'

const firestore = firebase.firestore()

export interface EditCalculatorData {
	name: string
	inputs: CalculatorField[]
	outputs: CalculatorField[]
}

const editCalculator = (slug: string, { name, inputs, outputs }: EditCalculatorData) =>
	firestore.doc(`calculators/${slug}`).update({ name, inputs, outputs })

export default editCalculator

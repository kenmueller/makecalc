import CalculatorField from 'models/Calculator/Field'
import firebase from './firebase'

import 'firebase/firestore'

const firestore = firebase.firestore()

export interface CreateCalculatorData {
	name: string
	uid: string
	inputs: CalculatorField[]
	outputs: CalculatorField[]
}

const createCalculator = (slug: string, { name, uid, inputs, outputs }: CreateCalculatorData) =>
	firestore.doc(`calculators/${slug}`).set({ name, owner: uid, inputs, outputs })

export default createCalculator

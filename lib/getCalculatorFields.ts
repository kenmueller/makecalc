import CalculatorFields from 'models/Calculator/Fields'
import firebase from './firebase'
import snapshotWithId from './snapshotWithId'

import 'firebase/firestore'

const firestore = firebase.firestore()

const getCalculatorFields = async (slug: string) => {
	const doc = firestore.doc(`calculators/${slug}`)
	
	const [{ docs: inputs }, { docs: outputs }] = await Promise.all([
		doc.collection('inputs').get(),
		doc.collection('outputs').get()
	])
	
	return {
		inputs: inputs.map(snapshotWithId),
		outputs: outputs.map(snapshotWithId)
	} as CalculatorFields
}

export default getCalculatorFields

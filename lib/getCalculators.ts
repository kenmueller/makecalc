import firebase from './firebase'
import snapshotToCalculator from './snapshotToCalculator'

import 'firebase/firestore'

const firestore = firebase.firestore()

const getCalculators = async (uid: string) => {
	const { docs } = await firestore
		.collection('calculators')
		.where('owner', '==', uid)
		.get()
	
	return docs.map(snapshotToCalculator)
}

export default getCalculators

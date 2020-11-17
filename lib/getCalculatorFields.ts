import CalculatorField from 'models/CalculatorField'
import firebase from './firebase'

import 'firebase/firestore'

const firestore = firebase.firestore()

const getCalculatorFields = async (slug: string) => {
	const { docs } = await firestore.collection(`calculators/${slug}/fields`).get()
	
	return docs.map(snapshot => ({
		id: snapshot.id,
		...snapshot.data()
	} as CalculatorField))
}

export default getCalculatorFields

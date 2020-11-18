import firebase from './firebase'
import snapshotToCalculator from './snapshotToCalculator'

import 'firebase/firestore'

const firestore = firebase.firestore()

const getCalculator = async (slug: string) =>
	snapshotToCalculator(await firestore.doc(`calculators/${slug}`).get())

export default getCalculator

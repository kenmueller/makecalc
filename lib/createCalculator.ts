import firebase from './firebase'

import 'firebase/firestore'

const firestore = firebase.firestore()

const createCalculator = (slug: string, name: string, uid: string) =>
	firestore.doc(`calculators/${slug}`).set({ name, owner: uid })

export default createCalculator

import Calculator from 'models/Calculator'
import firebase from './firebase'

const snapshotToCalculator = (snapshot: firebase.firestore.DocumentSnapshot) =>
	snapshot.exists
		? { slug: snapshot.id, ...snapshot.data() } as Calculator
		: null

export default snapshotToCalculator

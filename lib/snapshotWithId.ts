import firebase from './firebase'

const snapshotWithId = (snapshot: firebase.firestore.DocumentSnapshot) => ({
	id: snapshot.id,
	...snapshot.data()
})

export default snapshotWithId

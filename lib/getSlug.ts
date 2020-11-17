import { nanoid } from 'nanoid'

import firebase from './firebase'
import slugify from './slugify'

import 'firebase/firestore'

const firestore = firebase.firestore()

const getSlug = async (name: string) => {
	const slug = slugify(name)
	
	return (await firestore.doc(`calculators/${slug}`).get()).exists
		? `${slug}-${nanoid(5)}`
		: slug
}

export default getSlug

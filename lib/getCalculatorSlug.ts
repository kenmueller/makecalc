import { nanoid } from 'nanoid'

import firebase from './firebase'
import slugify from './slugify'

import 'firebase/firestore'

const RESERVED_NAMES = ['new']

const firestore = firebase.firestore()

const getCalculatorSlug = async (name: string) => {
	const slug = slugify(name)
	
	return (
		RESERVED_NAMES.includes(slug) ||
		(await firestore.doc(`calculators/${slug}`).get()).exists
	)
		? `${slug}-${nanoid(5)}`
		: slug
}

export default getCalculatorSlug

import Field from './Field'

export default interface Calculator {
	slug: string
	name: string
	description: string
	owner: string
	inputs: Field[]
	outputs: Field[]
	users: number
	views: number
}

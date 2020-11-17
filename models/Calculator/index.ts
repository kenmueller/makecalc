import Field from './Field'

export default interface Calculator {
	slug: string
	name: string
	owner: string
	inputs: Field[]
	outputs: Field[]
}

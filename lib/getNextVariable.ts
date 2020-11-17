import CalculatorField from 'models/Calculator/Field'

export const VARIABLES = 'abcdefghijklmnopqrstuvwxyz'.split('')

const getNextVariable = (inputs: CalculatorField[]) => {
	for (const variable of VARIABLES)
		if (!inputs.some(input => input.relation === variable))
			return variable
	
	return null
}

export default getNextVariable

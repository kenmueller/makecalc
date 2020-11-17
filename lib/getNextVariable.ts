import CalculatorInput from 'models/Calculator/Input'

export const VARIABLES = 'abcdefghijklmnopqrstuvwxyz'.split('')

const getNextVariable = (inputs: CalculatorInput[]) => {
	for (const variable of VARIABLES)
		if (!inputs.some(input => input.variable === variable))
			return variable
	
	return null
}

export default getNextVariable

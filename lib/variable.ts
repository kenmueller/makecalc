import CalculatorField from 'models/Calculator/Field'

export const VARIABLES = 'abcdefghijklmnopqrstuvwxyz'.split('')

export const isValidVariable = (variable: string) =>
	variable.length === 1 && VARIABLES.includes(variable)

export const getNextVariable = (inputs: CalculatorField[]) => {
	for (const variable of VARIABLES)
		if (!inputs.some(input => input.relation === variable))
			return variable
	
	return null
}

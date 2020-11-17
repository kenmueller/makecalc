import { nanoid } from 'nanoid'

import CalculatorField from 'models/Calculator/Field'
import { VARIABLES } from './variable'

export const getInitialInputs = (): CalculatorField[] => [
	{
		id: nanoid(),
		label: '',
		relation: VARIABLES[0]
	}
]

export const getInitialOutputs = (): CalculatorField[] => [
	{
		id: nanoid(),
		label: '',
		relation: ''
	}
]

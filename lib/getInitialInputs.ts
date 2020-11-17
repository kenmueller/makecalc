import { nanoid } from 'nanoid'

import CalculatorField from 'models/Calculator/Field'
import { VARIABLES } from './getNextVariable'

const getInitialInputs = (): CalculatorField[] => [
	{
		id: nanoid(),
		label: '',
		relation: VARIABLES[0]
	}
]

export default getInitialInputs

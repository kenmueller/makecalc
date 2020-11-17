import CalculatorField from 'models/Calculator/Field'

const filterFields = (fields: CalculatorField[]) =>
	fields.filter(({ label, relation }) => label && relation)

export default filterFields

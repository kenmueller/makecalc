import { NextPageContext } from 'next'

import Calculator from 'models/Calculator'
import CalculatorField from 'models/CalculatorField'
import getCalculator from './getCalculator'
import getCalculatorFields from './getCalculatorFields'

export interface CalculatorPageProps {
	calculator: Calculator | null
	fields: CalculatorField[]
}

export const getInitialProps = async ({ query, res }: NextPageContext) => {
	const slug = query.slug as string
	
	const [calculator, fields] = await Promise.all([
		getCalculator(slug),
		getCalculatorFields(slug)
	])
	
	if (!calculator && res)
		res.statusCode = 404
	
	return { calculator, fields }
}

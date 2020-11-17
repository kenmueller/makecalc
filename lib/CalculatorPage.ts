import { NextPageContext } from 'next'

import Calculator from 'models/Calculator'
import getCalculator from './getCalculator'

export interface CalculatorPageProps {
	calculator: Calculator | null
}

export const getInitialProps = async ({ query, res }: NextPageContext) => {
	const calculator = await getCalculator(query.slug as string)
	
	if (!calculator && res)
		res.statusCode = 404
	
	return { calculator }
}

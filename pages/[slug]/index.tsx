import { NextPage } from 'next'
import Error from 'next/error'
import Head from 'next/head'

import Calculator from 'models/Calculator'
import getCalculator from 'lib/getCalculator'

interface CalculatorProps {
	calculator: Calculator | null
}

const CalculatorPage: NextPage<CalculatorProps> = ({ calculator }) => {
	if (!calculator)
		return <Error statusCode={404} />
	
	return (
		<>
			<Head>
				<title key="title">{calculator.name} - makecalc</title>
			</Head>
		</>
	)
}

CalculatorPage.getInitialProps = async ({ query, res }) => {
	const calculator = await getCalculator(query.slug as string)
	
	if (!calculator && res)
		res.statusCode = 404
	
	return { calculator }
}

export default CalculatorPage

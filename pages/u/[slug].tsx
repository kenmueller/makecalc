import { NextPage } from 'next'
import Head from 'next/head'

import NotFound from 'pages/404'
import User from 'models/User'
import Calculator from 'models/Calculator'
import getUserWithSlug from 'lib/getUserWithSlug'
import getCalculators from 'lib/getCalculators'

interface UserPageProps {
	user: User | null
	calculators: Calculator[]
}

const UserPage: NextPage<UserPageProps> = ({ user }) => {
	if (!user)
		return <NotFound />
	
	return (
		<>
			<Head>
				<title key="title">{user.name} - makecalc</title>
			</Head>
		</>
	)
}

UserPage.getInitialProps = async ({ query, res }) => {
	const user = await getUserWithSlug(query.slug as string)
	
	if (!user && res)
		res.statusCode = 404
	
	return {
		user,
		calculators: user ? await getCalculators(user.id) : []
	}
}

export default UserPage

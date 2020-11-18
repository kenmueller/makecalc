import { NextPage } from 'next'
import Head from 'next/head'

import NotFound from 'pages/404'
import User from 'models/User'
import getUserWithSlug from 'lib/getUserWithSlug'

interface UserPageProps {
	user: User | null
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
	
	return { user }
}

export default UserPage

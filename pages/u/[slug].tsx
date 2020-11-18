import { NextPage } from 'next'
import Head from 'next/head'

import NotFound from 'pages/404'
import User from 'models/User'
import Calculator from 'models/Calculator'
import getUserWithSlug from 'lib/getUserWithSlug'
import getCalculators from 'lib/getCalculators'
import useCurrentUser from 'hooks/useCurrentUser'
import SignOutButton from 'components/SignOutButton'
import EditAbout from 'components/EditAbout'

import styles from 'styles/User.module.scss'

interface UserPageProps {
	user: User | null
	calculators: Calculator[]
}

const UserPage: NextPage<UserPageProps> = ({ user }) => {
	if (!user)
		return <NotFound />
	
	const currentUser = useCurrentUser()
	
	return (
		<>
			<Head>
				<title key="title">{user.name} - makecalc</title>
			</Head>
			<header className={styles.header}>
				<h1 className={styles.name}>{user.name}</h1>
				{currentUser?.uid === user.id && <SignOutButton />}
			</header>
			<h2 className={styles.sectionLabel}>about</h2>
			{currentUser?.uid === user.id
				? <EditAbout user={user} />
				: <p className={styles.about}>{user.about || '~~ a mystery ~~'}</p>
			}
			<h2 className={styles.sectionLabel}>calculators</h2>
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

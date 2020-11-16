import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import styles from 'styles/Navbar.module.scss'

const Navbar = () => (
	<nav className={styles.root}>
		<Link href="/">
			<a className={styles.home}>makecalc</a>
		</Link>
		<Link href="/new">
			<a className={styles.new}>
				<FontAwesomeIcon className={styles.newIcon} icon={faPlus} />
				new
			</a>
		</Link>
	</nav>
)

export default Navbar

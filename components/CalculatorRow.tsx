import Link from 'next/link'

import Calculator from 'models/Calculator'

import styles from 'styles/CalculatorRow.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faUser } from '@fortawesome/free-solid-svg-icons'

export interface CalculatorRowProps {
	calculator: Calculator
}

const CalculatorRow = ({ calculator }: CalculatorRowProps) => (
	<Link href={`/${calculator.slug}`}>
		<a className={styles.root}>
			<p className={styles.name}>{calculator.name}</p>
			<p className={styles.description}>{calculator.description}</p>
			<span className={styles.footer}>
				<span>
					<FontAwesomeIcon icon={faUser} />
					{calculator.users}
				</span>
				<span>
					<FontAwesomeIcon icon={faEye} />
					{calculator.views}
				</span>
			</span>
		</a>
	</Link>
)

export default CalculatorRow

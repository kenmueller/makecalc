import { SetStateAction, useCallback } from 'react'
import { nanoid } from 'nanoid'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

import CalculatorField from 'models/Calculator/Field'
import getNextVariable, { VARIABLES } from 'lib/getNextVariable'
import Row from './EditInputsRow'

import styles from 'styles/EditInputs.module.scss'

export interface EditInputsProps {
	className?: string
	inputs: CalculatorField[]
	setInputs(inputs: SetStateAction<CalculatorField[]>): void
}

const EditInputs = ({ className, inputs, setInputs }: EditInputsProps) => {
	const add = useCallback(() => {
		const variable = getNextVariable(inputs)
		
		if (!variable) {
			toast.error('Too many inputs')
			return
		}
		
		setInputs(inputs => [...inputs, {
			id: nanoid(),
			label: '',
			relation: variable
		}])
	}, [inputs, setInputs])
	
	return (
		<table className={cx(styles.root, className)}>
			<thead>
				<tr className={styles.labels}>
					<th className={cx(styles.label, styles.labelLabel)}>label</th>
					<th className={cx(styles.label, styles.variableLabel)}>variable</th>
					<th className={styles.label}>
						<button
							className={cx(styles.action, styles.add)}
							type="button"
							disabled={inputs.length >= VARIABLES.length}
							onClick={add}
						>
							<FontAwesomeIcon icon={faPlus} />
						</button>
					</th>
				</tr>
			</thead>
			<tbody>
				{inputs.map(input => (
					<Row key={input.id} input={input} setInputs={setInputs} />
				))}
			</tbody>
		</table>
	)
}

export default EditInputs

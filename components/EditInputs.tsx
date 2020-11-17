import { SetStateAction, useCallback } from 'react'
import { nanoid } from 'nanoid'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

import CalculatorInput from 'models/Calculator/Input'
import getNextVariable, { VARIABLES } from 'lib/getNextVariable'

import styles from 'styles/EditInputs.module.scss'

export interface EditInputsProps {
	className?: string
	inputs: CalculatorInput[]
	setInputs(inputs: SetStateAction<CalculatorInput[]>): void
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
			variable
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
					<tr key={input.id}>
						<td className={styles.inputCell}>
							<input
								className={styles.input}
								required
								placeholder="pints"
								value={input.label}
							/>
						</td>
						<td className={styles.inputCell}>
							<input
								className={styles.input}
								required
								placeholder="x"
								value={input.variable}
							/>
						</td>
						<td>
							<button
								className={cx(styles.action, styles.remove)}
								type="button"
								onClick={() => {}}
							>
								<FontAwesomeIcon icon={faTrash} />
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default EditInputs

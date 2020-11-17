import { ChangeEvent, SetStateAction, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import CalculatorField from 'models/Calculator/Field'
import { VARIABLES } from 'lib/getNextVariable'

import styles from 'styles/EditInputsRow.module.scss'

export interface EditInputsRowProps {
	input: CalculatorField
	setInputs(inputs: SetStateAction<CalculatorField[]>): void
}

const EditInputsRow = ({ input, setInputs }: EditInputsRowProps) => {
	const onLabelChange = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
		setInputs(inputs =>
			inputs.map(_input =>
				_input.id === input.id
					? { ..._input, label: value }
					: _input
			)
		)
	}, [input, setInputs])
	
	const onVariableChange = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
		if (value.length > 1 || (value.length === 1 && !VARIABLES.includes(value)))
			return
		
		setInputs(inputs =>
			inputs.map(_input =>
				_input.id === input.id
					? { ..._input, variable: value }
					: _input
			)
		)
	}, [input, setInputs])
	
	const remove = useCallback(() => {
		setInputs(inputs =>
			inputs.filter(({ id }) => id !== input.id)
		)
	}, [input, setInputs])
	
	return (
		<tr>
			<td className={styles.inputCell}>
				<input
					className={styles.input}
					required
					placeholder="pints"
					value={input.label}
					onChange={onLabelChange}
				/>
			</td>
			<td className={styles.inputCell}>
				<input
					className={styles.input}
					required
					placeholder="x"
					value={input.relation}
					onChange={onVariableChange}
				/>
			</td>
			<td>
				<button
					className={styles.remove}
					type="button"
					onClick={remove}
				>
					<FontAwesomeIcon icon={faTrash} />
				</button>
			</td>
		</tr>
	)
}

export default EditInputsRow

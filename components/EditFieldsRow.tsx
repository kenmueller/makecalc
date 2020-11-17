import { ChangeEvent, SetStateAction, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import CalculatorField from 'models/Calculator/Field'
import { isValidVariable } from 'lib/variable'

import styles from 'styles/EditFieldsRow.module.scss'

export interface EditFieldsRowProps {
	type: 'inputs' | 'outputs'
	field: CalculatorField
	fields: CalculatorField[]
	setFields(fields: SetStateAction<CalculatorField[]>): void
}

const EditFieldsRow = ({ type, field, fields, setFields }: EditFieldsRowProps) => {
	const onLabelChange = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
		setFields(fields =>
			fields.map(_field =>
				_field.id === field.id
					? { ..._field, label: value }
					: _field
			)
		)
	}, [field, setFields])
	
	const onRelationChange = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
		if (type === 'inputs' && value && !isValidVariable(value))
			return
		
		setFields(fields =>
			fields.map(_field =>
				_field.id === field.id
					? { ..._field, relation: value }
					: _field
			)
		)
	}, [field, setFields])
	
	const remove = useCallback(() => {
		setFields(fields =>
			fields.filter(({ id }) => id !== field.id)
		)
	}, [field, setFields])
	
	return (
		<tr>
			<td className={styles.inputCell}>
				<input
					className={styles.input}
					placeholder={type === 'inputs' ? 'pints' : 'ounces'}
					value={field.label}
					onChange={onLabelChange}
				/>
			</td>
			<td className={styles.inputCell}>
				<input
					className={styles.input}
					placeholder={type === 'inputs' ? 'x' : 'x * 5'}
					value={field.relation}
					onChange={onRelationChange}
				/>
			</td>
			<td>
				<button
					className={styles.remove}
					type="button"
					disabled={fields.length === 1}
					onClick={remove}
				>
					<FontAwesomeIcon icon={faTrash} />
				</button>
			</td>
		</tr>
	)
}

export default EditFieldsRow

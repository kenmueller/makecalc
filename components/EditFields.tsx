import { SetStateAction, useCallback } from 'react'
import { nanoid } from 'nanoid'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

import CalculatorField from 'models/Calculator/Field'
import { VARIABLES, getNextVariable } from 'lib/variable'
import Row from './EditFieldsRow'

import styles from 'styles/EditFields.module.scss'

export interface EditFieldsProps {
	className?: string
	type: 'inputs' | 'outputs'
	fields: CalculatorField[]
	setFields(fields: SetStateAction<CalculatorField[]>): void
}

const EditFields = ({ className, type, fields, setFields }: EditFieldsProps) => {
	const add = useCallback(() => {
		const relation = type === 'inputs' ? getNextVariable(fields) : ''
		
		if (relation === null) {
			toast.error('Too many inputs')
			return
		}
		
		setFields(fields => [...fields, {
			id: nanoid(),
			label: '',
			relation
		}])
	}, [type, fields, setFields])
	
	return (
		<table className={cx(styles.root, className)}>
			<thead>
				<tr className={styles.labels}>
					<th className={cx(styles.label, styles.labelLabel)}>label</th>
					<th className={cx(styles.label, styles.variableLabel)}>
						{type === 'inputs' ? 'variable' : 'equation'}
					</th>
					<th className={styles.label}>
						<button
							className={styles.add}
							type="button"
							disabled={type === 'inputs' && fields.length >= VARIABLES.length}
							onClick={add}
						>
							<FontAwesomeIcon icon={faPlus} />
						</button>
					</th>
				</tr>
			</thead>
			<tbody>
				{fields.map(field => (
					<Row
						key={field.id}
						type={type}
						field={field}
						fields={fields}
						setFields={setFields}
					/>
				))}
			</tbody>
		</table>
	)
}

export default EditFields

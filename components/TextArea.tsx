import { TextareaHTMLAttributes } from 'react'
import _TextArea from 'react-textarea-autosize'
import cx from 'classnames'

import styles from 'styles/TextArea.module.scss'

const TextArea = ({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
	<_TextArea
		className={cx(styles.root, className)}
		minRows={3}
		{...props as any}
	/>
)

export default TextArea

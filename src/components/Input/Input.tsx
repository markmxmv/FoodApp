import { forwardRef } from 'react';
import styles from './Input.module.css';
import { InputProps } from './Input.props.ts';
import cn from 'classnames';

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className, isValid = true, ...props }, ref) {

	return (
		<input type='email'{...props} ref={ref} className={cn(className, styles['input'], {
			[styles['invalid']]: !isValid
		})}></input>
	);
});

export default Input;
import { forwardRef } from 'react';
import styles from './Search.module.css';
import { SearchProps } from './Search.props.ts';
import cn from 'classnames';

const Search = forwardRef<HTMLInputElement, SearchProps>(function Search({ className, isValid = true, ...props }, ref) {

	return (
		<div className={styles['input-wrapper']}>
			<input type='email'{...props} ref={ref} className={cn(className, styles['input'], {
				[styles['invalid']]: !isValid
			})}></input>
			<img className={styles['icon']} src="/search-icon.svg" alt="Search icon" />

		</div>
	);
});

export default Search;
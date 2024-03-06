import styles from './Heading.module.css';
import cn from 'classnames';
import { HeadingProps } from './Heading.props.ts';

function Heading({ className, children, ...props }: HeadingProps) {

	return (
		<h1 {...props} className={cn(className, styles['h1'])}>{children}</h1>
	);
}

export default Heading;
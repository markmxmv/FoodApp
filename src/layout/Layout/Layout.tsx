import { NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';

export function Layout() {

	return (
		<div className={styles['layout']}>
			<div className={styles['sidebar']}>
				<div className={styles['user']}>
					<img src="/avatar.png" alt="Avatar" className={styles['avatar']}/>
					<div className={styles['name']}>Mark Maximov</div>
					<div className={styles['email']}>mark@maximov.com</div>
				</div>
				<div className={styles['menu']}>
					<NavLink to="/" className={({ isActive }) => cn(styles['link'], {
						[styles['active']]: isActive
					})}>
						<img src="/menu-icon.svg" alt="Menu icon" />
						Menu</NavLink>
					<NavLink to="/cart" className={({ isActive }) => cn(styles['link'], {
						[styles['active']]: isActive
					})}>
						<img src="/cart-icon.svg" alt="Cart icon" />
						Cart</NavLink>
				</div>
				<Button className={styles['exit']}>
					<img src="/exit-icon.svg" alt="Exit icon" />
					Log out
				</Button>
			</div>
			<div className={styles['content']}>
				<Outlet/>
			</div>
		</div>
	);
}
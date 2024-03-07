import Heading from '../../components/Heading/Heading';
import ProductCard from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';


export function Menu() {
	return (
		<>
			<div className={styles['head']}>
				<Heading>Menu</Heading>
				<Search placeholder='Search dishes'/>

			</div>
			<div>
				<ProductCard
					id={1}
					title='Enjoying'
					description='Salami, ruccola, tomatoes, olives'
					rating={4.5}
					price={300}
					image='/product-demo.png'
				/>
			</div>
		</>
	);
}
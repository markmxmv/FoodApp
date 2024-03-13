import { useEffect, useState } from 'react';
import Heading from '../../components/Heading/Heading';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList';


function Menu() {

	const [products, setProducts] = useState<Product[]>([]);

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [error, setError] = useState<string | undefined>();

	const getMenu = async () => {

		try {
			setIsLoading(true);
			const {data} = await axios.get<Product[]>(`${PREFIX}/products`);
			setProducts(data);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			if (error instanceof AxiosError) {
				setError(error.message);
			}
			setIsLoading(false);
			return;
		}
	};

	useEffect(() => {
		getMenu();
	}, []);


	return (
		<>
			<div className={styles['head']}>
				<Heading>Menu</Heading>
				<Search placeholder='Search dishes'/>

			</div>
			{error && <>{error}</>}
			{!isLoading && <MenuList products={products}/>}
			{isLoading && <>Loading products...</>}
		</>
	);
}

export default Menu;
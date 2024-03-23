import { ChangeEvent, useEffect, useState } from 'react';
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

	const [filter, setFilter] = useState<string>();

	useEffect(() => {
		getMenu(filter);
	}, [filter]);


	const getMenu = async (name?: string) => {

		try {
			setIsLoading(true);
			const {data} = await axios.get<Product[]>(`${PREFIX}/products`, {
				params: {
					name
				}
			});
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

	const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};



	return (
		<>
			<div className={styles['head']}>
				<Heading>Menu</Heading>
				<Search placeholder='Search dishes' onChange={updateFilter}/>

			</div>
			{error && <>{error}</>}
			{!isLoading && products.length > 0 && <MenuList products={products}/>}
			{isLoading && <>Loading products...</>}
			{!isLoading && products.length === 0 && <>Not found</>}

		</>
	);
}

export default Menu;
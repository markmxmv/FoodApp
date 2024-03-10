import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';
import { LoginResponse } from '../../interfaces/auth.interface';

export type LoginForm = {
    email: {
        value: string
    };
    password: {
        value: string
    }
}

function Login() {
	const [error, setError] = useState<string | null>();
	const navigate = useNavigate();

	const submit = async (e:FormEvent) => {
		e.preventDefault();
		setError(null);
		const target = e.target as typeof e.target & LoginForm;
		const {email, password} = target;
		console.log(email.value);
		console.log(password.value);
		await sendLogin(email.value, password.value);
	};

	const sendLogin = async (email: string, password: string) => {
		try {
			const {data} = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
				email,
				password
			});
			console.log(data);
			localStorage.setItem('jwt', data.access_tocken);
			navigate('/');
		} catch (e) {
			if (e instanceof AxiosError) {
				setError(e.response?.data.message);
			}
		}

	};

	return (
		<div className={styles['login']}>
			<Heading>Login</Heading>
			{ error && <div className={styles['error']}>{error}</div>}
			<form className={styles['form']} onSubmit={submit}>
				<div className={styles['field']}>
					<label htmlFor="email">Email</label>
					<Input id="email" name="email" placeholder='Email'></Input>
				</div>
				<div className={styles['field']}>
					<label htmlFor="password">Password</label>
					<Input id="password" name="password" placeholder='Password'></Input>
				</div>
				<Button appearence="big">Login</Button>
			</form>
			<div className={styles['links']}>
				<div>Don't have an account?</div>
				<Link to="/auth/register">Register now!</Link>
			</div>
		</div>
	);
}

export default Login;
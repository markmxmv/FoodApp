import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { FormEvent, useEffect } from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { login, userActions } from '../../store/user.slice';

export type LoginForm = {
    email: {
        value: string
    };
    password: {
        value: string
    }
}

function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);


	useEffect(() => {
		if(jwt) {
			navigate('/');

		}
	}, [jwt, navigate]);

	const submit = async (e:FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearLooginError());
		const target = e.target as typeof e.target & LoginForm;
		const {email, password} = target;
		console.log(email.value);
		console.log(password.value);
		await sendLogin(email.value, password.value);
	};

	const sendLogin = async (email: string, password: string) => {
		dispatch(login({ email, password }));

	};

	return (
		<div className={styles['login']}>
			<Heading>Login</Heading>
			{ loginErrorMessage && <div className={styles['error']}>{loginErrorMessage}</div>}
			<form className={styles['form']} onSubmit={submit}>
				<div className={styles['field']}>
					<label htmlFor="email">Email</label>
					<Input type='email' autoComplete='off' id="email" name="email" placeholder='Email'></Input>
				</div>
				<div className={styles['field']}>
					<label htmlFor="password">Password</label>
					<Input type='password' autoComplete='off' id="password" name="password" placeholder='Password'></Input>
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
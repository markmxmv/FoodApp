import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from './Register.module.css';
import { FormEvent, useEffect } from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { register, userActions } from '../../store/user.slice';

export type RegisterForm = {
    email: {
        value: string
    };
    password: {
        value: string
    };
    name: {
        value: string
    }
}

function Register() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);


	useEffect(() => {
		if(jwt) {
			navigate('/');

		}
	}, [jwt, navigate]);

	const submit = async (e:FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearRegisterError());
		const target = e.target as typeof e.target & RegisterForm;
		const {email, password, name} = target;
		dispatch(register({ email: email.value, password: password.value, name: name.value }));

	};

	return (
		<div className={styles['login']}>
			<Heading>Register</Heading>
			{ registerErrorMessage && <div className={styles['error']}>{registerErrorMessage}</div>}
			<form className={styles['form']} onSubmit={submit}>
				<div className={styles['field']}>
					<label htmlFor="email">Email</label>
					<Input type='email' autoComplete='off' id="email" name="email" placeholder='Email'></Input>
				</div>
				<div className={styles['field']}>
					<label htmlFor="password">Password</label>
					<Input type='password' autoComplete='off' id="password" name="password" placeholder='Password'></Input>
				</div>
				<div className={styles['field']}>
					<label htmlFor="name">Your name</label>
					<Input autoComplete='off' id="name" name="name" placeholder='Name'></Input>
				</div>
				<Button appearence="big">Register</Button>
			</form>
			<div className={styles['links']}>
				<div>Have an account?</div>
				<Link to="/auth/login">Log in</Link>
			</div>
		</div>
	);
}

export default Register;
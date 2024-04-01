import React, {useState} from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signInWithGoogle, auth } from '../../firebase/firebase.utils.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

import './sign-in.styles.scss';


const SignIn = ({isGoogleSignIn}) => {
	const [userCredentials, setCredentials] = useState({email: '', password:''});

	const { email, password } = userCredentials;
	const handleSubmit = async event => {
		event.preventDefault();
		try {
			// await signInWithEP(email, password);
			// this.setState({email: '', password: ''});
			await signInWithEmailAndPassword(auth, email, password);
			setCredentials({email: '', password: ''});
		} catch (error) {
			console.log(error);
		}
		
	}

	const handleChange = event => {
		const {name, value} = event.target;
		setCredentials({...userCredentials, [name]: value})
	}

	return (
		<div className='sign-in'>
			<h2>I already have an account</h2>
			<span>Sign in with your email and password</span>

			<form onSubmit={ handleSubmit }>
				<FormInput
				handleChange={ handleChange }
				type='email'
				name='email'
				value={ email }
				label='Email'
				required />
				<FormInput
				handleChange={ handleChange }
				type='password'
				name='password'
				value={ password }
				label='Password'
				required />
				<div className='buttons'>
					<CustomButton type='submit'>Sign In</CustomButton>
					<CustomButton onClick={ signInWithGoogle } isGoogleSignIn>Sign in with google</CustomButton>
				</div>
			</form>
		</div>
	)
}

export default SignIn;
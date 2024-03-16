import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signInWithGoogle, auth } from '../../firebase/firebase.utils.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

import './sign-in.styles.scss';


class SignIn extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		}
	}

	handleSubmit = async event => {
		event.preventDefault();
		const { email, password } = this.state;
		try {
			// await signInWithEP(email, password);
			// this.setState({email: '', password: ''});
			await signInWithEmailAndPassword(auth, email, password);
			this.setState({email: '', password: ''});
		} catch (error) {
			console.log(error);
		}
		
	}

	handleChange = event => {
		const {name, value} = event.target;
		this.setState({[name]: value})
	}

	render() {
		return (
			<div className='sign-in'>
				<h2>I already have an account</h2>
				<span>Sign in with your email and password</span>

				<form onSubmit={ this.handleSubmit }>
					<FormInput
					handleChange={ this.handleChange }
					type='email'
					name='email'
					value={ this.state.email }
					label='Email'
					required />
					<FormInput
					handleChange={ this.handleChange }
					type='password'
					name='password'
					value={ this.state.password }
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
}

export default SignIn;
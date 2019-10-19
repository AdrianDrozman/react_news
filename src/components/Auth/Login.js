import React from 'react';
import useFormValidation from './useFormValidation';
import validateLogin from './validateLogin';
import firebase from '../../firebase';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: ''
};

function Login(props) {
  const {
    handleChange,
    handleSubmit,
    values,
    isSubmitting,
    handleBlur,
    errors
  } = useFormValidation(INITIAL_STATE, validateLogin,authenticateUser);
  const [login, setLogin] = React.useState(true);
  const [firebaseError,setFirebaseError] = React.useState(null)

  async function authenticateUser() {
    const { name, email, password } = values;
    try {
      login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password);
      
    } catch (error) {
      console.error('Authentication Error',error)
      setFirebaseError(error.message)
    }
  }
  return (
    <div>
      <h2 className='mv3'>{login ? 'Login' : 'Create Account'}</h2>
      <form className='flex flex-column' onSubmit={handleSubmit}>
        {!login && (
          <input
            type='text'
            placeholder='Your Name'
            autoComplete='off'
            onChange={handleChange}
            name='name'
            value={values.name}
          />
        )}
        <input
          type='email'
          placeholder='Your Email'
          autoComplete='off'
          onChange={handleChange}
          name='email'
          value={values.email}
          onBlur={handleBlur}
          className={errors.email && 'error-input'}
        />
        {errors.email && <p className='error-text'>{errors.email}</p>}
     
        <input
          type='password'
          placeholder='Choose a secure password'
          onChange={handleChange}
          name='password'
          value={values.password}
          onBlur={handleBlur}
          className={errors.password && 'error-input'}
        />
        {errors.password && <p className='error-text'>{errors.password}</p>}
        {firebaseError && <p className="error-text">{firebaseError}</p>}
        <div className='flex mt3'>
          <button
            type='submit'
            className='button pointer mr2'
            disabled={isSubmitting}
            style={{ background: isSubmitting ? 'grey' : 'orange' }}
          >
            Submit
          </button>
          <button
            type='button'
            className='pointer button'
            onClick={() => setLogin(prevLogin => !prevLogin)}
          >
            {login ? 'need to create an account?' : 'alread have an account ?'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

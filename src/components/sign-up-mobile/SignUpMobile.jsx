import React, { useState } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { useNavigate } from 'react-router-dom';
import { AuthStyle } from '../../styles/authSidebar';
import { Link } from 'react-router-dom';
import AuthSidebar from '../authSidebar/authSidebar';
import { Card, Container, Mobile, RegisterLink } from '../../styles/authCard';

function SignUpMobile() {
  const { signUpEmail } = useGlobalContext();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLang] = useState('en');
  const [error, setError] = useState('');
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUpEmail(name, surname, email, password, language);
      localStorage.setItem('email', email);
      setEmail('');
      setName('');
      setSurname('');
      setPassword('');
      console.log('Sign up successful');
      history(`/verify/${language}`);
    } catch (error) {
      alert(error);
      setError(error.response?.data?.message || 'Sign up failed');
    }
  };

  return (
    <AuthStyle>
      <div className='right'>
        <AuthSidebar />
      </div>
      <div className='left'>
        <Card>
          <Container>
            <form onSubmit={handleSubmit}>
              <h1>Sign up</h1>
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <input type="text" placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
              <input type="email" placeholder="Mobile number" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <br />  
              <span className='sign-mobile'>Sign up with&nbsp;<RegisterLink><Link to={`/${language}`}>email</Link></RegisterLink></span><br />  
              <button type="submit">Sign Up</button><br />
              <RegisterLink>
                <Link to={`/login-mobile/${language}`}>Log in</Link>
              </RegisterLink>
              <br />
              <div className='privacy'>
                <span>Privacy policies and etc.</span>
              </div>
              
            </form>
            {error && <p>{error}</p>}
          </Container>

        </Card>
      </div>


    </AuthStyle>
  );
}

export default SignUpMobile;

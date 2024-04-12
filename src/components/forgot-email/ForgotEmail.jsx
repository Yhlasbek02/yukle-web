import React, { useState } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { useNavigate } from 'react-router-dom';
import { AuthStyle } from '../../styles/authSidebar';
import { Link } from 'react-router-dom';
import AuthSidebar from '../authSidebar/authSidebar';
import { Card, Container, Mobile, RegisterLink } from '../../styles/authCard';

function ForgotEmail() {
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
              <h1 style={{fontSize: "2rem"}}>Input your Email, then we <br /> will send you a verification <br /> code</h1>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <br />
              <span className='sign-mobile'>Use&nbsp;<RegisterLink><Link to={`/forgot-mobile/${language}`}>mobile number</Link></RegisterLink></span><br />
              <div style={{marginTop: "130px"}}>
                <button type="submit" style={{marginTop: "5.5rem"}}>Next</button><br />
              </div>


            </form>
            {error && <p>{error}</p>}
          </Container>

        </Card>
      </div>


    </AuthStyle>
  );
}

export default ForgotEmail;

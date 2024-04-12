import React, { useState } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { useNavigate } from 'react-router-dom';
import { AuthStyle } from '../../styles/authSidebar';
import { Link } from 'react-router-dom';
import AuthSidebar from '../authSidebar/authSidebar';
import { Card, Container, Mobile, RegisterLink, Input, EyeIcon, InputContainer } from '../../styles/authCard';
import { FiEye, FiEyeOff } from 'react-icons/fi';
function NewPassword() {
  const { signUpEmail } = useGlobalContext();
  const [password, setPassword] = useState('');
  const [password_conf, setPassword_Conf] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLang] = useState('en');
  const [error, setError] = useState('');
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await signUpEmail(name, surname, email, password, language);
      // localStorage.setItem('email', email);
      // setEmail('');
      // setName('');
      // setSurname('');
      // setPassword('');
      // console.log('Sign up successful');
      history(`/cargos/${language}`);
    } catch (error) {
      alert(error);
      setError(error.response?.data?.message || 'Sign up failed');
    }
  };


  const Eye = ({ showPassword, togglePasswordVisibility }) => (
    <EyeIcon onClick={togglePasswordVisibility}>
      {showPassword ? <FiEyeOff /> : <FiEye />}
    </EyeIcon>
  );

  return (
    <AuthStyle>
      <div className='right'>
        <AuthSidebar />
      </div>
      <div className='left'>
        <Card>
          <Container>
            <form onSubmit={handleSubmit}>
              <h1>Create new <br /> password</h1>
              <InputContainer>
                <Input placeholder="Type password" value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} />
                <Eye showPassword={showPassword} togglePasswordVisibility={() => setShowPassword(!showPassword)} />
              </InputContainer>
              <InputContainer>
                <Input placeholder="Confirm password" value={password_conf} onChange={(e) => setPassword_Conf(e.target.value)} type={showPassword ? 'text' : 'password'} />
                <Eye showPassword={showPassword} togglePasswordVisibility={() => setShowPassword(!showPassword)} />
              </InputContainer>

              <div style={{ marginTop: "130px" }}>
                <button type="submit">Done</button><br />
              </div>


            </form>
            {error && <p>{error}</p>}
          </Container>

        </Card>
      </div>


    </AuthStyle>
  );
}

export default NewPassword;

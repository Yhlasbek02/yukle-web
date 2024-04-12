import React, { useState, useEffect, useRef } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { useNavigate } from 'react-router-dom';
import { AuthStyle } from '../../styles/authSidebar';
import { Link } from 'react-router-dom';
import AuthSidebar from '../authSidebar/authSidebar';
import { Card, Container, InputField, RegisterLink, Timer, Paragraph, CodeContainer, TryAgainMessage } from '../../styles/authCard';

function Verification() {
  const { signUpEmail } = useGlobalContext();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLang] = useState('en');
  const [showTryAgain, setShowTryAgain] = useState(false);
  const [remainingTime, setRemainingTime] = useState(10); // 5 minutes in seconds
  const [inputsDisabled, setInputsDisabled] = useState(false);
  const [otp, setOTP] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const history = useNavigate();
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  useEffect(() => {
    let timer;
    if (remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setShowTryAgain(true);
      setInputsDisabled(true);
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [remainingTime]);

  const handleInputChange = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value;

    if (value !== '') {
      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    } else {
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }

    setOTP(newOTP);
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs[index - 1].current.focus();
    }
  };

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
      history(`/new-password/${language}`);
    } catch (error) {
      alert(error);
      setError(error.response?.data?.message || 'Sign up failed');
    }
  };
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  return (
    <AuthStyle>
      <div className='right'>
        <AuthSidebar />
      </div>
      <div className='left'>
        <Card>
          <Container>
            <form onSubmit={handleSubmit}>
              <h1 style={{fontWeight: 800}}>Verification</h1>
              <Timer>{`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}</Timer>
              <Paragraph>Type the verification code <br></br> we've sent you</Paragraph>
              <CodeContainer>
                {otp.map((digit, index) => (
                  <InputField
                    key={index}
                    ref={inputRefs[index]}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    type='text'
                    maxLength={1}
                    disabled={inputsDisabled}
                  />
                ))}
              </CodeContainer>
              <div style={{ marginTop: "60px" }}>
                {showTryAgain && (
                  <TryAgainMessage to={`/forgot-email/${language}`}>
                    Try again
                  </TryAgainMessage>
                )}
                <br />
                <button type="submit" style={{ marginTop: "1.5rem" }} disabled={showTryAgain || inputsDisabled}>Next</button><br />

              </div>


            </form>
            {error && <p>{error}</p>}
          </Container>

        </Card>
      </div>


    </AuthStyle>
  );
}

export default Verification;

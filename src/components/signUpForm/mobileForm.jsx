import React, {useState, useEffect} from 'react';
import { RegisterLink } from "../../styles/authCard";
import { Link } from 'react-router-dom';
import enData from "../../utils/locales/en/signup_mobile.json";
import ruData from "../../utils/locales/ru/signup_mobile.json";
import trData from "../../utils/locales/tr/signup_mobile.json";

export default function MobileForm({ submit, name, setName, surname, setSurname, email, setEmail, password, setPassword, language }) {
    const [translation, setTranslations] = useState(enData);
    const loadTranslations = () => {
        switch (language) {
            case 'en':
                setTranslations(enData);
                break;
            case 'ru':
                setTranslations(ruData);
                break;
            case 'tr':
                setTranslations(trData);
                break;
            default:
                setTranslations(enData);
        }
    };
    useEffect(() => {
        loadTranslations();
    }, [language]);
    return (
        <form onSubmit={submit}>
            <h1>{translation.title}</h1>
            <input type="text" placeholder={translation.name} value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder={translation.surname} value={surname} onChange={(e) => setSurname(e.target.value)} />
            <input type="email" placeholder={translation.mobile} value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder={translation.password} value={password} onChange={(e) => setPassword(e.target.value)} />
            <br />
            <span className='sign-mobile'>{translation.paragraph}&nbsp;<RegisterLink><Link to={`/${language}`}>{translation.option}</Link></RegisterLink></span><br />
            <button type="submit">{translation.button}</button><br />
            <RegisterLink>
                <Link to={`/login-email/${language}`}>
                    {translation.login}
                </Link>
            </RegisterLink>
            <br />
            <div className='privacy'>
                <span>
                    {translation.privacy}
                </span>
            </div>
        </form>
    );
}

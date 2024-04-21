import React, { useState, useEffect } from 'react';
import { RegisterLink } from "../../styles/authCard";
import { Link } from 'react-router-dom';
import enData from "../../utils/locales/en/login_mobile.json";
import ruData from "../../utils/locales/ru/login_mobile.json";
import trData from "../../utils/locales/tr/login_mobile.json";

export default function MobileForm({ submit, email, setEmail, password, setPassword, language }) {
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
            <h1>
                {translation.title}
            </h1>
            <input type="email" placeholder={translation.mobile} value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder={translation.password} value={password} onChange={(e) => setPassword(e.target.value)} />
            <br />
            <span className='sign-mobile'>{translation.paragraph}&nbsp;<RegisterLink><Link to={`/login-email/${language}`}>{translation.option}</Link></RegisterLink></span><br />
            <div style={{ marginTop: "120px" }}>
                <button type="submit">
                    {translation.button}
                </button>
                <RegisterLink>
                    <Link to={`/${language}`}>
                        {translation.sign_up}
                    </Link>
                </RegisterLink>
                <br />
                <RegisterLink>
                    <Link to={`/forgot-email/${language}`}>
                        {translation.forgot}
                    </Link>
                </RegisterLink>
            </div>
        </form>
    );
}

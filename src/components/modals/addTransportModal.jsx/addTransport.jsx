import React, { useState, useEffect, useRef } from 'react'
import { ModalContainer, ModalOverlay, ModalContent, ModalFooter, ModalHeader, ModalBody, ModalCouple, ChildCouple, ModalOption, ModalTextArea, CloseButton } from './style';
import enData from "../../../utils/locales/en/add_transport.json";
import ruData from "../../../utils/locales/ru/add_transport.json";
import trData from "../../../utils/locales/tr/add_transport.json";
import { useGlobalContext } from '../../../context/globalContext';
export default function AddCargoModal({ onClose, language }) {
    const modalRef = useRef();
    const { getTransportTypes, getCountries, getCities, getProfile, addTransport } = useGlobalContext();
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [transportTypes, setTransportTypes] = useState([]);
    const [transportTypeId, setTransportTypeId] = useState(null);
    const [affiliationCountryId, setAffiliationCountryId] = useState(null);
    const [locationCountryId, setLocationCountryId] = useState(null);
    const [searchKey, setSearchKey] = useState('');
    const [locationCityId, setLocationCityId] = useState(null);
    const [desiredLocationId, setDesiredLocationId] = useState(null);
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [whatsApp, setWhatsApp] = useState('');
    const [email, setEmail] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [citySelectDisabled, setCitySelectDisabled] = useState(true);
    const [translation, setTranslations] = useState(enData);
    const loadTranslations = () => {
        const translations = {
            'en': enData,
            'ru': ruData,
            'tr': trData
        };
        setTranslations(translations[language] || enData);
    };


    const fetchTransportData = async () => {
        try {
            const transportTypesData = await getTransportTypes(language);
            setTransportTypes(transportTypesData.types);


            const countriesData = await getCountries(language, '');
            setCountries(countriesData.countries);

            const profileData = await getProfile(language);
            setName(profileData.name);
            setEmail(profileData.email === null ? '' : profileData.email);
            setNumber(profileData.phoneNumber === null ? '' : profileData.phoneNumber);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCitiesByCountry = async (countryId) => {
        try {
            const citiesData = await getCities(language, searchKey, countryId);
            setCities(citiesData.cities);
            setLocationCityId(citiesData.cities[0]?.id || '');
            setCitySelectDisabled(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadTranslations();
        fetchTransportData();
    }, [language]);


    useEffect(() => {
        if (countries.length > 0) {
            setAffiliationCountryId(countries[0]?.id || '');
            setLocationCountryId(countries[0]?.id || '');
            fetchCitiesByCountry(countries[0]?.id);
            setDesiredLocationId(countries[0]?.id || '');
        }
    }, [countries]);

    useEffect(() => {
        if (transportTypes.length > 0) {
            setTransportTypeId(transportTypes[0]?.id || '');
        }
    }, [transportTypes]);

    const handleAffiliationCountryChange = (e) => {
        const selectedCountry = e.target.value;
        setAffiliationCountryId(selectedCountry);
    }

    const handleLocationCountry = (e) => {
        const selectedCountry = e.target.value;
        setLocationCountryId(selectedCountry);
        fetchCitiesByCountry(selectedCountry);
        setCitySelectDisabled(false);
    }

    const addTransportFunction = async () => {
        try {
            const data = await addTransport(
                language,
                parseInt(transportTypeId),
                parseInt(affiliationCountryId),
                parseInt(locationCountryId),
                parseInt(locationCityId),
                [parseInt(desiredLocationId)],
                name,
                number,
                email,
                whatsApp,
                additionalInfo
            );

            if (data) {
                onClose();
            } else {
                onClose();
            }
        } catch (error) {
            console.error(error);
        }
    }


    const getNames = (name) => {
        switch (language) {
            case 'en':
                return name.nameEn;
            case 'ru':
                return name.nameRu;
            case 'tr':
                return name.nameTr;
            default:
                return name.nameEn;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await addTransportFunction();
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [onClose]);

    return (
        <ModalOverlay>
            <ModalContainer ref={modalRef}>
                <ModalContent>
                    <form onSubmit={handleSubmit}>
                        <ModalHeader>
                            <span>
                                {translation.title}
                            </span>

                            <CloseButton onClick={onClose}>&times;</CloseButton>
                        </ModalHeader>
                        <ModalBody>
                            <label htmlFor="">{translation.type}</label>
                            <select name="" id="" onChange={(e) => setTransportTypeId(e.target.value)} value={transportTypeId}>
                                {transportTypes.map((type) => (
                                    <ModalOption key={type.id} value={type.id}>{getNames(type)}</ModalOption>
                                ))}
                            </select>

                            <label htmlFor="">{translation.affiliation}</label>
                            <select name="" id="" onChange={handleAffiliationCountryChange} value={affiliationCountryId}>
                                {countries.map((country) => (
                                    <ModalOption key={country.id} value={country.id}>{getNames(country)}</ModalOption>
                                ))}
                            </select>
                            <ModalCouple>
                                <ChildCouple>
                                    <label htmlFor="">{translation.location_country}</label>
                                    <select name="" id="" onChange={handleLocationCountry} value={locationCountryId}>
                                        {countries.map((country) => (
                                            <ModalOption key={country.id} value={country.id}>
                                                {getNames(country)}
                                            </ModalOption>
                                        ))}
                                    </select>
                                </ChildCouple>
                                <ChildCouple style={{ marginLeft: "1rem" }}>
                                    <label htmlFor="">{translation.location_city}</label>
                                    <select name="" id="" disabled={citySelectDisabled} onChange={(e) => setLocationCityId(e.target.value)} value={locationCityId}>
                                        {cities.map((city) => (
                                            <ModalOption key={city.id} value={city.id}>
                                                {getNames(city)}
                                            </ModalOption>
                                        ))}
                                    </select>
                                </ChildCouple>
                            </ModalCouple>

                            <label htmlFor="">{translation.desired}</label>
                            <select name="" id="" onChange={(e) => setDesiredLocationId(e.target.value)} value={desiredLocationId}>
                                {countries.map((country) => (
                                    <ModalOption key={country.id} value={country.id}>
                                        {getNames(country)}
                                    </ModalOption>
                                ))}

                            </select>

                            <ModalCouple>
                                <ChildCouple>
                                    <label htmlFor="">{translation.name}</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                </ChildCouple>
                                <ChildCouple style={{ marginLeft: "1rem" }}>
                                    <label htmlFor="">{translation.number}</label>
                                    <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} />
                                </ChildCouple>
                            </ModalCouple>
                            <ModalCouple>
                                <ChildCouple>
                                    <label htmlFor="">{translation.email}</label>
                                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </ChildCouple>
                                <ChildCouple style={{ marginLeft: "1rem" }}>
                                    <label htmlFor="">{translation.whatsApp}</label>
                                    <input type="text" onChange={(e) => setWhatsApp(e.target.value)} />
                                </ChildCouple>
                            </ModalCouple>

                            <label htmlFor="">{translation.additional}</label>
                            <ModalTextArea onChange={(e) => setAdditionalInfo(e.target.value)} />
                        </ModalBody>
                        <ModalFooter>
                            <button type="submit">
                                {translation.add}
                            </button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </ModalContainer>
        </ModalOverlay >
    );
}

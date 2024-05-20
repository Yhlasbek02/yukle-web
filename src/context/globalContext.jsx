import React, { useContext, useState } from "react"
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = "http://localhost:3001/api/user/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({ children }) => {
    const [transports, setTransports] = useState({ transports: [], totalCount: 1, currentPage: 1, totalPages: 1 });
    const [singleTransport, setSingleTransport] = useState([])
    const [cargos, setCargos] = useState({ cargos: [], totalPages: 1, totalCount: 1, currentPage: 1 });
    const [singleCargo, setSingleCargo] = useState([])
    const [countries, setCountries] = useState({ countries: [] })
    const [allCountries, setAllCountries] = useState({ countries: [], totalPages: 1, totalCountry: 1, currentPage: 1 })
    const [cities, setCities] = useState({ cities: [] })
    const [messages, setMessages] = useState({ messages: [] });
    const [cargoTypes, setCargoTypes] = useState({ cargoTypes: [], totalPages: 1, currentPage: 1, totalCargoTypes: 1 });
    const [transportTypes, setTransportTypes] = useState({ types: [] });
    const [notifications, setNotifications] = useState({ notifications: [], totalCount: 1, currentPage: 1, totalPages: 1 })
    const [profile, setProfile] = useState([])
    const [error, setError] = useState(null)

    const signUpEmail = async (name, surname, email, password, lang) => {
        try {
            const response = await axios.post(`${BASE_URL}auth/sign-up/email/${lang}`, {
                name, surname, email, password
            });

            if (response.status === 201) {
                toast.success(response.data.message);
                return true;
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Sign up failed');
            }
        }
    };




    const signUpMobile = async (name, surname, phoneNumber, password, lang) => {
        try {
            const response = await axios.post(`${BASE_URL}auth/sign-up/mobile/${lang}`, { name, surname, phoneNumber, password })
            if (response.status === 201) {
                toast.success(response.data.message);
                return true;
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Sign up failed');
            }
        }
    }

    const loginByEmail = async (email, password, lang) => {
        try {
            const response = await axios.post(`${BASE_URL}auth/login/email/${lang}`, { email, password })
            if (response.status) {
                localStorage.setItem('token', response.data.token);
                toast.success(response.data.message);
                return true;
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Login failed');
            }
        }
    }

    const loginByMobile = async (phoneNumber, password, lang) => {
        try {
            const response = await axios.post(`${BASE_URL}auth/login/mobile/${lang}`, { phoneNumber, password })
            if (response.status) {
                localStorage.setItem('token', response.data.token);
                toast.success(response.data.message);
                return true;
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Login failed');
            }
        }
    }

    const logout = async () => {
        try {
            localStorage.removeItem('token');
        } catch (error) {
            setError(error.response?.data?.message || 'Logout failed');
        }
    }

    const sendCodeToEmail = async (email, lang) => {
        try {
            const response = await axios.post(`${BASE_URL}auth/resend-code/email/${lang}`, { email })
            if (response.status) {
                localStorage.setItem('email', email);
                toast.success(response.data.message);
                return true;
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Server error');
            }
        }
    }

    const sendCodeToMobile = async (phoneNumber, lang) => {
        try {
            const response = await axios.post(`${BASE_URL}auth/resend-code/mobile/${lang}`, { phoneNumber })
            if (response.status) {
                localStorage.setItem('email', phoneNumber);
                toast.success(response.data.message);
                return true;
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Server error');
            }
        }
    }

    const verifyCode = async (otp, email, lang) => {
        try {
            const response = await axios.post(`${BASE_URL}auth/verify/${lang}`, { otp: otp, email: email })
            if (response) {
                console.log(response.data)
                localStorage.setItem('token', response.data.token);
                toast.success(response.data.message)
                return true;
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Verification failed');
            }
        }
    }

    const getProfile = async (lang) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}auth/profile/${lang}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
                .catch((err) => {
                    console.error(err.response.data.message);
                })
            return response.data

        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Profile error");
        }
    }

    const changePassword = async (password, confirmPassword, lang) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${BASE_URL}auth/change-pass/${lang}`,
                { password, confirmPassword },
                {
                    headers: {
                        'authorization': `Bearer ${token}`
                    }
                }
            )
            if (response.status) {
                toast.success(response.data.message);
                return true;
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Change password failed');
            }
        }
    }

    const addTransport = async (language, typeId, belongsTo, locationCountry, locationCity, desiredDirection, name, phoneNumber, email, whatsApp, additional_info) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${BASE_URL}transport/add/${language}`, {
                typeId, belongsTo, locationCountry, locationCity, desiredDirection, phoneNumber, name, email, whatsApp, additional_info
            }, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            if (response.status) {
                toast.success(response.data.message);
                return true;
            }
        } catch (error) {
            if (error.response) {
                console.log(error);
                toast.error(error.response.data.message);
            } else {
                toast.error('Add transport failed');
            }
        }
    }

    const addCargo = async (language, typeId, fromCountry, fromCity, toCountry, toCity, weight, typeTransport, phoneNumber, name, email, whatsApp, additional_info) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${BASE_URL}cargo/add/${language}`, {
                typeId, fromCountry, fromCity, toCountry, toCity, weight, typeTransport, phoneNumber, name, email, whatsApp, additional_info
            }, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            if (response.status) {
                toast.success(response.data.message);
                return true;
            }
        } catch (error) {
            if (error.response) {
                console.log(error);
                toast.error(error.response.data.message);
            } else {
                toast.error('Add cargo failed');
            }
        }
    }

    const changeAccount = async (lang, name, surname, phoneNumber, email) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${BASE_URL}auth/change-account/${lang}`,
                {
                    name, surname, phoneNumber, email
                },
                {
                    headers: {
                        'authorization': `Bearer ${token}`
                    }
                })
            if (response.status) {
                toast.success(response.data.message);
                return true;
            }
        } catch (error) {
            if (error.response) {
                console.log(error);
                toast.error(error.response.data.message);
            } else {
                toast.error('Add cargo failed');
            }
        }
    }

    const deleteUser = async (lang) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${BASE_URL}auth/delete-account/${lang}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Users error");
        }
    }

    const getTransports = async (page, lang, pageSize, type, location, country) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}transport/${lang}?page=${page}&pageSize=${pageSize}&type=${type}&location=${location}&country=${country}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
                .catch((err) => {
                    setError(err.response.data.message)
                })
            return response.data;
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Transports error");
        }

    }

    const getSingleTransport = async (id, lang) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}transport/${id}/${lang}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
                .catch((err) => {
                    setError(err.response.data.message);
                })
            return response.data;
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Transport error");
        }
    }

    const deleteTransport = async (id, lang) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${BASE_URL}transport/delete/${id}/${lang}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .catch((err) => {
                    setError(err.response.data.message || 'Delete transport error')
                })
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Server error");
        }

    }

    const getMyTransports = async (page, lang) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}transport/my/${lang}?page=${page}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
                .catch((err) => {
                    setError(err.response.data.message)
                })
            return response.data;
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Transports error");
        }
    }

    const getTransportTypes = async (lang) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}transport/get-types/${lang}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
                .catch((err) => {
                    setError(err.response.data.message);
                })
            return response.data
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Transport error");
        }
    }

    const getCargos = async (page, lang, pageSize, type, from, to, weight) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}cargo/${lang}?page=${page}&pageSize=${pageSize}&type=${type}&from=${from}&to=${to}&weight=${weight}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
                .catch((err) => {
                    setError(err.response.data.message);
                })
            return response.data;
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Cargo error");
        }
    }

    const getSingleCargo = async (id, lang) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}cargo/${id}/${lang}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
                .catch((err) => {
                    setError(err.response.data.message);
                })
            return response.data;
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Transport error");
        }
    }

    const getMyCargos = async (page, lang) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}cargo/my/${lang}?page=${page}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
                .catch((err) => {
                    setError(err.response.data.message);
                })
            return response.data
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Cargo error");
        }
    }

    const deleteCargo = async (id, lang) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${BASE_URL}cargo/delete/${id}/${lang}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .catch((err) => {
                    setError(err.response.data.message || 'Delete cargo error')
                })
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Server error");
        }

    }

    const getCargoTypes = async (lang) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}cargo/get-types/${lang}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
                .catch((err) => {
                    setError(err.response.data.message);
                })
            return response.data;
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Cargo type error");
        }
    }

    const getCountries = async (lang, searchKey) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}countries/${lang}?searchKey=${searchKey}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
                .catch((err) => {
                    setError(err.response.data.message);
                })
            return response.data
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Countries error");
        }
    }

    const getCities = async (lang, searchKey, countryId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}cities/${countryId}/${lang}?searchKey=${searchKey}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
                .catch((err) => {
                    setError(err.response.data.message);
                })
            return response.data
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Cities error");
        }

    }

    const addMessage = async (text, lang) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${BASE_URL}/chat/message/add/${lang}`, { text }, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
                .catch((err) => {
                    setError(err.response.data.message);
                })
            if (response.status) {
                toast.success(response.data.message);
                return true;
            }
        } catch (error) {
            if (error.response) {
                console.log(error);
                toast.error(error.response.data.message);
            } else {
                toast.error('Add transport failed');
            }
        }
    }

    const getMessages = async (page, lang) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}user/chat/messages/${lang}?page=${page}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
                .catch((err) => {
                    setError(err.response.data.message);
                })
            return response.data
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Server error");
        }
    }

    const getNotifications = async (lang, page, type) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}notification/web/${lang}?page=${page}&type=${type}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
                .catch((err) => {
                    setError(err.response.data.message);
                })
            return response.data
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Server error");
        }
    }

    const changeNotification = async (lang, type) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${BASE_URL}auth/change-notification/${type}/${lang}`, {}, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
                .catch((err) => {
                    setError(err.response.data.message);
                })
            return response.data
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Server error");
        }
    }

    return (
        <GlobalContext.Provider value={{
            transports,
            setTransports,
            singleTransport,
            setSingleTransport,
            cargos,
            setCargos,
            singleCargo,
            setSingleCargo,
            countries,
            setCountries,
            allCountries,
            setAllCountries,
            cities,
            setCities,
            messages,
            setMessages,
            cargoTypes,
            setCargoTypes,
            transportTypes,
            setTransportTypes,
            notifications,
            setNotifications,
            profile,
            setProfile,
            error,
            setError,
            signUpEmail,
            signUpMobile,
            loginByEmail,
            loginByMobile,
            logout,
            addCargo,
            sendCodeToEmail,
            sendCodeToMobile,
            verifyCode,
            getProfile,
            changeAccount,
            changePassword,
            deleteUser,
            getTransportTypes,
            getTransports,
            deleteTransport,
            getSingleTransport,
            getCargoTypes,
            getCargos,
            deleteCargo,
            getSingleCargo,
            getMyCargos,
            getMyTransports,
            getCountries,
            getCities,
            addMessage,
            getMessages,
            getNotifications,
            addTransport,
            changeNotification
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}
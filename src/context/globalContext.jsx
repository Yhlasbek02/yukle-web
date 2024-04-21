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
            await axios.post(`${BASE_URL}sign-up/email/${lang}`, { name, surname, phoneNumber, password })
                .catch((err) => {
                    setError(err.response.data.message);
                });
        } catch (error) {
            setError(error.response?.data?.message || 'Sign up failed');
        }
    }

    const loginByEmail = async (email, password, lang) => {
        try {
            const response = await axios.post(`${BASE_URL}login/email/${lang}`, { email, password })
                .catch((err) => {
                    setError(err.response.data.message)
                });
            if (response && response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
        }
    }

    const loginByMobile = async (phoneNumber, password, lang) => {
        try {
            const response = await axios.post(`${BASE_URL}login/mobile/${lang}`, { phoneNumber, password })
                .catch((err) => {
                    setError(err.response.data.message)
                });
            if (response && response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
        }
    }

    const logout = async () => {
        try {
            localStorage.removeItem('token');
        } catch (error) {
            setError(error.response?.data?.message || 'Logout failed');
        }
    }

    const resendCode = async (email) => {
        try {
            await axios.post(`${BASE_URL}resend-code/email/`, email)
                .catch((err) => {
                    setError(err.response.data.message);
                });
        } catch (error) {
            setError(error.response?.data?.message || "Can't send code");
        }
    }

    const verifyCode = async (otp, email, lang) => {
        try {
            const response = await axios.post(`${BASE_URL}auth/verify/${lang}`, { otp: otp, email: email })
                .catch((err) => {
                    setError(err.response.message)
                });
            if (response & response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
        } catch (error) {
            setError(error.response?.data?.message || "Verification error");
        }
    }

    const getProfile = async (lang) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}profile/${lang}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
                .catch((err) => {
                    setError(err.response.data.message)
                });
            setProfile(response.data)
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Profile error");
        }
    }

    const changePassword = async (password, confirmPassword, lang) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${BASE_URL}change-pass/${lang}`, { password, confirmPassword },
                {
                    headers: {
                        'authorization': `Bearer ${token}`
                    }
                }
            )
                .catch((err) => {
                    setError(err.response.data.message)
                })
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Change password error");
        }
    }

    const changeAccount = async (lang, name, surname, phoneNumber, email, transportNotification, cargoNotification) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}change-account/${lang}`,
                {
                    name, surname, phoneNumber, email, transportNotification, cargoNotification
                },
                {
                    headers: {
                        'authorization': `Bearer ${token}`
                    }
                })
            setProfile({
                user: response.data.user
            });
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Users error");
        }
    }

    const deleteUser = async (lang) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${BASE_URL}delete-account/${lang}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Users error");
        }
    }

    const getTransports = async (page, lang) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}transport/${lang}?page=${page}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
                .catch((err) => {
                    setError(err.response.data.message)
                })
            setTransports({
                transports: response.data.transports,
                totalCount: response.data.totalCount,
                currentPage: response.data.page,
                totalPages: response.data.totalPages
            });
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
            setSingleTransport(response.data);
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
            setTransports({
                transports: response.data.transports,
                totalCount: response.data.totalCount,
                currentPage: response.data.page,
                totalPages: response.data.totalPages
            });
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
            setTransportTypes({
                types: response.data.types
            });
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Cargo error");
        }
    }

    const getCargos = async (page, lang) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}cargo/${lang}?page=${page}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
                .catch((err) => {
                    setError(err.response.data.message);
                })
            setCargos({
                cargos: response.data.cargos,
                totalPages: response.data.totalPages,
                totalCount: response.data.totalCount,
                currentPage: response.data.currentPage,
            });
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
            setSingleCargo(response.data);
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
            setCargos({
                cargos: response.data.cargos,
                totalPages: response.data.totalPages,
                totalCount: response.data.totalCount,
                currentPage: response.data.currentPage,
            });
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
            setCargoTypes(response.data);
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Cargo type error");
        }
    }

    const getCountries = async (lang, searchKey) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}user/countries/${lang}?searchKey=${searchKey}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
                .catch((err) => {
                    setError(err.response.data.message);
                })
            setCountries({
                countries: response.data.countries
            })
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Countries error");
        }
    }

    const getCities = async (lang, searchKey, countryId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}user/cities/${countryId}/${lang}?searchKey=${searchKey}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
                .catch((err) => {
                    setError(err.response.data.message);
                })
            setCities({
                cities: response.data.cities
            })
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Cities error");
        }

    }

    const addMessage = async (text, lang) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${BASE_URL}user/chat/message/add/${lang}`, { text: text }, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
                .catch((err) => {
                    setError(err.response.data.message);
                })
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Server error");
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
            setMessages({
                messages: response.data.messages
            });
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Server error");
        }
    }

    const getNotifications = async (lang) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}user/notification/messages/${lang}?page=${page}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
                .catch((err) => {
                    setError(err.response.data.message);
                })
            setNotifications({
                notifications: response.data.notifications,
                totalCount: response.data.totalCount,
                currentPage: response.data.currentPage,
                totalPages: response.data.totalPages
            });
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
            resendCode,
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
            getNotifications
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}
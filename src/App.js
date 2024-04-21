import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUpEmail from "./components/sign-up-email/SignUpEmail";
import ForgotEmail from "./components/forgot-email/ForgotEmail";
import ForgotMobile from "./components/forgot-mobile/ForgotMobile";
import NewPassword from "./components/new-password/NewPassword";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import SignUpMobile from "./components/sign-up-mobile/SignUpMobile";
import LoginEmail from "./components/login-email/LoginEmail";
import LoginMobile from "./components/login-mobile/LoginMobile";
import Verification from "./components/verification/Verification";
import Cargos from "./components/cargos/Cargos";
import MyCargo from "./components/my-cargo/MyCargo";
import MyTransport from "./components/my-transport/MyTransport";
import Profile from "./components/profile/Profile";
import Notifications from "./components/notifications/Notifications";



const router = createBrowserRouter([
    {
        path: '/',
        element: <SignUpEmail />
    },
    {
        path: '/:lang',
        element: <SignUpEmail />
    },
    {
        path: '/signup-mobile/:lang',
        element: <SignUpMobile />
    },
    {
        path: '/login-email/:lang',
        element: <LoginEmail />
    },
    {
        path: '/login-mobile/:lang',
        element: <LoginMobile />
    },
    {
        path: '/forgot-email/:lang',
        element: <ForgotEmail />
    },
    {
        path: '/forgot-mobile/:lang',
        element: <ForgotMobile />
    },
    {
        path: '/verify/:lang',
        element: <Verification />
    },
    {
        path: '/new-password/:lang',
        element: <NewPassword />
    },
    {
        path: '/main/:lang',
        element: <Cargos />
    },
    {
        path: '/my-cargo/:lang',
        element: <MyCargo />
    },
    {
        path: '/my-transport/:lang',
        element: <MyTransport />
    },
    {
        path: '/profile/:lang',
        element: <Profile />
    },
    {
        path: '/notifications/:lang',
        element: <Notifications />
    },
    {
        path: '*',
        element: <PageNotFound />
    }
])


const App = () => {
    return (
        <>
            <RouterProvider router={router}></RouterProvider>
        </>
    );
};
export default App;

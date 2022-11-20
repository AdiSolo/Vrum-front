import { Route, Routes } from 'react-router-dom';

import NotFound from './Pages/NotFound'
import ClientHome from "./Pages/ClientHome";
import ProviderHome from "./Pages/ProviderHome";
import IndexPage from "./Pages/IndexPage";
import React from "react";
import {Login, RecoverPassword, RegisterClient, RegisterMain, RegisterProvider, UserForgotPassword} from "./Pages/Auth";
import {PrivateRoute} from './PrivateRoute';

export const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<IndexPage />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<RegisterMain />} />
            <Route exact path='/register/client' element={<RegisterClient />} />
            <Route exact path='/register/provider' element={<RegisterProvider />} />
            <Route path='/password/reset/:token/:email' element={<RecoverPassword />} />
            <Route path='/forgot-password' element={<UserForgotPassword />} />

            <Route
                path="/client"
                element={
                    <PrivateRoute isProvider={false}>
                        <ClientHome />
                    </PrivateRoute>
                }
            />
            <Route
                path="/provider"
                element={
                    <PrivateRoute isProvider={true}>
                        <ProviderHome />
                    </PrivateRoute>
                }
            />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
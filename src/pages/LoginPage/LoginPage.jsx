import React, { useEffect } from 'react';
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import Login from '../../layout/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import LoadingAnimation from '../../components/Animation/LoadingAnimation';
import {
  handleTurnOffLoading,
  handleTurnOnLoading,
} from '../../redux/Slice/loadingSlice';

const LoginPage = () => {
  const isLoading = useSelector((state) => state.loadingSlice.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleTurnOnLoading());
    setTimeout(() => {
      dispatch(handleTurnOffLoading());
    }, 2000);
  }, []);

  return (
    <>
      {isLoading && <LoadingAnimation />}
      <Header />
      <Login />
      <Footer />
    </>
  );
};

export default LoginPage;

import React, { useEffect } from 'react';
import SignUp from '../../layout/SignUp/SignUp';
import Footer from '../../layout/Footer/Footer';
import Header from '../../layout/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleTurnOffLoading,
  handleTurnOnLoading,
} from '../../redux/Slice/loadingSlice';
import LoadingAnimation from '../../components/Animation/LoadingAnimation';

const SignUpPage = () => {
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
      <SignUp />
      <Footer />
    </>
  );
};

export default SignUpPage;

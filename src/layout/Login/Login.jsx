import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AlertContext } from '../../App';
import { path } from '../../common/path';
import LoadingAnimation from '../../components/Animation/LoadingAnimation';
import InputText from '../../components/Input/InputText/InputText';
import { handleGetValueUser } from '../../redux/Slice/userSlice';
import { authServ } from '../../services/authServ';
import { saveLocalStorage } from '../../utils/localStorage';
import './Login.scss';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleAlert } = useContext(AlertContext);
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      onSubmit: async (values) => {
        // console.log(values);
        try {
          const res = await authServ.login(values);
          handleAlert('success', res.data.message);
          navigate(path.homepage);
          saveLocalStorage('LOGIN_USER', res.data.data);
          dispatch(handleGetValueUser(res.data.data));
        } catch (err) {
          handleAlert('error', err.response.data.message);
        }
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .required('This field is required')
          .email('Please enter the correct email format'),
        password: Yup.string().required('This field is required'),
      }),
    });

  return (
    <div className="login pt-20 pb-24">
      <Helmet>
        <title>Flynext | Login</title>
      </Helmet>
      <div className="login-title text-center">
        <span className="text-xl font-bold text-[#dcbb87] leading-10">
          Sign In
        </span>
        <h2 className="text-3xl font-bold text-center">
          Login to your account
        </h2>
      </div>
      <div className="flex justify-center items-center mx-auto w-2/5">
        <form onSubmit={handleSubmit} className="space-y-5 w-full">
          <InputText
            label="Email"
            name="email"
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
            placeholder="Please enter email"
            value={values.email}
          />
          <InputText
            label="Password"
            name="password"
            type="password"
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
            placeholder="Please enter a password"
            value={values.password}
            autoComplete="on"
          />
          <div>
            <button type="submit" className="btn-base w-full">
              Login
            </button>
          </div>
        </form>
      </div>
      <div className="flex justify-center mt-10 text-[15px] font-bold max-w-full">
        <p>Not Register Yet?</p>
        <a className="text-[#dcbb87] ml-1 hover:underline" href={path.signup}>
          Create an account
        </a>
      </div>
    </div>
  );
};

export default Login;

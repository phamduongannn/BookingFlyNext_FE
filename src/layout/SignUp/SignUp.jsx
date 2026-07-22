import { DatePicker, Radio, Select } from 'antd';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AlertContext } from '../../App';
import { path } from '../../common/path';
import InputText from '../../components/Input/InputText/InputText';
import { authServ } from '../../services/authServ';
import './SignUp.scss';

const SignUp = () => {
  const navigate = useNavigate();
  const { handleAlert } = useContext(AlertContext);
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      full_name: '',
      email: '',
      password: '',
      gender: 0,
      date_of_birth: '',
      nationality: '',
      cccd: '',
      address: '',
      phone: '',
    },
    onSubmit: async (values) => {
      // console.log(values);
      try {
        const res = await authServ.signUp(values);
        handleAlert('success', res.data.message);
        navigate(path.login);
      } catch (err) {
        handleAlert('error', err.response.data.message);
      }
    },
    validationSchema: Yup.object({
      full_name: Yup.string().required('This field is required'),
      email: Yup.string()
        .required('This field is required')
        .email('Please enter the correct email format'),
      password: Yup.string()
        .required('This field is required')
        .min(6, 'Password must contain at least 6 characters')
        .max(20, 'Password length must not exceed 20 characters')
        .matches(
          /^(?=.*[A-Z])(?=.*\d).+/,
          'Password must contain uppercase letter and number'
        ),
      date_of_birth: Yup.string().required('This field is required'),
      nationality: Yup.string().required('This field is required'),
      cccd: Yup.string()
        .required('This field is required')
        .matches(/^[0-9]+$/, 'Must be a number'),
      address: Yup.string().required('This field is required'),
      phone: Yup.string()
        .required('This field is required')
        .matches(/^[0-9]+$/, 'Must be a number'),
    }),
  });
  return (
    <div className="signup py-20">
      <Helmet>
        <title>Flynext | Login</title>
      </Helmet>
      <div className="signup-title text-center">
        <span className="text-xl font-bold text-[#dcbb87] leading-10">
          Sign Up
        </span>
        <h2 className="text-3xl font-bold text-center">
          Sign up to your account
        </h2>
      </div>
      <div className="signup-content grid grid-cols-1 mx-auto max-w-[700px]">
        <form onSubmit={handleSubmit} className="signup-form space-y-5 w-full">
          <InputText
            label="Full Name"
            name="full_name"
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.full_name}
            touched={touched.full_name}
            placeholder="Please enter full name"
            value={values.full_name}
          />
          <div className="flex items-center justify-between">
            <div>
              <Radio.Group
                onChange={(value) => {
                  setFieldValue('gender', value.target.value);
                }}
              >
                <Radio value={1}>Male</Radio>
                <Radio value={0}>Female</Radio>
              </Radio.Group>
            </div>
            <div>
              <label className="mr-5 font-bold block">Date of Birth:</label>
              <DatePicker
                style={{ width: 250, height: 40 }}
                onChange={(date, dateString) => {
                  setFieldValue('date_of_birth', dateString);
                }}
              />
            </div>
          </div>
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
          <div className="flex items-center justify-between">
            <div>
              <label className="font-bold block">Nationality</label>
              <Select
                className="mt-2"
                defaultValue={'Select country'}
                style={{ width: 250, height: 40 }}
                onChange={(value, countries) => {
                  setFieldValue('nationality', countries.label);
                }}
                options={countries}
              />
            </div>
            <div>
              <InputText
                label="Citizen ID number"
                name="cccd"
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors.cccd}
                touched={touched.cccd}
                placeholder="Please enter citizen ID number"
                value={values.cccd}
              />
            </div>
            <div>
              <InputText
                label="Phone"
                name="phone"
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors.phone}
                touched={touched.phone}
                placeholder="Please enter phone number"
                value={values.phone}
              />
            </div>
          </div>
          <InputText
            label="Address"
            name="address"
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.address}
            touched={touched.address}
            placeholder="Please enter address"
            value={values.address}
          />
          <div className="sign-up-check text-center">
            <p>
              Make sure you have confirm that you've read and accept our
              <span> Policy</span> and <span>Privacy</span>
            </p>
            <p>
              Please check that you have filled out the registration form
              because <br /> it will be the data for you to book tickets.
            </p>
          </div>
          <div>
            <button type="submit" className="btn-base w-full">
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <div className="flex justify-center mt-10 text-[15px] font-bold">
        <p>Already Have An Account?</p>
        <a className="text-[#dcbb87] ml-1 hover:underline" href={path.login}>
          Sign In
        </a>
      </div>
    </div>
  );
};

export default SignUp;

const countries = [
  { value: 'AF', label: 'Afghanistan' },
  { value: 'AX', label: 'Åland Islands' },
  { value: 'AL', label: 'Albania' },
  { value: 'DZ', label: 'Algeria' },
  { value: 'AS', label: 'American Samoa' },
  { value: 'AD', label: 'Andorra' },
  { value: 'AO', label: 'Angola' },
  { value: 'AI', label: 'Anguilla' },
  { value: 'AQ', label: 'Antarctica' },
  { value: 'AG', label: 'Antigua and Barbuda' },
  { value: 'AR', label: 'Argentina' },
  { value: 'AM', label: 'Armenia' },
  { value: 'AW', label: 'Aruba' },
  { value: 'AU', label: 'Australia' },
  { value: 'AT', label: 'Austria' },
  { value: 'AZ', label: 'Azerbaijan' },
  { value: 'BS', label: 'Bahamas' },
  { value: 'BH', label: 'Bahrain' },
  { value: 'BD', label: 'Bangladesh' },
  { value: 'BB', label: 'Barbados' },
  { value: 'BY', label: 'Belarus' },
  { value: 'BE', label: 'Belgium' },
  { value: 'BZ', label: 'Belize' },
  { value: 'BJ', label: 'Benin' },
  { value: 'BM', label: 'Bermuda' },
  { value: 'BT', label: 'Bhutan' },
  { value: 'BO', label: 'Bolivia (Plurinational State of)' },
  { value: 'BQ', label: 'Bonaire, Sint Eustatius and Saba' },
  { value: 'BA', label: 'Bosnia and Herzegovina' },
  { value: 'BW', label: 'Botswana' },
  { value: 'BV', label: 'Bouvet Island' },
  { value: 'BR', label: 'Brazil' },
  { value: 'IO', label: 'British Indian Ocean Territory' },
  { value: 'BN', label: 'Brunei Darussalam' },
  { value: 'BG', label: 'Bulgaria' },
  { value: 'BF', label: 'Burkina Faso' },
  { value: 'BI', label: 'Burundi' },
  { value: 'CV', label: 'Cabo Verde' },
  { value: 'KH', label: 'Cambodia' },
  { value: 'CM', label: 'Cameroon' },
  { value: 'CA', label: 'Canada' },
  { value: 'KY', label: 'Cayman Islands' },
  { value: 'CF', label: 'Central African Republic' },
  { value: 'TD', label: 'Chad' },
  { value: 'CL', label: 'Chile' },
  { value: 'CN', label: 'China' },
  { value: 'CX', label: 'Christmas Island' },
  { value: 'CC', label: 'Cocos (Keeling) Islands' },
  { value: 'CO', label: 'Colombia' },
  { value: 'KM', label: 'Comoros' },
  { value: 'CG', label: 'Congo' },
  { value: 'CD', label: 'Congo (Democratic Republic of the)' },
  { value: 'CK', label: 'Cook Islands' },
  { value: 'CR', label: 'Costa Rica' },
  { value: 'HR', label: 'Croatia' },
  { value: 'CU', label: 'Cuba' },
  { value: 'CW', label: 'Curaçao' },
  { value: 'CY', label: 'Cyprus' },
  { value: 'CZ', label: 'Czech Republic' },
  { value: 'DK', label: 'Denmark' },
  { value: 'DJ', label: 'Djibouti' },
  { value: 'DM', label: 'Dominica' },
  { value: 'DO', label: 'Dominican Republic' },
  { value: 'EC', label: 'Ecuador' },
  { value: 'EG', label: 'Egypt' },
  { value: 'SV', label: 'El Salvador' },
  { value: 'GQ', label: 'Equatorial Guinea' },
  { value: 'ER', label: 'Eritrea' },
  { value: 'EE', label: 'Estonia' },
  { value: 'ET', label: 'Ethiopia' },
  { value: 'FK', label: 'Falkland Islands (Malvinas)' },
  { value: 'FO', label: 'Faroe Islands' },
  { value: 'FJ', label: 'Fiji' },
  { value: 'FI', label: 'Finland' },
  { value: 'FR', label: 'France' },
  { value: 'GF', label: 'French Guiana' },
  { value: 'PF', label: 'French Polynesia' },
  { value: 'TF', label: 'French Southern Territories' },
  { value: 'GA', label: 'Gabon' },
  { value: 'GM', label: 'Gambia' },
  { value: 'GE', label: 'Georgia' },
  { value: 'DE', label: 'Germany' },
  { value: 'GH', label: 'Ghana' },
  { value: 'GI', label: 'Gibraltar' },
  { value: 'GR', label: 'Greece' },
  { value: 'GL', label: 'Greenland' },
  { value: 'GD', label: 'Grenada' },
  { value: 'GP', label: 'Guadeloupe' },
  { value: 'GU', label: 'Guam' },
  { value: 'GT', label: 'Guatemala' },
  { value: 'GG', label: 'Guernsey' },
  { value: 'GN', label: 'Guinea' },
  { value: 'GW', label: 'Guinea-Bissau' },
  { value: 'GY', label: 'Guyana' },
  { value: 'HT', label: 'Haiti' },
  { value: 'HM', label: 'Heard Island and McDonald Islands' },
  { value: 'VA', label: 'Holy See' },
  { value: 'HN', label: 'Honduras' },
  { value: 'HK', label: 'Hong Kong' },
  { value: 'HU', label: 'Hungary' },
  { value: 'IS', label: 'Iceland' },
  { value: 'IN', label: 'India' },
  { value: 'ID', label: 'Indonesia' },
  { value: 'IR', label: 'Iran (Islamic Republic of)' },
  { value: 'IQ', label: 'Iraq' },
  { value: 'IE', label: 'Ireland' },
  { value: 'IM', label: 'Isle of Man' },
  { value: 'IL', label: 'Israel' },
  { value: 'IT', label: 'Italy' },
  { value: 'JM', label: 'Jamaica' },
  { value: 'JP', label: 'Japan' },
  { value: 'JE', label: 'Jersey' },
  { value: 'JO', label: 'Jordan' },
  { value: 'KZ', label: 'Kazakhstan' },
  { value: 'KE', label: 'Kenya' },
  { value: 'KI', label: 'Kiribati' },
  { value: 'KP', label: "Korea (Democratic People's Republic of)" },
  { value: 'KR', label: 'Korea (Republic of)' },
  { value: 'KW', label: 'Kuwait' },
  { value: 'KG', label: 'Kyrgyzstan' },
  { value: 'LA', label: "Lao People's Democratic Republic" },
  { value: 'LV', label: 'Latvia' },
  { value: 'LB', label: 'Lebanon' },
  { value: 'LS', label: 'Lesotho' },
  { value: 'LR', label: 'Liberia' },
  { value: 'LY', label: 'Libya' },
  { value: 'LI', label: 'Liechtenstein' },
  { value: 'LT', label: 'Lithuania' },
  { value: 'LU', label: 'Luxembourg' },
  { value: 'MO', label: 'Macao' },
  { value: 'MK', label: 'Macedonia (the former Yugoslav Republic of)' },
  { value: 'MG', label: 'Madagascar' },
  { value: 'MW', label: 'Malawi' },
  { value: 'MY', label: 'Malaysia' },
  { value: 'MV', label: 'Maldives' },
  { value: 'ML', label: 'Mali' },
  { value: 'MT', label: 'Malta' },
  { value: 'MH', label: 'Marshall Islands' },
  { value: 'MQ', label: 'Martinique' },
  { value: 'MR', label: 'Mauritania' },
  { value: 'MU', label: 'Mauritius' },
  { value: 'YT', label: 'Mayotte' },
  { value: 'MX', label: 'Mexico' },
  { value: 'FM', label: 'Micronesia (Federated States of)' },
  { value: 'MD', label: 'Moldova (Republic of)' },
  { value: 'MC', label: 'Monaco' },
  { value: 'MN', label: 'Mongolia' },
  { value: 'ME', label: 'Montenegro' },
  { value: 'MS', label: 'Montserrat' },
  { value: 'MA', label: 'Morocco' },
  { value: 'MZ', label: 'Mozambique' },
  { value: 'MM', label: 'Myanmar' },
  { value: 'NA', label: 'Namibia' },
  { value: 'NR', label: 'Nauru' },
  { value: 'NP', label: 'Nepal' },
  { value: 'NL', label: 'Netherlands' },
  { value: 'NC', label: 'New Caledonia' },
  { value: 'NZ', label: 'New Zealand' },
  { value: 'NI', label: 'Nicaragua' },
  { value: 'NE', label: 'Niger' },
  { value: 'NG', label: 'Nigeria' },
  { value: 'NU', label: 'Niue' },
  { value: 'NF', label: 'Norfolk Island' },
  { value: 'MP', label: 'Northern Mariana Islands' },
  { value: 'NO', label: 'Norway' },
  { value: 'OM', label: 'Oman' },
  { value: 'PK', label: 'Pakistan' },
  { value: 'PW', label: 'Palau' },
  { value: 'PS', label: 'Palestine, State of' },
  { value: 'PA', label: 'Panama' },
  { value: 'PG', label: 'Papua New Guinea' },
  { value: 'PY', label: 'Paraguay' },
  { value: 'PE', label: 'Peru' },
  { value: 'PH', label: 'Philippines' },
  { value: 'PN', label: 'Pitcairn' },
  { value: 'PL', label: 'Poland' },
  { value: 'PT', label: 'Portugal' },
  { value: 'PR', label: 'Puerto Rico' },
  { value: 'QA', label: 'Qatar' },
  { value: 'RE', label: 'Réunion' },
  { value: 'RO', label: 'Romania' },
  { value: 'RU', label: 'Russian Federation' },
  { value: 'RW', label: 'Rwanda' },
  { value: 'BL', label: 'Saint Barthélemy' },
  { value: 'SH', label: 'Saint Helena, Ascension and Tristan da Cunha' },
  { value: 'KN', label: 'Saint Kitts and Nevis' },
  { value: 'LC', label: 'Saint Lucia' },
  { value: 'MF', label: 'Saint Martin (French part)' },
  { value: 'PM', label: 'Saint Pierre and Miquelon' },
  { value: 'VC', label: 'Saint Vincent and the Grenadines' },
  { value: 'WS', label: 'Samoa' },
  { value: 'SM', label: 'San Marino' },
  { value: 'ST', label: 'Sao Tome and Principe' },
  { value: 'SA', label: 'Saudi Arabia' },
  { value: 'SN', label: 'Senegal' },
  { value: 'RS', label: 'Serbia' },
  { value: 'SC', label: 'Seychelles' },
  { value: 'SL', label: 'Sierra Leone' },
  { value: 'SG', label: 'Singapore' },
  { value: 'SX', label: 'Sint Maarten (Dutch part)' },
  { value: 'SK', label: 'Slovakia' },
  { value: 'SI', label: 'Slovenia' },
  { value: 'SB', label: 'Solomon Islands' },
  { value: 'SO', label: 'Somalia' },
  { value: 'ZA', label: 'South Africa' },
  { value: 'GS', label: 'South Georgia and the South Sandwich Islands' },
  { value: 'SS', label: 'South Sudan' },
  { value: 'ES', label: 'Spain' },
  { value: 'LK', label: 'Sri Lanka' },
  { value: 'SD', label: 'Sudan' },
  { value: 'SR', label: 'Suriname' },
  { value: 'SJ', label: 'Svalbard and Jan Mayen' },
  { value: 'SZ', label: 'Swaziland' },
  { value: 'SE', label: 'Sweden' },
  { value: 'CH', label: 'Switzerland' },
  { value: 'SY', label: 'Syrian Arab Republic' },
  { value: 'TW', label: 'Taiwan, Province of China' },
  { value: 'TJ', label: 'Tajikistan' },
  { value: 'TZ', label: 'Tanzania, United Republic of' },
  { value: 'TH', label: 'Thailand' },
  { value: 'TL', label: 'Timor-Leste' },
  { value: 'TG', label: 'Togo' },
  { value: 'TK', label: 'Tokelau' },
  { value: 'TO', label: 'Tonga' },
  { value: 'TT', label: 'Trinidad and Tobago' },
  { value: 'TN', label: 'Tunisia' },
  { value: 'TR', label: 'Turkey' },
  { value: 'TM', label: 'Turkmenistan' },
  { value: 'TC', label: 'Turks and Caicos Islands' },
  { value: 'TV', label: 'Tuvalu' },
  { value: 'UG', label: 'Uganda' },
  { value: 'UA', label: 'Ukraine' },
  { value: 'AE', label: 'United Arab Emirates' },
  {
    value: 'GB',
    label: 'United Kingdom of Great Britain and Northern Ireland',
  },
  { value: 'US', label: 'United States of America' },
  { value: 'UM', label: 'United States Minor Outlying Islands' },
  { value: 'UY', label: 'Uruguay' },
  { value: 'UZ', label: 'Uzbekistan' },
  { value: 'VU', label: 'Vanuatu' },
  { value: 'VE', label: 'Venezuela (Bolivarian Republic of)' },
  { value: 'VN', label: 'Viet Nam' },
  { value: 'VG', label: 'Virgin Islands (British)' },
  { value: 'VI', label: 'Virgin Islands (U.S.)' },
  { value: 'WF', label: 'Wallis and Futuna' },
  { value: 'EH', label: 'Western Sahara' },
  { value: 'YE', label: 'Yemen' },
  { value: 'ZM', label: 'Zambia' },
  { value: 'ZW', label: 'Zimbabwe' },
];

import { DatePicker, Select } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { AlertContext } from '../../../App';
import InputText from '../../../components/Input/InputText/InputText';
import { airportServ } from '../../../services/airportServ';
import { flightServ } from '../../../services/flightServ';
import './AddFlight.scss';

const AddFlight = () => {
  const [airports, setAirports] = useState([]);
  const { handleAlert } = useContext(AlertContext);
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      flight_number: '',
      departure_airport_id: 0,
      arrival_airport_id: 0,
      departure_time: '',
      arrival_time: '',
      price: 0,
    },
    onSubmit: async (values) => {
      // console.log(values);
      try {
        const res = await flightServ.addFlight(values);
        handleAlert('success', res.data.message);
        resetForm();
      } catch (err) {
        handleAlert('error', err.response.data.message);
      }
    },
    validationSchema: Yup.object({
      flight_number: Yup.string().required('This field is required'),
      departure_airport_id: Yup.number().required('This field is required'),
      arrival_airport_id: Yup.number().required('This field is required'),
      departure_time: Yup.string().required('This field is required'),
      arrival_time: Yup.string().required('This field is required'),
    }),
  });
  useEffect(() => {
    airportServ.getAllAirports().then((res) => {
      setAirports(res.data.data);
    });
  }, []);

  return (
    <div className="addFlight">
      <h3 className="text-center font-bold text-2xl">
        Welcome to your Flight Management
      </h3>
      <div className="addFlight-body grid grid-cols-2 gap-5 items-center">
        <form
          onSubmit={handleSubmit}
          className="addFlight-form w-full col-span-2 grid grid-cols-2 gap-4 mt-5 items-center"
        >
          <div>
            <label className="font-bold block mb-2">Airlines</label>
            <Select
              allowClear
              placeholder={'Select airline'}
              style={{ width: '100%', height: 40 }}
              onChange={(value, airline) => {
                setFieldValue('flight_number', value);
              }}
              options={airlines}
            />
          </div>
          <InputText
            label="Price"
            name="price"
            placeholder="Enter price"
            onBlur={handleBlur}
            error={errors.price}
            touched={touched.price}
            handleChange={(e) => {
              setFieldValue('price', parseFloat(e.target.value));
            }}
          />
          <div>
            <label className="font-bold block mb-2">Departure Airport</label>
            <Select
              allowClear
              placeholder={'Select departure airport'}
              style={{ width: '100%', height: 40 }}
              onChange={(value, airline) => {
                setFieldValue('departure_airport_id', value);
              }}
              options={airports.map((airport) => ({
                value: airport.airport_id,
                label: airport.airport_name,
              }))}
            />
          </div>
          <div>
            <label className="font-bold block mb-2">Arrival Airport</label>
            <Select
              allowClear
              placeholder={'Select departure airport'}
              style={{ width: '100%', height: 40 }}
              onChange={(value, airline) => {
                setFieldValue('arrival_airport_id', value);
              }}
              options={airports.map((airport) => ({
                value: airport.airport_id,
                label: airport.airport_name,
              }))}
            />
          </div>
          <div>
            <label className="mr-5 font-bold block">Departure Time</label>
            <DatePicker
              showTime
              format={'YYYY-MM-DD HH:mm:ss'}
              style={{ width: '100%', height: 40 }}
              onChange={(date, dateString) => {
                setFieldValue(
                  'departure_time',
                  moment.utc(dateString).format()
                );
              }}
              disabledDate={(current) => {
                return current && current < moment().startOf('day');
              }}
            />
            {touched.departure_time && errors.departure_time && (
              <p className="text-red-500 text-sm">{errors.departure_time}</p>
            )}
          </div>
          <div>
            <label className="mr-5 font-bold block">Arrival Time</label>
            <DatePicker
              showTime
              format={'YYYY-MM-DD HH:mm:ss'}
              style={{ width: '100%', height: 40 }}
              onChange={(date, dateString) => {
                setFieldValue('arrival_time', moment.utc(dateString).format());
              }}
              disabledDate={(current) => {
                return current && current < moment().startOf('day');
              }}
            />
            {touched.arrival_time && errors.arrival_time && (
              <p className="text-red-500 text-sm">{errors.arrival_time}</p>
            )}
          </div>
          <div className="col-span-2">
            <button type="submit" className="btn-base w-full">
              Create Flight
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFlight;

const airlines = [
  {
    value: 'VN',
    label: 'Vietnam Airlines',
  },
  {
    value: 'VJ',
    label: 'VietJet Air',
  },
  {
    value: 'QH',
    label: 'Bamboo Airways',
  },
  {
    value: 'VU',
    label: 'Vietravel Airlines',
  },
  {
    value: 'BL',
    label: 'Pacific Airlines',
  },
];

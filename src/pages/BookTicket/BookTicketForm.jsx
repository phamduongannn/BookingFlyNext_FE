import { DatePicker } from 'antd';
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ticketServ } from '../../services/ticketServ';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';
import { AlertContext } from '../../App';
import { setStep } from '../../redux/Slice/ticketSlice';

const BookTicketForm = ({
  adults,
  children,
  infants,
  selectedFlight,
  selectedDepartureFlight,
  selectedReturnFlight,
  ticketClassLabel,
  ticketType,
  user_id,
}) => {
  const { handleAlert } = useContext(AlertContext);

  const dispatch = useDispatch();

  const { total_price } = useSelector((state) => state.ticketSlice);

  const [formData, setFormData] = useState({
    adults: Array.from({ length: adults }, () => ({
      passenger_name: '',
      gender: '1',
      date_of_birth: '',
      passport_number: '',
    })),
    children: Array.from({ length: children }, () => ({
      passenger_name: '',
      gender: '1',
      date_of_birth: '',
      passport_number: '',
    })),
    infants: Array.from({ length: infants }, () => ({
      passenger_name: '',
      gender: '1',
      date_of_birth: '',
      passport_number: '',
    })),
  });

  const handleChange = (type, index, field, value) => {
    setFormData((prev) => {
      const updatedType = [...prev[type]];
      updatedType[index] = { ...updatedType[index], [field]: value };
      return { ...prev, [type]: updatedType };
    });
  };

  const handleDateChange = (type, index, dateString) => {
    handleChange(type, index, 'date_of_birth', dateString);
  };

  const resetForm = () => {
    setFormData({
      adults: Array.from({ length: adults }, () => ({
        passenger_name: '',
        gender: '1',
        date_of_birth: '',
        passport_number: '',
      })),
      children: Array.from({ length: children }, () => ({
        passenger_name: '',
        gender: '1',
        date_of_birth: '',
        passport_number: '',
      })),
      infants: Array.from({ length: infants }, () => ({
        passenger_name: '',
        gender: '1',
        date_of_birth: '',
        passport_number: '',
      })),
    });
  };

  const createPassengerInputs = (type, count) => {
    return Array.from({ length: count }).map((_, index) => (
      <div key={`${type}-${index}`} className="flex flex-col gap-[20px]">
        <div className="flex gap-[16px] items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={26}
            height={26}
            viewBox="0 0 26 26"
            fill="none"
          >
            <path
              d="M3 20C5.33579 17.5226 8.50702 16 12 16C15.493 16 18.6642 17.5226 21 20M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
              stroke="#dcbb87"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex flex-col gap-[2px]">
            <label className="text-base font-bold">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
            <p className="text-[14px] font-normal text-[#475467]">
              Passenger {index + 1}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-[16px] border-b-[1px] py-5">
          <div className="relative">
            <label htmlFor="" className="Input-input-group">
              <select
                className="font-normal text-[16px] w-full text-[#dcbb87]"
                onChange={(e) =>
                  handleChange(type, index, 'gender', e.target.value)
                }
              >
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
              <label htmlFor="" className="text-sm">
                Gender
              </label>
            </label>
          </div>
          <div>
            <label htmlFor="" className="Input-input-group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3 20C5.33579 17.5226 8.50702 16 12 16C15.493 16 18.6642 17.5226 21 20M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
                  stroke="#dcbb87"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                autoComplete="on"
                placeholder="Please enter your full name"
                className="font-normal text-[16px]"
                onChange={(e) =>
                  handleChange(type, index, 'passenger_name', e.target.value)
                }
              />
              <label htmlFor="" className="text-sm">
                Full name
              </label>
            </label>
          </div>
          <div>
            <label htmlFor="" className="Input-input-group">
              <DatePicker
                style={{ width: '100%' }}
                format={'DD-MM-YYYY'}
                onChange={(date, dateString) => {
                  const dateFormatted = moment
                    .utc(dateString, 'DD-MM-YYYY')
                    .format('YYYY-MM-DD');
                  handleDateChange(type, index, dateFormatted);
                }}
              />
              <label htmlFor="" className="text-sm">
                Date of birth
              </label>
            </label>
          </div>
          {type === 'adults' && (
            <div>
              <label htmlFor="" className="Input-input-group">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6V19C4 20.6569 5.34315 22 7 22H17C18.6569 22 20 20.6569 20 19V14M4 6V5M4 6H17C18.6569 6 20 7.34315 20 9V10"
                    stroke="#dcbb87"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13C15 14.6569 13.6569 16 12 16"
                    stroke="#dcbb87"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M18 6.00002V6.75002H18.75V6.00002H18ZM15.7172 2.32614L15.6111 1.58368L15.7172 2.32614ZM4.91959 3.86865L4.81353 3.12619H4.81353L4.91959 3.86865ZM5.07107 6.75002H18V5.25002H5.07107V6.75002ZM18.75 6.00002V4.30604H17.25V6.00002H18.75ZM15.6111 1.58368L4.81353 3.12619L5.02566 4.61111L15.8232 3.0686L15.6111 1.58368ZM4.81353 3.12619C3.91638 3.25435 3.25 4.0227 3.25 4.92895H4.75C4.75 4.76917 4.86749 4.63371 5.02566 4.61111L4.81353 3.12619ZM18.75 4.30604C18.75 2.63253 17.2678 1.34701 15.6111 1.58368L15.8232 3.0686C16.5763 2.96103 17.25 3.54535 17.25 4.30604H18.75ZM5.07107 5.25002C4.89375 5.25002 4.75 5.10627 4.75 4.92895H3.25C3.25 5.9347 4.06532 6.75002 5.07107 6.75002V5.25002Z"
                    fill="#dcbb87"
                  />
                  <path
                    d="M10 19H14"
                    stroke="#dcbb87"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  type="text"
                  autoComplete="on"
                  placeholder="Please enter your passport number"
                  className="font-normal text-[16px]"
                  onChange={(e) =>
                    handleChange(
                      'adults',
                      index,
                      'passport_number',
                      e.target.value
                    )
                  }
                />
                <label htmlFor="" className="text-sm">
                  Passport or identification
                </label>
              </label>
            </div>
          )}
        </div>
      </div>
    ));
  };

  const validateForm = () => {
    const allPassengers = [
      ...formData.adults,
      ...formData.children,
      ...formData.infants,
    ];
    for (let passenger of allPassengers) {
      if (
        !passenger.passenger_name ||
        !passenger.gender ||
        !passenger.date_of_birth ||
        (passenger.type === 'adult' && !passenger.passport_number)
      ) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      handleAlert('error', 'Please fill in all required fields.');
      return;
    }

    let payload;
    if (ticketType === 'one-way') {
      payload = {
        flight_id: selectedFlight?.flight_id,
        user_id: user_id,
        ticket_class: ticketClassLabel,
        total_price,
        created_at: new Date(),
        passengers: [
          ...formData.adults.map((adult) => ({ ...adult, type: 'adult' })),
          ...formData.children.map((child) => ({ ...child, type: 'children' })),
          ...formData.infants.map((infant) => ({ ...infant, type: 'infant' })),
        ],
      };
      try {
        const response = await ticketServ.createTicket(payload);
        handleAlert('success', response.data.message);
        resetForm();
      } catch (error) {
        handleAlert('error', response.data.message);
      }
    } else if (ticketType === 'round-trip') {
      const payloadDeparture = {
        flight_id: selectedDepartureFlight?.flight_id,
        user_id: user_id,
        ticket_class: ticketClassLabel,
        total_price,
        created_at: new Date(),
        passengers: [
          ...formData.adults.map((adult) => ({ ...adult, type: 'adult' })),
          ...formData.children.map((child) => ({ ...child, type: 'children' })),
          ...formData.infants.map((infant) => ({ ...infant, type: 'infant' })),
        ],
      };
      const payloadReturn = {
        flight_id: selectedReturnFlight?.flight_id,
        user_id: user_id,
        ticket_class: ticketClassLabel,
        total_price,
        created_at: new Date(),
        passengers: [
          ...formData.adults.map((adult) => ({ ...adult, type: 'adult' })),
          ...formData.children.map((child) => ({ ...child, type: 'children' })),
          ...formData.infants.map((infant) => ({ ...infant, type: 'infant' })),
        ],
      };
      try {
        const responseDeparture = await ticketServ.createTicket(
          payloadDeparture
        );
        handleAlert('success', responseDeparture.data.message);
        const responseReturn = await ticketServ.createTicket(payloadReturn);
        handleAlert('success', responseReturn.data.message);
        resetForm();
      } catch (error) {
        handleAlert('error', error);
      }
    }
  };

  return (
    <>
      <div className="customer-info">
        <div className="customer-info-header">
          <div className="customer-info-title">Passenger information</div>
          <p className="text-[14px] leading-5 font-normal text-red-500">
            * Please use Vietnamese without accents and do not use special
            characters.
            <br />* Please enter the passenger's full name and other information
            that appears on the passenger's government-issued identification
            document(s).
          </p>
        </div>
        <div className="customer-info-content">
          {createPassengerInputs('adults', adults)}
          {createPassengerInputs('children', children)}
          {createPassengerInputs('infants', infants)}
        </div>
      </div>
      <div className="customer-info-footer w-full flex justify-end items-center">
        <button
          type="button"
          className="btn-base"
          onClick={() => {
            handleSubmit();
            if (validateForm()) {
              dispatch(setStep(2));
            }
          }}
        >
          Next{' '}
        </button>
      </div>
    </>
  );
};

export default BookTicketForm;

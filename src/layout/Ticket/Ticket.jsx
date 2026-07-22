import { DatePicker, Radio, Select } from 'antd';
import moment from 'moment';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { airportServ } from '../../services/airportServ';
import './Ticket.scss';
import { AlertContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const Ticket = () => {
  const [ticketType, setTicketType] = useState('one-way');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [departureId, setDepartureId] = useState('');
  const [destinationId, setDestinationId] = useState('');
  const [ticketClass, setTicketClass] = useState('economy');
  const [ticketClassLabel, setTicketClassLabel] = useState('Economy Class');
  const [dateStringOnly, setDateStringOnly] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const [departureValue, setDepartureValue] = useState('');
  const [destinationValue, setDestinationValue] = useState('');
  const [departureOptions, setDepartureOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDepartureDropdown, setShowDepartureDropdown] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);

  const { handleAlert } = useContext(AlertContext);

  const handleChange = (e) => {
    setTicketType(e.target.value);
  };
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const increase = (setter, value = 1, maxValue = 10) => {
    if (maxValue === undefined || value < maxValue) {
      setter(value + 1);
    }
  };

  const decrease = (setter, value) => {
    if (value > 0) {
      setter(value - 1);
    }
  };
  const totalPassengers = adults + children + infants;

  const handleDepartureChange = async (event) => {
    const value = event.target.value;
    setDepartureValue(value);

    if (value) {
      try {
        const response = await airportServ.getAirportByName(value);
        const airports = response.data.data;
        const newOptions = airports.map((airport) => ({
          text: airport.airport_name,
          id: airport.airport_id,
        }));
        setDepartureOptions(newOptions);
        setShowDepartureDropdown(newOptions.length > 0);
      } catch (error) {
        // console.error('Error fetching airports:', error);
      }
    } else {
      setDepartureOptions([]);
      setShowDepartureDropdown(false);
    }
  };

  const handleDestinationChange = async (event) => {
    const value = event.target.value;
    setDestinationValue(value);

    if (value) {
      try {
        const response = await airportServ.getAirportByName(value);
        const airports = response.data.data;
        const newOptions = airports.map((airport) => ({
          text: airport.airport_name,
          id: airport.airport_id,
        }));
        setDestinationOptions(newOptions);
        setShowDestinationDropdown(newOptions.length > 0);
      } catch (error) {
        // console.error('Error fetching airports:', error);
      }
    } else {
      setDestinationOptions([]);
      setShowDestinationDropdown(false);
    }
  };

  const handleDepartureOptionClick = (option) => {
    setDepartureValue(option.text);
    setDepartureId(option.id);
    setShowDepartureDropdown(false);
  };

  const handleDestinationOptionClick = (option) => {
    setDestinationValue(option.text);
    setDestinationId(option.id);
    setShowDestinationDropdown(false);
  };

  const navigate = useNavigate();
  const handleBookTicket = () => {
    if (!departureValue || !destinationValue) {
      handleAlert('error', 'Please fill in all required fields');
      return;
    }

    if (ticketType === 'one-way') {
      if (!dateStringOnly) {
        handleAlert('error', 'Please select the departure date');
        return;
      }
    } else if (ticketType === 'round-trip') {
      if (dateRange.length !== 2) {
        handleAlert('error', 'Please select both departure and return dates');
        return;
      }
    }

    navigate(`/book-ticket`, {
      state: {
        ticketType,
        airportDeparture: departureValue,
        airportDestination: destinationValue,
        departureId,
        destinationId,
        dateStringOnly: ticketType === 'one-way' ? dateStringOnly : null,
        departureDate: ticketType === 'round-trip' ? dateRange[0] : null,
        destinationDate: ticketType === 'round-trip' ? dateRange[1] : null,
        ticketClass,
        ticketClassLabel,
        totalPassengers,
        adults,
        children,
        infants,
      },
    });
  };
  return (
    <section
      className="ticket flex flex-col justify-center gap-10 my-10 mb-20 mt-20 mx-auto"
      data-aos="fade-up"
      data-aos-duration="3000"
      data-aos-offset="500"
    >
      <div className="ticket-title flex flex-col gap-4">
        <h4 className="ticket-sub-title text-center">
          Fly to Your Next Adventure - Fly<span>next</span>
        </h4>
        <p className="ticket-sub-title-child text-center font-semibold">
          Flynext - Set foot on top of the clouds with one jump
        </p>
      </div>
      <div className="ticket-radio flex gap-4">
        <Radio.Group onChange={handleChange} value={ticketType}>
          <Radio value="one-way">One-way</Radio>
          <Radio value="round-trip">Round-trip</Radio>
        </Radio.Group>
      </div>
      <div className="ticket-distance">
        <div className="selectInput relative">
          <div>
            <label htmlFor="" className="Input-input-group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M19.1667 7.76666C19.2189 7.55255 19.1891 7.32665 19.0833 7.13333C18.8133 6.6647 18.4533 6.25401 18.0241 5.92483C17.5949 5.59565 17.105 5.35445 16.5824 5.21509C16.0597 5.07572 15.5147 5.04093 14.9786 5.1127C14.4425 5.18447 13.9259 5.3614 13.4583 5.63333L11.6667 6.66666L7.49999 4.70833C7.38154 4.64696 7.25007 4.61493 7.11666 4.61493C6.98325 4.61493 6.85179 4.64696 6.73333 4.70833L4.23333 6.15C4.10978 6.22126 4.00659 6.32305 3.93363 6.44561C3.86068 6.56818 3.8204 6.70741 3.81666 6.85C3.81263 6.99364 3.8458 7.13588 3.91297 7.26292C3.98014 7.38995 4.07901 7.49746 4.2 7.575L6.95 9.30833L5.49999 10.1417L1.51666 10.625C1.35653 10.6448 1.2056 10.7107 1.08218 10.8146C0.958764 10.9185 0.868172 11.0561 0.821404 11.2105C0.774636 11.3649 0.773703 11.5296 0.818719 11.6845C0.863735 11.8395 0.952763 11.978 1.07499 12.0833L4.02499 14.6333C4.41337 15.004 4.91075 15.2398 5.44353 15.3058C5.97632 15.3719 6.51621 15.2646 6.98333 15L18.75 8.275C18.8503 8.22294 18.9389 8.15103 19.0106 8.06365C19.0822 7.97626 19.1353 7.87522 19.1667 7.76666ZM6.22499 13.6C6.06492 13.6881 5.88033 13.7211 5.69964 13.694C5.51896 13.6669 5.35218 13.5812 5.225 13.45L3.64166 12.0917L5.91666 11.8167C6.02846 11.8023 6.13619 11.7655 6.23333 11.7083L9.03333 10.1C9.15807 10.028 9.26202 9.9249 9.33505 9.80076C9.40807 9.67662 9.44768 9.53567 9.45 9.39166C9.4517 9.24864 9.41657 9.10758 9.34798 8.98206C9.27938 8.85654 9.17963 8.7508 9.05833 8.675L6.30833 6.93333L7.225 6.40833L11.3917 8.34166C11.5101 8.40303 11.6416 8.43506 11.775 8.43506C11.9084 8.43506 12.0399 8.40303 12.1583 8.34166L14.2917 7.10833C14.7288 6.86333 15.2295 6.75538 15.7288 6.79847C16.2281 6.84156 16.7029 7.03371 17.0917 7.35L6.22499 13.6Z"
                  fill="#98A2B3"
                />
              </svg>
              <input
                type="text"
                autoComplete="on"
                placeholder="Please enter your Departure point"
                className="font-normal text-[16px]"
                value={departureValue}
                onChange={handleDepartureChange}
                onFocus={() =>
                  setShowDepartureDropdown(departureOptions.length > 0)
                }
                onBlur={() =>
                  setTimeout(() => setShowDepartureDropdown(false), 100)
                }
              />

              <label htmlFor="" className="text-sm">
                Departure point
              </label>
            </label>
          </div>
          {showDepartureDropdown && (
            <ul className="dropdown absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 overflow-y-auto max-h-[200px]">
              {departureOptions.map((option, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onMouseDown={() => handleDepartureOptionClick(option)}
                >
                  {option.text}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="selectInput relative">
          <div>
            <label htmlFor="" className="Input-input-group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M17.6 13.525C17.3129 12.4729 16.6248 11.5754 15.6833 11.025L13.925 9.99997L13.525 5.44164C13.514 5.3085 13.4712 5.17995 13.4001 5.06682C13.3291 4.9537 13.2318 4.85932 13.1167 4.79164L10.6167 3.3583C10.49 3.28516 10.3463 3.24666 10.2 3.24666C10.0537 3.24666 9.91001 3.28516 9.78333 3.3583C9.65667 3.42747 9.55015 3.52835 9.47419 3.65106C9.39822 3.77376 9.35543 3.91409 9.35 4.0583L9.225 7.3083L7.76666 6.47497L5.38333 3.26664C5.28642 3.13805 5.15432 3.04029 5.00303 2.98519C4.85173 2.93009 4.68771 2.92 4.5308 2.95614C4.37389 2.99228 4.23081 3.07311 4.11886 3.18885C4.00691 3.30459 3.93089 3.45028 3.9 3.6083L3.175 7.44997C3.04874 7.97076 3.09316 8.51834 3.30171 9.01196C3.51027 9.50559 3.87191 9.91914 4.33333 10.1916L16.05 16.95C16.2383 17.0608 16.4626 17.0931 16.6746 17.0401C16.8866 16.9871 17.0693 16.853 17.1833 16.6666C17.4582 16.197 17.6366 15.6772 17.7082 15.1378C17.7797 14.5983 17.7429 14.05 17.6 13.525ZM16.0333 15L5.16666 8.74997C5.01083 8.65485 4.89056 8.51118 4.82431 8.34106C4.75807 8.17093 4.74953 7.98376 4.8 7.8083L5.18333 5.77497L6.56666 7.6083C6.63384 7.69952 6.7189 7.77608 6.81666 7.8333L9.60833 9.44997C9.73282 9.52197 9.87383 9.56052 10.0176 9.56189C10.1614 9.56325 10.3032 9.52737 10.429 9.45774C10.5548 9.38811 10.6605 9.2871 10.7357 9.16454C10.811 9.04198 10.8532 8.90203 10.8583 8.7583L10.9917 5.5083L11.9 6.0333L12.3 10.5916C12.3119 10.7256 12.356 10.8546 12.4285 10.9678C12.5011 11.081 12.5999 11.1749 12.7167 11.2416L14.85 12.5C15.1275 12.6601 15.3706 12.8736 15.5651 13.1282C15.7596 13.3828 15.9018 13.6734 15.9833 13.9833C16.0763 14.3141 16.0934 14.6616 16.0333 15Z"
                  fill="#98A2B3"
                />
              </svg>
              <input
                type="text"
                autoComplete="on"
                placeholder="Please enter your Destination"
                className="font-normal text-[16px]"
                value={destinationValue}
                onChange={handleDestinationChange}
                onFocus={() =>
                  setShowDestinationDropdown(destinationOptions.length > 0)
                }
                onBlur={() =>
                  setTimeout(() => setShowDestinationDropdown(false), 100)
                }
              />
              <label htmlFor="" className="text-sm">
                Destination
              </label>
            </label>
          </div>
          {showDestinationDropdown && (
            <ul className="dropdown absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 overflow-y-auto max-h-[200px]">
              {destinationOptions.map((option, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onMouseDown={() => handleDestinationOptionClick(option)}
                >
                  {option.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="ticket-date">
        <div className="selectInput relative ">
          <div>
            <label htmlFor="" className="Input-input-group">
              {ticketType === 'one-way' ? (
                <DatePicker
                  format={'DD-MM-YYYY'}
                  disabledDate={(current) => {
                    return current && current < moment().startOf('day');
                  }}
                  onChange={(date, dateString) =>
                    setDateStringOnly(
                      moment.utc(dateString, 'DD-MM-YYYY').format('YYYY-MM-DD')
                    )
                  }
                />
              ) : (
                <DatePicker.RangePicker
                  format={'DD-MM-YYYY'}
                  disabledDate={(current) => {
                    return current && current < moment().startOf('day');
                  }}
                  onChange={(dates, dateStrings) => {
                    const formattedDateStrings = dateStrings.map((dateString) =>
                      moment.utc(dateString, 'DD-MM-YYYY').format('YYYY-MM-DD')
                    );
                    setDateRange(formattedDateStrings);
                  }}
                />
              )}
              <label htmlFor="" className="text-sm">
                {ticketType === 'one-way'
                  ? 'Date of departure'
                  : 'Departure and Return Dates'}
              </label>
            </label>
          </div>
        </div>
      </div>
      <div className="ticket-last">
        <div className="ticket-adult-children">
          <div>
            <label htmlFor="" className="Input-input-group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3 20C5.33579 17.5226 8.50702 16 12 16C15.493 16 18.6642 17.5226 21 20M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
                  stroke="#101828"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="form-group">
                <div
                  className="roundtrip_passenger"
                  id="roundtrip_passenger"
                  ref={dropdownRef}
                >
                  <div className="flex items-center" onClick={toggleDropdown}>
                    <input
                      type="text"
                      name="roundtrip_passenger"
                      readOnly
                      value={totalPassengers}
                      id="total_passengers"
                      className="cursor-pointer"
                    />
                    <i
                      className={`fa-solid cursor-pointer ${
                        showDropdown ? 'fa-chevron-up' : 'fa-chevron-down'
                      }`}
                    ></i>
                  </div>
                  {showDropdown && (
                    <ul
                      className="passenger-selector"
                      id="roundtrip-passenger-selector"
                    >
                      <li>
                        <div className="psg-type">
                          <p className="font-bold text-[13px]">Adults</p>
                          <span className="font-bold text-[13px] text-[#DCBB87]">
                            Adults (from 12 years)
                          </span>
                        </div>
                        <div
                          className="psg-selector"
                          id="selector_for_passenger_adult"
                        >
                          <button
                            className="psg-btn psg-decrease"
                            onClick={() => {
                              decrease(setAdults, adults);
                              if (adults - 1 < infants) {
                                setInfants(adults - 1); // Điều chỉnh số lượng trẻ sơ sinh nếu nhiều hơn số lượng người lớn
                              }
                            }}
                            disabled={adults <= 1}
                          >
                            -
                          </button>
                          <span
                            className="current-psg"
                            id="current_passenger_adult"
                          >
                            {adults}
                          </span>
                          <button
                            className="psg-btn psg-increase"
                            onClick={() => increase(setAdults, adults)}
                          >
                            +
                          </button>
                        </div>
                      </li>
                      <li>
                        <div className="psg-type">
                          <p className="font-bold text-[13px]">Children</p>
                          <span className="font-bold text-[13px] text-[#DCBB87] hover:underline">
                            <a href="#0" className="vna-ajax-modal">
                              Children (2-12 years)
                            </a>
                          </span>
                        </div>
                        <div
                          className="psg-selector"
                          id="selector_for_passenger_child"
                        >
                          <button
                            className="psg-btn psg-decrease"
                            onClick={() => decrease(setChildren, children)}
                            disabled={children <= 0}
                          >
                            -
                          </button>
                          <span
                            className="current-psg"
                            id="current_passenger_child"
                          >
                            {children}
                          </span>
                          <button
                            className="psg-btn psg-increase"
                            onClick={() => increase(setChildren, children)}
                          >
                            +
                          </button>
                        </div>
                      </li>
                      <li>
                        <div className="psg-type">
                          <p className="font-bold text-[13px]">Infant</p>
                          <span className="font-bold text-[13px] text-[#DCBB87] hover:underline">
                            <a href="#0" className="vna-ajax-modal">
                              Infant (under 2 years)
                            </a>
                          </span>
                        </div>
                        <div
                          className="psg-selector"
                          id="selector_for_passenger_infant"
                        >
                          <button
                            className="psg-btn psg-decrease"
                            onClick={() => decrease(setInfants, infants)}
                            disabled={infants <= 0}
                          >
                            -
                          </button>
                          <span
                            className="current-psg"
                            id="current_passenger_infant"
                          >
                            {infants}
                          </span>
                          <button
                            className="psg-btn psg-increase"
                            onClick={() =>
                              increase(setInfants, infants, adults)
                            }
                          >
                            +
                          </button>
                        </div>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
              <label htmlFor="" className="text-sm">
                Passenger
              </label>
            </label>
          </div>
          <div>
            <label htmlFor="" className="Input-input-group">
              <svg
                width={20}
                height={20}
                fill="#98a2b3"
                viewBox="0 0 122.88 122.88"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                style={{ enableBackground: 'new 0 0 122.88 122.88' }}
                xmlSpace="preserve"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <path d="M121.27,45.01l-76.26,76.26c-0.04,0.04-0.09,0.08-0.14,0.1c-0.5,0.48-1.08,0.84-1.69,1.09c-0.68,0.28-1.39,0.42-2.11,0.42 c-0.72,0-1.43-0.14-2.11-0.42c-0.63-0.26-1.23-0.65-1.75-1.16l-10.05-10.04c-0.34-0.34-0.53-0.78-0.58-1.25 c-0.04-0.44,0.06-0.9,0.3-1.3l0.03-0.05c0.59-0.89,1-1.86,1.24-2.87c0.25-1.02,0.32-2.08,0.22-3.13l0-0.01 c-0.11-1.03-0.39-2.05-0.84-3.01c-0.43-0.91-1.03-1.78-1.79-2.54c-0.76-0.76-1.62-1.36-2.54-1.79c-0.96-0.46-1.98-0.74-3.01-0.84 c-1.01-0.1-2.06-0.03-3.07,0.21c-0.99,0.24-1.94,0.64-2.81,1.2c-0.41,0.31-0.89,0.44-1.37,0.4c-0.48-0.03-0.96-0.24-1.32-0.6 L1.61,85.66c-0.53-0.53-0.92-1.14-1.19-1.78C0.14,83.21,0,82.49,0,81.77c0-0.72,0.14-1.44,0.42-2.11c0.26-0.64,0.65-1.23,1.16-1.75 L77.87,1.61c0.53-0.53,1.14-0.92,1.78-1.19C80.33,0.14,81.05,0,81.77,0c0.72,0,1.44,0.14,2.11,0.42c0.65,0.27,1.26,0.66,1.78,1.19 L95.75,11.7c0.32,0.32,0.52,0.75,0.57,1.2c0.05,0.43-0.03,0.89-0.26,1.29l-0.02,0.03c-0.54,0.87-0.92,1.81-1.14,2.79 c-0.22,1-0.27,2.04-0.15,3.05l0,0.01c0.12,1,0.41,1.98,0.87,2.91c0.43,0.88,1.02,1.72,1.77,2.47l0,0.01 c0.73,0.75,1.56,1.33,2.44,1.77c0.92,0.45,1.92,0.74,2.93,0.86c0.99,0.12,2,0.08,2.99-0.13c0.97-0.2,1.92-0.56,2.79-1.08 c0.41-0.26,0.89-0.38,1.37-0.34c0.46,0.04,0.91,0.23,1.26,0.59l10.09,10.09c0.53,0.53,0.92,1.14,1.19,1.78 c0.28,0.68,0.42,1.4,0.42,2.11c0,0.72-0.14,1.44-0.42,2.11c-0.26,0.63-0.65,1.23-1.16,1.75L121.27,45.01L121.27,45.01z M56.6,74.81 c-0.19,1.26-0.73,2.45-1.89,3.61c-0.09,0.09-0.22,0.15-0.36,0.15c-0.13,0-0.25-0.05-0.35-0.14l-2.41-2.37 c-0.07-0.07-0.12-0.17-0.14-0.27c-0.11-0.7-0.19-1.3-0.26-1.79l-0.07-0.55c-0.13-0.07-0.25-0.15-0.37-0.23 c-0.18-0.13-0.36-0.28-0.53-0.44l-0.03-0.03c-0.15-0.15-0.28-0.3-0.4-0.47l-0.02-0.03c-0.07-0.1-0.14-0.2-0.2-0.31l-0.65-0.07 c-0.45-0.04-0.97-0.1-1.51-0.16c-0.11-0.01-0.21-0.06-0.29-0.15l-2.6-2.64c-0.19-0.19-0.19-0.51,0-0.7c1.3-1.3,2.48-1.88,3.72-2.07 c1.14-0.17,2.29-0.01,3.62,0.25l4.92-4.92l-14.23-5.53c-0.08-0.02-0.15-0.06-0.21-0.12c-0.19-0.19-0.19-0.51,0-0.7 c1.09-1.09,1.77-1.94,2.28-2.58c1.54-1.94,1.75-2.21,5.57-1.33l2.29-2.29c0.19-0.19,0.51-0.19,0.7,0l2.3,2.3 c0.19,0.19,0.19,0.51,0,0.7l-0.42,0.42l1.6,0.37l2.59-2.59c0.19-0.19,0.51-0.19,0.7,0l2.3,2.3c0.19,0.19,0.19,0.51,0,0.7 l-0.72,0.72l2.34,0.54l5.66-5.66c0.53-0.53,1.28-0.72,2.06-0.61c0.73,0.1,1.49,0.48,2.11,1.09l0.01,0.01c0.62,0.62,1,1.39,1.1,2.13 c0.11,0.78-0.09,1.53-0.61,2.06l-5.66,5.66l0.54,2.31l0.71-0.71c0.19-0.19,0.51-0.19,0.7,0l2.3,2.3c0.19,0.19,0.19,0.51,0,0.7 l-2.58,2.58l0.37,1.6l0.41-0.41c0.19-0.19,0.51-0.19,0.7,0l2.3,2.3c0.19,0.19,0.19,0.51,0,0.7l-2.28,2.28 c0.86,3.83,0.5,4.1-1.37,5.51c-0.66,0.5-1.53,1.16-2.64,2.26c-0.05,0.05-0.11,0.08-0.17,0.11c-0.25,0.1-0.54-0.03-0.64-0.28 l-5.44-14.15l-4.96,4.96C56.66,72.45,56.77,73.65,56.6,74.81L56.6,74.81z M19.64,65.7l37.58,37.58l46.04-46.04L65.68,19.66 L19.64,65.7L19.64,65.7z M54.35,106.14L16.77,68.57L4.54,80.8c-0.13,0.13-0.23,0.28-0.29,0.45c-0.07,0.18-0.11,0.37-0.11,0.55 c0,0.2,0.03,0.38,0.1,0.55c0.07,0.16,0.17,0.32,0.3,0.45l8.92,8.92c1.06-0.52,2.18-0.89,3.31-1.11c1.27-0.24,2.56-0.3,3.84-0.17 c1.5,0.14,2.97,0.53,4.34,1.18c1.35,0.64,2.6,1.51,3.71,2.62c1.09,1.09,1.95,2.34,2.58,3.67c0.66,1.39,1.06,2.88,1.22,4.38 c0.13,1.28,0.08,2.58-0.17,3.84c-0.22,1.14-0.59,2.25-1.11,3.31l8.92,8.92c0.13,0.13,0.28,0.23,0.45,0.29 c0.18,0.07,0.37,0.11,0.55,0.11c0.19,0,0.38-0.04,0.55-0.11c0.16-0.07,0.32-0.17,0.45-0.3L54.35,106.14L54.35,106.14z M68.55,16.79 l37.58,37.58l12.25-12.25c0.05-0.05,0.1-0.08,0.16-0.1c0.07-0.1,0.13-0.2,0.17-0.31c0.07-0.18,0.11-0.37,0.11-0.55 c0-0.19-0.03-0.37-0.1-0.53l-0.01-0.02c-0.06-0.16-0.16-0.3-0.28-0.43l-9.03-9.03c-1.06,0.47-2.16,0.8-3.29,0.99 c-1.24,0.2-2.5,0.23-3.76,0.08c-1.47-0.17-2.89-0.58-4.23-1.23c-1.3-0.63-2.51-1.48-3.59-2.56c-1.08-1.08-1.93-2.29-2.56-3.59 c-0.65-1.35-1.07-2.78-1.24-4.24c-0.15-1.25-0.12-2.51,0.08-3.75c0.19-1.13,0.52-2.23,0.99-3.29l-9.01-9.01 c-0.12-0.12-0.27-0.22-0.43-0.29l-0.02-0.01c-0.18-0.07-0.37-0.11-0.55-0.11c-0.2,0-0.38,0.03-0.55,0.1 c-0.16,0.07-0.32,0.17-0.45,0.3L68.55,16.79L68.55,16.79z" />{' '}
                  </g>
                </g>
              </svg>
              <Select
                defaultValue="ecomomy"
                style={{ width: 210 }}
                options={[
                  { value: 'ecomomy', label: 'Economy Class' },
                  { value: 'business', label: 'Business Class' },
                ]}
                onChange={(value, label) => {
                  setTicketClass(value);
                  setTicketClassLabel(label.label);
                }}
              />
              <label htmlFor="" className="text-sm">
                Class
              </label>
            </label>
          </div>
        </div>
        <div className="ticket-btn">
          <div>
            <label htmlFor="" className="Input-input-group">
              <svg
                width={23}
                height={23}
                fill="#98a2b3"
                viewBox="0 0 512 512"
                enableBackground="new 0 0 512 512"
                id="Coupon"
                version="1.1"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  {' '}
                  <g>
                    {' '}
                    <path d="M209.398,185.957c-10.781,3.579-16.642,15.261-13.064,26.043c2.867,8.637,10.931,14.114,19.569,14.114 c2.146,0,4.328-0.339,6.474-1.051c10.781-3.578,16.642-15.261,13.064-26.042v-0.001 C231.862,188.239,220.178,182.379,209.398,185.957z M219.228,215.573c-5.549,1.843-11.561-1.175-13.402-6.724 c-1.841-5.548,1.175-11.56,6.723-13.401c1.104-0.366,2.227-0.54,3.331-0.54c4.445,0,8.596,2.819,10.071,7.263 C227.792,207.72,224.775,213.731,219.228,215.573z" />{' '}
                    <path d="M301.762,228.705c-3.587-10.784-15.271-16.644-26.049-13.059c-10.775,3.574-16.635,15.256-13.063,26.036 c0.209,0.631,0.453,1.247,0.72,1.852h-20.762l35.889-71.55l-8.939-4.483l-38.137,76.033h-52.963v10H338.79v-10h-37.725 C303.074,238.991,303.428,233.742,301.762,228.705z M272.143,238.541c-1.839-5.552,1.175-11.563,6.722-13.403 c5.55-1.844,11.562,1.172,13.405,6.716c1.432,4.324-0.018,8.951-3.521,11.681h-13.082 C274.035,242.259,272.8,240.528,272.143,238.541z" />{' '}
                    <rect
                      height="109.405"
                      transform="matrix(-0.7072 -0.7071 0.7071 -0.7072 232.865 751.8976)"
                      width={10}
                      x="267.141"
                      y="273.023"
                    />{' '}
                    <path d="M244.375,284.074c-11.36,0-20.602,9.242-20.602,20.602c0,11.36,9.242,20.604,20.602,20.604s20.601-9.243,20.601-20.604 C264.977,293.316,255.735,284.074,244.375,284.074z M244.375,315.279c-5.846,0-10.602-4.757-10.602-10.604 c0-5.846,4.756-10.602,10.602-10.602c5.846,0,10.601,4.756,10.601,10.602C254.977,310.522,250.221,315.279,244.375,315.279z" />{' '}
                    <path d="M277.363,353.742c0,11.359,9.242,20.602,20.603,20.602s20.602-9.242,20.602-20.602c0-11.36-9.241-20.603-20.602-20.603 S277.363,342.382,277.363,353.742z M308.567,353.742c0,5.846-4.756,10.602-10.602,10.602c-5.847,0-10.603-4.756-10.603-10.602 c0-5.847,4.756-10.603,10.603-10.603C303.812,343.14,308.567,347.896,308.567,353.742z" />{' '}
                    <path d="M70.064,253.534h44.323v-0.001c11.482,0,20.824,12.171,20.824,27.13h10c0-14.959,9.341-27.13,20.824-27.13v-10 c-11.482,0-20.824-12.171-20.824-27.13h-10c0,14.959-9.342,27.13-20.824,27.13v0.001H60.064v45.847l-25.727-77.507l42.073-13.955 l-3.148-9.491l-51.566,17.104l38.369,115.595v93.728H338.79v-10H70.064V253.534z M140.212,236.639 c2.644,4.879,6.212,8.964,10.405,11.895c-4.193,2.932-7.761,7.016-10.405,11.895c-2.644-4.879-6.212-8.963-10.405-11.895 C134,245.603,137.568,241.518,140.212,236.639z" />{' '}
                    <rect height={10} width="26.944" x="370.013" y="404.855" />{' '}
                    <path d="M485.305,297.021h5v-53.487H370.013v10h110.292v33.786c-20.572,2.477-36.565,20.038-36.565,41.265 c0,21.234,15.993,38.801,36.565,41.277v34.994h-19.047v-0.002c-11.482,0-20.824-12.17-20.824-27.129h-10 c0,14.959-9.342,27.129-20.824,27.129v10c11.482,0,20.824,12.172,20.824,27.131h10c0-14.947,9.325-27.108,20.795-27.129h29.076 v-54.694h-5c-17.405,0-31.565-14.165-31.565-31.577C453.739,311.18,467.899,297.021,485.305,297.021z M435.434,421.748 c-2.645-4.879-6.212-8.963-10.405-11.895c4.193-2.931,7.761-7.015,10.405-11.894c2.645,4.879,6.212,8.963,10.404,11.894 C441.646,412.785,438.078,416.869,435.434,421.748z" />{' '}
                    <rect height={11} width={10} x="349.123" y="378.527" />{' '}
                    <rect height={11} width={10} x="349.123" y="312.527" />{' '}
                    <rect height={11} width={10} x="349.123" y="334.527" />{' '}
                    <rect height={11} width={10} x="349.123" y="400.527" />{' '}
                    <rect height={11} width={10} x="349.123" y="356.527" />{' '}
                    <rect height={11} width={10} x="349.123" y="246.527" />{' '}
                    <rect height={11} width={10} x="349.123" y="268.527" />{' '}
                    <rect height={11} width={10} x="349.123" y="290.527" />{' '}
                    <rect height="19.897" width={10} x="386.695" y="344.243" />{' '}
                    <rect height="43.599" width={10} x="386.695" y="290.645" />{' '}
                    <rect height="73.496" width={10} x="404.609" y="290.645" />{' '}
                    <rect height={10} width="88.908" x="111.457" y="297.849" />{' '}
                    <rect height={10} width="11.675" x="89.781" y="297.849" />{' '}
                    <rect height={10} width="77.409" x="89.781" y="352.992" />{' '}
                    <rect height={10} width="15.337" x="185.028" y="325.421" />{' '}
                    <rect height={10} width="87.348" x="89.781" y="325.421" />{' '}
                    <rect
                      height="160.334"
                      transform="matrix(0.3149 0.9491 -0.9491 0.3149 285.2887 -99.7354)"
                      width={10}
                      x="206.726"
                      y="67.571"
                    />{' '}
                    <path d="M423.697,82.656l10.642,32.063c-8.394,3.941-15.183,10.538-19.406,18.956c-4.979,9.925-5.795,21.193-2.298,31.729 c3.498,10.541,10.891,19.088,20.814,24.068c8.418,4.223,17.803,5.453,26.892,3.594l12.596,37.954l9.491-3.149l-15.652-47.164 l-4.746,1.574c-8,2.656-16.557,2.035-24.095-1.747c-7.538-3.781-13.152-10.273-15.81-18.279 c-2.654-8.001-2.035-16.558,1.746-24.095s10.27-13.15,18.27-15.806l4.746-1.575l-16.848-50.764l-114.168,37.89l3.149,9.491 L423.697,82.656z" />{' '}
                    <rect
                      height={11}
                      transform="matrix(-0.9491 0.315 -0.315 -0.9491 649.6716 178.7206)"
                      width="9.999"
                      x="305.396"
                      y="136.352"
                    />{' '}
                    <rect
                      height={10}
                      transform="matrix(-0.315 -0.9491 0.9491 -0.315 230.7095 617.2644)"
                      width={11}
                      x="332.614"
                      y="220.373"
                    />{' '}
                    <rect
                      height="9.999"
                      transform="matrix(0.315 0.9491 -0.9491 0.315 322.687 -205.151)"
                      width="10.999"
                      x="297.966"
                      y="115.973"
                    />{' '}
                    <rect
                      height="9.999"
                      transform="matrix(0.315 0.9491 -0.9491 0.315 420.9428 -174.2473)"
                      width="10.999"
                      x="325.685"
                      y="199.493"
                    />{' '}
                    <rect
                      height="9.999"
                      transform="matrix(-0.3149 -0.9491 0.9491 -0.3149 262.8158 515.1609)"
                      width="11.001"
                      x="311.825"
                      y="157.733"
                    />{' '}
                    <rect
                      height="9.999"
                      transform="matrix(0.315 0.9491 -0.9491 0.315 396.3893 -181.971)"
                      width={11}
                      x="318.755"
                      y="178.613"
                    />{' '}
                    <rect
                      height="19.897"
                      transform="matrix(0.9491 -0.3149 0.3149 0.9491 -46.1454 127.1575)"
                      width="10.001"
                      x="365.446"
                      y="196.438"
                    />{' '}
                    <rect
                      height="43.599"
                      transform="matrix(0.9491 -0.3149 0.3149 0.9491 -34.3368 121.0006)"
                      width="10.001"
                      x="352.296"
                      y="144.964"
                    />{' '}
                    <rect
                      height="73.496"
                      transform="matrix(-0.9491 0.3149 -0.3149 -0.9491 795.522 221.5186)"
                      width="10.001"
                      x="374.866"
                      y="138.275"
                    />{' '}
                  </g>{' '}
                </g>
              </svg>
              <input
                type="text"
                className="font-normal text-[16px]"
                placeholder="Please enter promotion code"
              />
              <label htmlFor="" className="text-sm">
                Promotion Code
              </label>
            </label>
          </div>
          <button className="btn-base" onClick={handleBookTicket}>
            Find Flights
          </button>
        </div>
      </div>
    </section>
  );
};

export default Ticket;

import { DatePicker, Select } from 'antd';
import moment from 'moment';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AlertContext } from '../../App';
import { airportServ } from '../../services/airportServ';
import { useDispatch } from 'react-redux';
import { setStep } from '../../redux/Slice/ticketSlice';

const BookTicketSearch = ({
  arrFlight,
  airportDeparture,
  airportDestination,
  totalPassengersBtK,
  bookTkAdults,
  bookTkChildren,
  bookTkInfants,
  ticketTypeBtK,
  ticketClassBtK,
  onSearchDataChange,
  departureIdBtK,
  destinationIdBtK,
}) => {
  const [showInput, setShowInput] = useState(false);
  const [ticketType, setTicketType] = useState(ticketTypeBtK);
  const [adults, setAdults] = useState(bookTkAdults);
  const [children, setChildren] = useState(bookTkChildren);
  const [infants, setInfants] = useState(bookTkInfants);
  const [totalPassengers, setTotalPassengers] = useState(0);
  const [ticketClass, setTicketClass] = useState('economy');
  const [ticketClassLabel, setTicketClassLabel] = useState('Economy Class');
  const [departureValue, setDepartureValue] = useState('');
  const [destinationValue, setDestinationValue] = useState('');
  const [departureOptions, setDepartureOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [showDepartureDropdown, setShowDepartureDropdown] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const [dateStringOnly, setDateStringOnly] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const [departureId, setDepartureId] = useState('');
  const [destinationId, setDestinationId] = useState('');

  const { handleAlert } = useContext(AlertContext);

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
  useEffect(() => {
    setTotalPassengers(totalPassengersBtK);
    setTicketType(ticketTypeBtK);
    setAdults(bookTkAdults);
    setChildren(bookTkChildren);
    setInfants(bookTkInfants);
    setDepartureValue(airportDeparture || '');
    setDestinationValue(airportDestination || '');
    setDepartureId(departureIdBtK);
    setDestinationId(destinationIdBtK);
  }, [
    bookTkAdults,
    bookTkChildren,
    bookTkInfants,
    airportDeparture,
    airportDestination,
    departureIdBtK,
    destinationIdBtK,
  ]);
  const inputRef = useRef(null);
  useEffect(() => {
    if (showInput) {
      function handleClickOutside(event) {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
          setShowInput(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showInput]);

  const toggleTicketType = () => {
    setTicketType((prevType) =>
      prevType === 'one-way' ? 'round-trip' : 'one-way'
    );
  };

  const handlePassengerChange = (type, value) => {
    if (value < 0) return;

    if (type === 'adults') setAdults(value);
    if (type === 'children') setChildren(value);
    if (type === 'infants') setInfants(value);

    const newTotal =
      (type === 'adults' ? value : adults) +
      (type === 'children' ? value : children) +
      (type === 'infants' ? value : infants);

    setTotalPassengers(newTotal);
  };

  const dispatch = useDispatch();

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

    const searchData = {
      ticketType,
      airportDeparture,
      airportDestination,
      departureId,
      destinationId,
      dateStringOnly: ticketType === 'one-way' ? dateStringOnly : null,
      departureDate: ticketType === 'round-trip' ? dateRange[0] : null,
      destinationDate: ticketType === 'round-trip' ? dateRange[1] : null,
      ticketClass,
      totalPassengers,
      ticketClassLabel,
      adults,
      children,
      infants,
    };
    dispatch(setStep(0));
    onSearchDataChange(searchData);
  };

  return (
    <div className="book-ticket-card">
      <div className="flex flex-col gap-6">
        <div className="flex gap-4 items-center">
          <button
            type="button"
            className="button-change-ticket-type gap-2"
            onClick={toggleTicketType}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M16.6667 14.1667H3.33337M3.33337 14.1667L6.66671 10.8333M3.33337 14.1667L6.66671 17.5M3.33337 5.83333H16.6667M16.6667 5.83333L13.3334 2.5M16.6667 5.83333L13.3334 9.16667"
                stroke="#dcbb87"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-[14px] font-medium leading-5">
              {ticketType === 'one-way' ? 'One way' : 'Round trip'}
            </div>
          </button>
          <div>
            <div className="book-tiket-selectInput relative">
              <button
                type="button"
                className="button-change-ticket-type gap-2"
                onClick={() => setShowInput(!showInput)}
              >
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
                <div className="text-[14px] font-medium leading-5">
                  {totalPassengers == 0 ? totalPassengersBtK : totalPassengers}
                </div>
                <i className="fa-solid fa-chevron-down text-[#dcbb87]"></i>
              </button>

              {showInput && (
                <div className="book-ticket-number-input" ref={inputRef}>
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
                        type="number"
                        autoComplete="on"
                        className="font-normal text-[16px]"
                        value={adults}
                        onChange={(e) =>
                          handlePassengerChange(
                            'adults',
                            parseInt(e.target.value)
                          )
                        }
                      />
                      <label htmlFor="" className="text-sm">
                        Adults
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
                        type="number"
                        autoComplete="on"
                        className="font-normal text-[16px]"
                        value={children}
                        onChange={(e) =>
                          handlePassengerChange(
                            'children',
                            parseInt(e.target.value)
                          )
                        }
                      />
                      <label htmlFor="" className="text-sm">
                        Children
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
                        type="number"
                        autoComplete="on"
                        className="font-normal text-[16px]"
                        value={infants}
                        onChange={(e) =>
                          handlePassengerChange(
                            'infants',
                            parseInt(e.target.value)
                          )
                        }
                      />
                      <label htmlFor="" className="text-sm">
                        Infant
                      </label>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <Select
              style={{ width: 150 }}
              options={[
                { value: 'economy', label: 'Economy Class' },
                { value: 'business', label: 'Business Class' },
              ]}
              defaultValue={ticketClassBtK}
              onChange={(value, label) => {
                setTicketClass(value);
                setTicketClassLabel(label.label);
              }}
            />
          </div>
        </div>
        <div className="flex gap-4 book-ticket-input">
          <div className="flex-grow">
            <div className="relative">
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
          </div>
          <div className="flex-grow">
            <div className="relative">
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
          <div className="flex-grow">
            <div className="relative">
              <div>
                <label htmlFor="" className="Input-input-group">
                  {ticketType === 'one-way' ? (
                    <DatePicker
                      style={{ width: '100%' }}
                      format={'DD-MM-YYYY'}
                      disabledDate={(current) => {
                        return current && current < moment().startOf('day');
                      }}
                      onChange={(date, dateString) =>
                        setDateStringOnly(
                          moment
                            .utc(dateString, 'DD-MM-YYYY')
                            .format('YYYY-MM-DD')
                        )
                      }
                    />
                  ) : (
                    <DatePicker.RangePicker
                      style={{ width: '100%' }}
                      format={'DD-MM-YYYY'}
                      disabledDate={(current) => {
                        return current && current < moment().startOf('day');
                      }}
                      onChange={(dates, dateStrings) => {
                        const formattedDateStrings = dateStrings.map(
                          (dateString) =>
                            moment
                              .utc(dateString, 'DD-MM-YYYY')
                              .format('YYYY-MM-DD')
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
          <button type="button" className="btn-base" onClick={handleBookTicket}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookTicketSearch;

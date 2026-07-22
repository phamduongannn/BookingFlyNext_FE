import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotFoundFlightDepature from '../../components/Animation/NotFoundFlightDepature';
import NotFoundFlightDestination from '../../components/Animation/NotFoundFlightDestination';
import { setStep } from '../../redux/Slice/ticketSlice';
import BookTicketSideBar from './BookTicketSideBar';
import BookTicketForm from './BookTicketForm';
import { jwtDecode } from 'jwt-decode';
import Payment from './Payment';

const BookTicketContent = ({
  arrFlight,
  departureFlights,
  returnFlights,
  ticketClassLabel,
  ticketClass,
  adults,
  children,
  infants,
  ticketType,
}) => {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedFlightIndex, setSelectedFlightIndex] = useState(null);
  const [selectedDepartureFlightIndex, setSelectedDepartureFlightIndex] =
    useState(null);
  const [selectedReturnFlightIndex, setSelectedReturnFlightIndex] =
    useState(null);
  const [selectedDepartureFlight, setSelectedDepartureFlight] = useState(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState(null);
  const [infoFlight, setInfoFlight] = useState([]);
  const [infoFlightDeparture, setInfoFlightDeparture] = useState([]);
  const [infoFlightReturn, setInfoFlightReturn] = useState([]);
  const [dropdownCollapse, setDropdownCollapse] = useState(true);
  const [flightCollapseStates, setFlightCollapseStates] = useState(
    arrFlight.map(() => false)
  );
  const [dropdownCollapse2, setDropdownCollapse2] = useState(true);
  const [flightCollapseStates2, setFlightCollapseStates2] = useState(
    arrFlight.map(() => false)
  );

  const { step } = useSelector((state) => state.ticketSlice);
  const calculateTripTime = (departureTime, arrivalTime) => {
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);

    const diff = arrival.getTime() - departure.getTime();

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    return `${hours}h ${minutes}m`;
  };

  const airlines = {
    VN: { src: '/img/VN.png', name: 'Vietnam Airlines' },
    VJ: { src: '/img/VJ.png', name: 'VietJet Air' },
    QH: { src: '/img/QH.png', name: 'Bamboo Airways' },
    VU: { src: '/img/VU.png', name: 'Vietravel Airlines' },
    BL: { src: '/img/BL.png', name: 'Pacific Airlines' },
  };
  const getAirlineInfo = (flightNumber) => {
    const airlineCode = flightNumber.substring(0, 2);
    return airlines[airlineCode];
  };
  const calculateTicketPrice = (
    flight,
    adults,
    children,
    infants,
    ticketClass
  ) => {
    const airlineInfo = getAirlineInfo(flight.flight_number);
    if (!airlineInfo) return 'N/A';
    const adultPrice = flight.price;
    let childrenPrice = 0;
    let infantsPrice = 0;

    if (
      airlineInfo.name === 'Vietnam Airlines' ||
      airlineInfo.name === 'VietJet Air' ||
      airlineInfo.name === 'Vietravel Airlines' ||
      airlineInfo.name === 'Pacific Airlines' ||
      airlineInfo.name !== 'Bamboo Airways'
    ) {
      childrenPrice = adultPrice * 0.9;
      infantsPrice = 110000;
    } else if (airlineInfo.name === 'Bamboo Airways') {
      childrenPrice = adultPrice * 0.75;
      infantsPrice = 108000;
    }

    const total =
      adults * adultPrice + children * childrenPrice + infants * infantsPrice;

    if (ticketClass === 'business') {
      return (total * 1.05).toLocaleString('vi-VN') + ' VND';
    } else {
      return total.toLocaleString('vi-VN') + ' VND';
    }
  };
  const dispatch = useDispatch();
  const handleBookTicket = (infoFlight, index) => {
    setSelectedFlight(infoFlight);
    setSelectedFlightIndex(index);
    setInfoFlight(infoFlight);
    dispatch(setStep(1));
  };

  const handleReselect = () => {
    setSelectedFlight(null);
    setSelectedFlightIndex(null);
    dispatch(setStep(0));
  };

  const handleSelectDepartureFlight = (departureFlights, index) => {
    setSelectedDepartureFlight(departureFlights);
    setSelectedDepartureFlightIndex(index);
    setInfoFlightDeparture(departureFlights);
    dispatch(setStep(1));
  };

  const handleReselectDeparture = () => {
    setSelectedDepartureFlight(null);
    setSelectedDepartureFlightIndex(null);
    setInfoFlightDeparture([]);
    dispatch(setStep(0));
  };

  const handleSelectReturnFlight = (returnFlights, index) => {
    setSelectedReturnFlight(returnFlights);
    setSelectedReturnFlightIndex(index);
    setInfoFlightReturn(returnFlights);
    dispatch(setStep(1));
  };
  const handleReselectReturn = () => {
    setSelectedReturnFlight(null);
    setSelectedReturnFlightIndex(null);
    setInfoFlightReturn([]);
    dispatch(setStep(0));
  };

  const renderFlightOnly = (arrFlight) => {
    if (arrFlight.length === 0) {
      return (
        <div className="mr-40">
          <NotFoundFlightDepature />
        </div>
      );
    }

    if (selectedFlight) {
      const flight = selectedFlight;
      const index = selectedFlightIndex;

      return (
        <div key={index}>
          <div className="book-ticket-flight-item-card">
            <div className="collapse-header">
              <div className="flight-card-header flex gap-0 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={48}
                  height={48}
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M19.1667 7.76666C19.2189 7.55255 19.1891 7.32665 19.0833 7.13333C18.8133 6.6647 18.4533 6.25401 18.0241 5.92483C17.5949 5.59565 17.105 5.35445 16.5824 5.21509C16.0597 5.07572 15.5147 5.04093 14.9786 5.1127C14.4425 5.18447 13.9259 5.3614 13.4583 5.63333L11.6667 6.66666L7.49999 4.70833C7.38154 4.64696 7.25007 4.61493 7.11666 4.61493C6.98325 4.61493 6.85179 4.64696 6.73333 4.70833L4.23333 6.15C4.10978 6.22126 4.00659 6.32305 3.93363 6.44561C3.86068 6.56818 3.8204 6.70741 3.81666 6.85C3.81263 6.99364 3.8458 7.13588 3.91297 7.26292C3.98014 7.38995 4.07901 7.49746 4.2 7.575L6.95 9.30833L5.49999 10.1417L1.51666 10.625C1.35653 10.6448 1.2056 10.7107 1.08218 10.8146C0.958764 10.9185 0.868172 11.0561 0.821404 11.2105C0.774636 11.3649 0.773703 11.5296 0.818719 11.6845C0.863735 11.8395 0.952763 11.978 1.07499 12.0833L4.02499 14.6333C4.41337 15.004 4.91075 15.2398 5.44353 15.3058C5.97632 15.3719 6.51621 15.2646 6.98333 15L18.75 8.275C18.8503 8.22294 18.9389 8.15103 19.0106 8.06365C19.0822 7.97626 19.1353 7.87522 19.1667 7.76666ZM6.22499 13.6C6.06492 13.6881 5.88033 13.7211 5.69964 13.694C5.51896 13.6669 5.35218 13.5812 5.225 13.45L3.64166 12.0917L5.91666 11.8167C6.02846 11.8023 6.13619 11.7655 6.23333 11.7083L9.03333 10.1C9.15807 10.028 9.26202 9.9249 9.33505 9.80076C9.40807 9.67662 9.44768 9.53567 9.45 9.39166C9.4517 9.24864 9.41657 9.10758 9.34798 8.98206C9.27938 8.85654 9.17963 8.7508 9.05833 8.675L6.30833 6.93333L7.225 6.40833L11.3917 8.34166C11.5101 8.40303 11.6416 8.43506 11.775 8.43506C11.9084 8.43506 12.0399 8.40303 12.1583 8.34166L14.2917 7.10833C14.7288 6.86333 15.2295 6.75538 15.7288 6.79847C16.2281 6.84156 16.7029 7.03371 17.0917 7.35L6.22499 13.6Z"
                    fill="#dcbb87"
                  />
                </svg>
                <div className="flight-card-details flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <label className="text-base font-bold cursor-pointer">
                      {
                        flight.airports_flights_departure_airport_idToairports
                          .airport_name
                      }
                    </label>
                    <i className="fa-solid fa-arrow-right"></i>
                    <label className="text-base font-bold cursor-pointer">
                      {
                        flight.airports_flights_arrival_airport_idToairports
                          .airport_name
                      }
                    </label>
                  </div>
                  <p className="font-bold text-[14px]">
                    {moment
                      .utc(flight.departure_time)
                      .format('dddd, DD/MM/YYYY')}
                  </p>
                </div>
                <button className="text-[#dcbb87]" type="button">
                  <i className={`fa-solid ml-20 fa-plus`}></i>
                </button>
              </div>
              <div className="collapse-body">
                <div>
                  <div>
                    <div className="flight-callendar">
                      {Array.from({ length: 5 }, (_, i) => {
                        const date = moment
                          .utc(flight.departure_time)
                          .subtract(2, 'days')
                          .add(i, 'days');
                        return (
                          <div
                            key={i}
                            className={`flight-callendar-item ${
                              date.isSame(moment(flight.departure_time), 'day')
                                ? 'flight-callendar-item-active'
                                : ''
                            }`}
                          >
                            <div className="flight-callendar-day">
                              {date.format('dddd')}
                            </div>
                            <div className="flight-callendar-date">
                              {date.format('DD')}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flight-card-list flex flex-col gap-4">
                      <div className="flight-card fight-card-choose">
                        <div
                          className={`flight-item-card flex items-center ${
                            flightCollapseStates[index]
                              ? 'collapse-header-active'
                              : 'collapse-header'
                          }`}
                          onClick={() => {
                            const newCollapseStates = [...flightCollapseStates];
                            newCollapseStates[index] =
                              !newCollapseStates[index];
                            setFlightCollapseStates(newCollapseStates);
                          }}
                        >
                          <div className="flight-group">
                            <div className="flex items-center gap-4">
                              <div className="flight-logo">
                                <div className="flight-logo-child">
                                  <img
                                    src={
                                      getAirlineInfo(flight.flight_number).src
                                    }
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col flex-grow gap-1 text-left">
                                <label className="text-[14px] font-bold">
                                  {flight.flight_number}
                                </label>
                                <p className="text-[14px] font-normal">
                                  {getAirlineInfo(flight.flight_number).name}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flight-group">
                            <div className="flex items-center gap-4">
                              <div className="flight-card-destination">
                                <label className="text-[14px] font-bold">
                                  {moment
                                    .utc(flight.departure_time)
                                    .format('HH:mm')}
                                </label>
                                <p className="text-[14px] font-normal">
                                  {
                                    flight
                                      .airports_flights_departure_airport_idToairports
                                      .airport_code
                                  }
                                </p>
                              </div>
                              <div className="flight-card-destination">
                                <label className="text-[14px] font-bold">
                                  {moment
                                    .utc(flight.arrival_time)
                                    .format('HH:mm')}
                                </label>
                                <p className="text-[14px] font-normal">
                                  {
                                    flight
                                      .airports_flights_arrival_airport_idToairports
                                      .airport_code
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flght-card-price">
                            <label className="text-[14px] font-bold">
                              {calculateTicketPrice(
                                flight,
                                adults,
                                children,
                                infants,
                                ticketClass
                              )}
                            </label>
                            <p className="text-[14px] font-normal">VND</p>
                          </div>
                          <button
                            type="button"
                            className="btn-choose"
                            onClick={handleReselect}
                          >
                            Reselect
                          </button>
                          <div>
                            <button type="button" className="text-[#475467]">
                              <i
                                className={`fa-solid ml-10 ${
                                  flightCollapseStates[index]
                                    ? 'fa-chevron-up'
                                    : 'fa-chevron-down'
                                }`}
                              ></i>
                            </button>
                          </div>
                        </div>
                        {flightCollapseStates[index] && (
                          <div className="flight-card-collapse">
                            <div>
                              <div className="flight-card-content">
                                <div className="flex flex-grow gap-[19px]">
                                  <div className="flight-item-card-steps">
                                    <div className="item-card-steps-big-dots"></div>
                                    <div className="item-card-steps-small-dots"></div>
                                    <div className="item-card-steps-small-dots"></div>
                                    <div className="item-card-steps-small-dots"></div>
                                    <div className="item-card-steps-small-dots"></div>
                                    <div className="item-card-steps-small-dots"></div>
                                    <div className="item-card-steps-big-dots"></div>
                                  </div>
                                  <div className="flex flex-col gap-3 justify-between">
                                    <div className="flex gap-2 items-center">
                                      <label className="text-[14px] font-bold cursor-pointer">
                                        {moment
                                          .utc(flight.departure_time)
                                          .format('DD/MM/YYYY HH:mm A')}
                                      </label>
                                      <div className="item-card-dots"></div>
                                      <label className="text-[14px] font-bold cursor-pointer">
                                        {
                                          flight
                                            .airports_flights_departure_airport_idToairports
                                            .airport_code
                                        }
                                      </label>
                                    </div>
                                    <p className="font-bold text-[14px] text-[#667085]">
                                      Trip time:&nbsp;
                                      {calculateTripTime(
                                        moment.utc(flight.departure_time),
                                        moment.utc(flight.arrival_time)
                                      )}
                                    </p>
                                    <div className="flex gap-2 items-center">
                                      <label className="text-[14px] font-bold cursor-pointer">
                                        {moment
                                          .utc(flight.arrival_time)
                                          .format('DD/MM/YYYY HH:mm A')}
                                      </label>
                                      <div className="item-card-dots"></div>
                                      <label className="text-[14px] font-bold cursor-pointer">
                                        {
                                          flight
                                            .airports_flights_arrival_airport_idToairports
                                            .airport_code
                                        }
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                  <div className="flight-logo">
                                    <img
                                      src={
                                        getAirlineInfo(flight.flight_number).src
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <p>
                                    Airline:&nbsp;
                                    {getAirlineInfo(flight.flight_number).name}
                                  </p>
                                  <p>Flight: {flight.flight_number}</p>
                                  <p>Seat class: {ticketClassLabel}</p>
                                  <p>Plane: 321</p>
                                  <p>Hand luggage: 1 piece x 12kg</p>
                                  <p>Checked baggage: 1 piece x 23kg</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return arrFlight.map((flight, index) => (
      <div key={index}>
        {index == 0 && (
          <div className="book-ticket-flight-item-card">
            <div
              onClick={() => setDropdownCollapse(!dropdownCollapse)}
              className={`collapse-header ${
                dropdownCollapse ? 'collapsed-header-off' : ''
              }`}
            >
              {index === 0 && (
                <div className="flight-card-header flex gap-0 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={48}
                    height={48}
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M19.1667 7.76666C19.2189 7.55255 19.1891 7.32665 19.0833 7.13333C18.8133 6.6647 18.4533 6.25401 18.0241 5.92483C17.5949 5.59565 17.105 5.35445 16.5824 5.21509C16.0597 5.07572 15.5147 5.04093 14.9786 5.1127C14.4425 5.18447 13.9259 5.3614 13.4583 5.63333L11.6667 6.66666L7.49999 4.70833C7.38154 4.64696 7.25007 4.61493 7.11666 4.61493C6.98325 4.61493 6.85179 4.64696 6.73333 4.70833L4.23333 6.15C4.10978 6.22126 4.00659 6.32305 3.93363 6.44561C3.86068 6.56818 3.8204 6.70741 3.81666 6.85C3.81263 6.99364 3.8458 7.13588 3.91297 7.26292C3.98014 7.38995 4.07901 7.49746 4.2 7.575L6.95 9.30833L5.49999 10.1417L1.51666 10.625C1.35653 10.6448 1.2056 10.7107 1.08218 10.8146C0.958764 10.9185 0.868172 11.0561 0.821404 11.2105C0.774636 11.3649 0.773703 11.5296 0.818719 11.6845C0.863735 11.8395 0.952763 11.978 1.07499 12.0833L4.02499 14.6333C4.41337 15.004 4.91075 15.2398 5.44353 15.3058C5.97632 15.3719 6.51621 15.2646 6.98333 15L18.75 8.275C18.8503 8.22294 18.9389 8.15103 19.0106 8.06365C19.0822 7.97626 19.1353 7.87522 19.1667 7.76666ZM6.22499 13.6C6.06492 13.6881 5.88033 13.7211 5.69964 13.694C5.51896 13.6669 5.35218 13.5812 5.225 13.45L3.64166 12.0917L5.91666 11.8167C6.02846 11.8023 6.13619 11.7655 6.23333 11.7083L9.03333 10.1C9.15807 10.028 9.26202 9.9249 9.33505 9.80076C9.40807 9.67662 9.44768 9.53567 9.45 9.39166C9.4517 9.24864 9.41657 9.10758 9.34798 8.98206C9.27938 8.85654 9.17963 8.7508 9.05833 8.675L6.30833 6.93333L7.225 6.40833L11.3917 8.34166C11.5101 8.40303 11.6416 8.43506 11.775 8.43506C11.9084 8.43506 12.0399 8.40303 12.1583 8.34166L14.2917 7.10833C14.7288 6.86333 15.2295 6.75538 15.7288 6.79847C16.2281 6.84156 16.7029 7.03371 17.0917 7.35L6.22499 13.6Z"
                      fill="#dcbb87"
                    />
                  </svg>
                  <div className="flight-card-details flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <label className="text-base font-bold cursor-pointer">
                        {
                          flight.airports_flights_departure_airport_idToairports
                            .airport_name
                        }
                      </label>
                      <i className="fa-solid fa-arrow-right"></i>
                      <label className="text-base font-bold cursor-pointer">
                        {
                          flight.airports_flights_arrival_airport_idToairports
                            .airport_name
                        }
                      </label>
                    </div>
                    <p className="font-bold text-[14px]">
                      {moment
                        .utc(flight.departure_time)
                        .format('dddd, DD/MM/YYYY')}
                    </p>
                  </div>
                  <button
                    className="text-[#dcbb87]"
                    type="button"
                    onClick={() => setDropdownCollapse(!dropdownCollapse)}
                  >
                    <i
                      className={`fa-solid ml-20 ${
                        dropdownCollapse ? 'fa-plus' : 'fa-minus'
                      }`}
                    ></i>
                  </button>
                </div>
              )}
            </div>
            {dropdownCollapse && (
              <div className="collapse-body">
                <div>
                  <div>
                    {index == 0 && (
                      <div className="flight-callendar">
                        {Array.from({ length: 5 }, (_, i) => {
                          const date = moment
                            .utc(flight.departure_time)
                            .subtract(2, 'days')
                            .add(i, 'days');
                          return (
                            <div
                              key={i}
                              className={`flight-callendar-item ${
                                date.isSame(
                                  moment(flight.departure_time),
                                  'day'
                                )
                                  ? 'flight-callendar-item-active'
                                  : ''
                              }`}
                            >
                              <div className="flight-callendar-day">
                                {date.format('dddd')}
                              </div>
                              <div className="flight-callendar-date">
                                {date.format('DD')}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <div className="flight-card-list flex flex-col gap-4">
                      {arrFlight.map((flight, index) => (
                        <div key={index} className="flight-card">
                          <div
                            className={`flight-item-card flex items-center gap-4 ${
                              flightCollapseStates[index]
                                ? 'collapse-header-active'
                                : 'collapse-header'
                            }`}
                            onClick={() => {
                              const newCollapseStates = [
                                ...flightCollapseStates,
                              ];
                              newCollapseStates[index] =
                                !newCollapseStates[index];
                              setFlightCollapseStates(newCollapseStates);
                            }}
                          >
                            <div className="flight-group">
                              <div className="flex items-center gap-4">
                                <div className="flight-logo">
                                  <div className="flight-logo-child">
                                    <img
                                      src={
                                        getAirlineInfo(flight.flight_number).src
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col flex-grow gap-1 text-left">
                                  <label className="text-[14px] font-bold">
                                    {flight.flight_number}
                                  </label>
                                  <p className="text-[14px] font-normal">
                                    {getAirlineInfo(flight.flight_number).name}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flight-group">
                              <div className="flex items-center gap-4">
                                <div className="flight-card-destination">
                                  <label className="text-[14px] font-bold">
                                    {moment
                                      .utc(flight.departure_time)
                                      .format('HH:mm')}
                                  </label>
                                  <p className="text-[14px] font-normal">
                                    {
                                      flight
                                        .airports_flights_departure_airport_idToairports
                                        .airport_code
                                    }
                                  </p>
                                </div>
                                <div className="flight-card-destination">
                                  <label className="text-[14px] font-bold">
                                    {moment
                                      .utc(flight.arrival_time)
                                      .format('HH:mm')}
                                  </label>
                                  <p className="text-[14px] font-normal">
                                    {
                                      flight
                                        .airports_flights_arrival_airport_idToairports
                                        .airport_code
                                    }
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flght-card-price">
                              <label className="text-[14px] font-bold">
                                {calculateTicketPrice(
                                  flight,
                                  adults,
                                  children,
                                  infants,
                                  ticketClass
                                )}
                              </label>
                              <p className="text-[14px] font-normal">VND</p>
                            </div>
                            <button
                              type="button"
                              className="btn-choose"
                              onClick={() => handleBookTicket(flight, index)}
                            >
                              Choose
                            </button>
                            <div>
                              <button type="button" className="text-[#475467]">
                                <i
                                  className={`fa-solid ${
                                    flightCollapseStates[index]
                                      ? 'fa-chevron-up'
                                      : 'fa-chevron-down'
                                  }`}
                                ></i>
                              </button>
                            </div>
                          </div>
                          {flightCollapseStates[index] && (
                            <div className="flight-card-collapse">
                              <div>
                                <div className="flight-card-content">
                                  <div className="flex flex-grow gap-[19px]">
                                    <div className="flight-item-card-steps">
                                      <div className="item-card-steps-big-dots"></div>
                                      <div className="item-card-steps-small-dots"></div>
                                      <div className="item-card-steps-small-dots"></div>
                                      <div className="item-card-steps-small-dots"></div>
                                      <div className="item-card-steps-small-dots"></div>
                                      <div className="item-card-steps-small-dots"></div>
                                      <div className="item-card-steps-big-dots"></div>
                                    </div>
                                    <div className="flex flex-col gap-3 justify-between">
                                      <div className="flex gap-2 items-center">
                                        <label className="text-[14px] font-bold cursor-pointer">
                                          {moment
                                            .utc(flight.departure_time)
                                            .format('DD/MM/YYYY HH:mm A')}
                                        </label>
                                        <div className="item-card-dots"></div>
                                        <label className="text-[14px] font-bold cursor-pointer">
                                          {
                                            flight
                                              .airports_flights_departure_airport_idToairports
                                              .airport_code
                                          }
                                        </label>
                                      </div>
                                      <p className="font-bold text-[14px] text-[#667085]">
                                        Trip time:&nbsp;
                                        {calculateTripTime(
                                          moment.utc(flight.departure_time),
                                          moment.utc(flight.arrival_time)
                                        )}
                                      </p>
                                      <div className="flex gap-2 items-center">
                                        <label className="text-[14px] font-bold cursor-pointer">
                                          {moment
                                            .utc(flight.arrival_time)
                                            .format('DD/MM/YYYY HH:mm A')}
                                        </label>
                                        <div className="item-card-dots"></div>
                                        <label className="text-[14px] font-bold cursor-pointer">
                                          {
                                            flight
                                              .airports_flights_arrival_airport_idToairports
                                              .airport_code
                                          }
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    <div className="flight-logo">
                                      <img
                                        src={
                                          getAirlineInfo(flight.flight_number)
                                            .src
                                        }
                                        alt=""
                                      />
                                    </div>
                                    <p>
                                      Airline:&nbsp;
                                      {
                                        getAirlineInfo(flight.flight_number)
                                          .name
                                      }
                                    </p>
                                    <p>Flight: {flight.flight_number}</p>
                                    <p>Seat class: {ticketClassLabel}</p>
                                    <p>Plane: 321</p>
                                    <p>Hand luggage: 1 piece x 12kg</p>
                                    <p>Checked baggage: 1 piece x 23kg</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    ));
  };
  const renderFlightDeparture = (departureFlights) => {
    if (departureFlights.length === 0) {
      return (
        <div className="mr-40">
          <NotFoundFlightDepature />
        </div>
      );
    }

    if (selectedDepartureFlight) {
      const flight = selectedDepartureFlight;
      const index = selectedDepartureFlightIndex;

      return (
        <div key={index}>
          <div className="book-ticket-flight-item-card">
            <div className="collapse-header">
              <div className="flight-card-header flex gap-0 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={48}
                  height={48}
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M19.1667 7.76666C19.2189 7.55255 19.1891 7.32665 19.0833 7.13333C18.8133 6.6647 18.4533 6.25401 18.0241 5.92483C17.5949 5.59565 17.105 5.35445 16.5824 5.21509C16.0597 5.07572 15.5147 5.04093 14.9786 5.1127C14.4425 5.18447 13.9259 5.3614 13.4583 5.63333L11.6667 6.66666L7.49999 4.70833C7.38154 4.64696 7.25007 4.61493 7.11666 4.61493C6.98325 4.61493 6.85179 4.64696 6.73333 4.70833L4.23333 6.15C4.10978 6.22126 4.00659 6.32305 3.93363 6.44561C3.86068 6.56818 3.8204 6.70741 3.81666 6.85C3.81263 6.99364 3.8458 7.13588 3.91297 7.26292C3.98014 7.38995 4.07901 7.49746 4.2 7.575L6.95 9.30833L5.49999 10.1417L1.51666 10.625C1.35653 10.6448 1.2056 10.7107 1.08218 10.8146C0.958764 10.9185 0.868172 11.0561 0.821404 11.2105C0.774636 11.3649 0.773703 11.5296 0.818719 11.6845C0.863735 11.8395 0.952763 11.978 1.07499 12.0833L4.02499 14.6333C4.41337 15.004 4.91075 15.2398 5.44353 15.3058C5.97632 15.3719 6.51621 15.2646 6.98333 15L18.75 8.275C18.8503 8.22294 18.9389 8.15103 19.0106 8.06365C19.0822 7.97626 19.1353 7.87522 19.1667 7.76666ZM6.22499 13.6C6.06492 13.6881 5.88033 13.7211 5.69964 13.694C5.51896 13.6669 5.35218 13.5812 5.225 13.45L3.64166 12.0917L5.91666 11.8167C6.02846 11.8023 6.13619 11.7655 6.23333 11.7083L9.03333 10.1C9.15807 10.028 9.26202 9.9249 9.33505 9.80076C9.40807 9.67662 9.44768 9.53567 9.45 9.39166C9.4517 9.24864 9.41657 9.10758 9.34798 8.98206C9.27938 8.85654 9.17963 8.7508 9.05833 8.675L6.30833 6.93333L7.225 6.40833L11.3917 8.34166C11.5101 8.40303 11.6416 8.43506 11.775 8.43506C11.9084 8.43506 12.0399 8.40303 12.1583 8.34166L14.2917 7.10833C14.7288 6.86333 15.2295 6.75538 15.7288 6.79847C16.2281 6.84156 16.7029 7.03371 17.0917 7.35L6.22499 13.6Z"
                    fill="#dcbb87"
                  />
                </svg>
                <div className="flight-card-details flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <label className="text-base font-bold cursor-pointer">
                      {
                        flight.airports_flights_departure_airport_idToairports
                          .airport_name
                      }
                    </label>
                    <i className="fa-solid fa-arrow-right"></i>
                    <label className="text-base font-bold cursor-pointer">
                      {
                        flight.airports_flights_arrival_airport_idToairports
                          .airport_name
                      }
                    </label>
                  </div>
                  <p className="font-bold text-[14px]">
                    {moment
                      .utc(flight.departure_time)
                      .format('dddd, DD/MM/YYYY')}
                  </p>
                </div>
                <button className="text-[#dcbb87]" type="button">
                  <i className={`fa-solid ml-20 fa-plus`}></i>
                </button>
              </div>
              <div className="collapse-body">
                <div>
                  <div>
                    <div className="flight-callendar">
                      {Array.from({ length: 5 }, (_, i) => {
                        const date = moment
                          .utc(flight.departure_time)
                          .subtract(2, 'days')
                          .add(i, 'days');
                        return (
                          <div
                            key={i}
                            className={`flight-callendar-item ${
                              date.isSame(moment(flight.departure_time), 'day')
                                ? 'flight-callendar-item-active'
                                : ''
                            }`}
                          >
                            <div className="flight-callendar-day">
                              {date.format('dddd')}
                            </div>
                            <div className="flight-callendar-date">
                              {date.format('DD')}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flight-card-list flex flex-col gap-4">
                      <div className="flight-card fight-card-choose">
                        <div
                          className={`flight-item-card flex items-center ${
                            flightCollapseStates[index]
                              ? 'collapse-header-active'
                              : 'collapse-header'
                          }`}
                          onClick={() => {
                            const newCollapseStates = [...flightCollapseStates];
                            newCollapseStates[index] =
                              !newCollapseStates[index];
                            setFlightCollapseStates(newCollapseStates);
                          }}
                        >
                          <div className="flight-group">
                            <div className="flex items-center gap-4">
                              <div className="flight-logo">
                                <div className="flight-logo-child">
                                  <img
                                    src={
                                      getAirlineInfo(flight.flight_number).src
                                    }
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col flex-grow gap-1 text-left">
                                <label className="text-[14px] font-bold">
                                  {flight.flight_number}
                                </label>
                                <p className="text-[14px] font-normal">
                                  {getAirlineInfo(flight.flight_number).name}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flight-group">
                            <div className="flex items-center gap-4">
                              <div className="flight-card-destination">
                                <label className="text-[14px] font-bold">
                                  {moment
                                    .utc(flight.departure_time)
                                    .format('HH:mm')}
                                </label>
                                <p className="text-[14px] font-normal">
                                  {
                                    flight
                                      .airports_flights_departure_airport_idToairports
                                      .airport_code
                                  }
                                </p>
                              </div>
                              <div className="flight-card-destination">
                                <label className="text-[14px] font-bold">
                                  {moment
                                    .utc(flight.arrival_time)
                                    .format('HH:mm')}
                                </label>
                                <p className="text-[14px] font-normal">
                                  {
                                    flight
                                      .airports_flights_arrival_airport_idToairports
                                      .airport_code
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flght-card-price">
                            <label className="text-[14px] font-bold">
                              {calculateTicketPrice(
                                flight,
                                adults,
                                children,
                                infants,
                                ticketClass
                              )}
                            </label>
                            <p className="text-[14px] font-normal">VND</p>
                          </div>
                          <button
                            type="button"
                            className="btn-choose"
                            onClick={handleReselectDeparture}
                          >
                            Reselect
                          </button>
                          <div>
                            <button type="button" className="text-[#475467]">
                              <i
                                className={`fa-solid ml-10 ${
                                  flightCollapseStates[index]
                                    ? 'fa-chevron-up'
                                    : 'fa-chevron-down'
                                }`}
                              ></i>
                            </button>
                          </div>
                        </div>
                        {flightCollapseStates[index] && (
                          <div className="flight-card-collapse">
                            <div>
                              <div className="flight-card-content">
                                <div className="flex flex-grow gap-[19px]">
                                  <div className="flight-item-card-steps">
                                    <div className="item-card-steps-big-dots"></div>
                                    <div className="item-card-steps-small-dots"></div>
                                    <div className="item-card-steps-small-dots"></div>
                                    <div className="item-card-steps-small-dots"></div>
                                    <div className="item-card-steps-small-dots"></div>
                                    <div className="item-card-steps-small-dots"></div>
                                    <div className="item-card-steps-big-dots"></div>
                                  </div>
                                  <div className="flex flex-col gap-3 justify-between">
                                    <div className="flex gap-2 items-center">
                                      <label className="text-[14px] font-bold cursor-pointer">
                                        {moment
                                          .utc(flight.departure_time)
                                          .format('DD/MM/YYYY HH:mm A')}
                                      </label>
                                      <div className="item-card-dots"></div>
                                      <label className="text-[14px] font-bold cursor-pointer">
                                        {
                                          flight
                                            .airports_flights_departure_airport_idToairports
                                            .airport_code
                                        }
                                      </label>
                                    </div>
                                    <p className="font-bold text-[14px] text-[#667085]">
                                      Trip time:&nbsp;
                                      {calculateTripTime(
                                        moment.utc(flight.departure_time),
                                        moment.utc(flight.arrival_time)
                                      )}
                                    </p>
                                    <div className="flex gap-2 items-center">
                                      <label className="text-[14px] font-bold cursor-pointer">
                                        {moment
                                          .utc(flight.arrival_time)
                                          .format('DD/MM/YYYY HH:mm A')}
                                      </label>
                                      <div className="item-card-dots"></div>
                                      <label className="text-[14px] font-bold cursor-pointer">
                                        {
                                          flight
                                            .airports_flights_arrival_airport_idToairports
                                            .airport_code
                                        }
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                  <div className="flight-logo">
                                    <img
                                      src={
                                        getAirlineInfo(flight.flight_number).src
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <p>
                                    Airline:&nbsp;
                                    {getAirlineInfo(flight.flight_number).name}
                                  </p>
                                  <p>Flight: {flight.flight_number}</p>
                                  <p>Seat class: {ticketClassLabel}</p>
                                  <p>Plane: 321</p>
                                  <p>Hand luggage: 1 piece x 12kg</p>
                                  <p>Checked baggage: 1 piece x 23kg</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return departureFlights.map((flight, index) => (
      <div key={index}>
        {index == 0 && (
          <div className="book-ticket-flight-item-card">
            <div
              onClick={() => setDropdownCollapse(!dropdownCollapse)}
              className={`collapse-header ${
                dropdownCollapse ? 'collapsed-header-off' : ''
              }`}
            >
              {index === 0 && (
                <div className="flight-card-header flex gap-0 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={48}
                    height={48}
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M19.1667 7.76666C19.2189 7.55255 19.1891 7.32665 19.0833 7.13333C18.8133 6.6647 18.4533 6.25401 18.0241 5.92483C17.5949 5.59565 17.105 5.35445 16.5824 5.21509C16.0597 5.07572 15.5147 5.04093 14.9786 5.1127C14.4425 5.18447 13.9259 5.3614 13.4583 5.63333L11.6667 6.66666L7.49999 4.70833C7.38154 4.64696 7.25007 4.61493 7.11666 4.61493C6.98325 4.61493 6.85179 4.64696 6.73333 4.70833L4.23333 6.15C4.10978 6.22126 4.00659 6.32305 3.93363 6.44561C3.86068 6.56818 3.8204 6.70741 3.81666 6.85C3.81263 6.99364 3.8458 7.13588 3.91297 7.26292C3.98014 7.38995 4.07901 7.49746 4.2 7.575L6.95 9.30833L5.49999 10.1417L1.51666 10.625C1.35653 10.6448 1.2056 10.7107 1.08218 10.8146C0.958764 10.9185 0.868172 11.0561 0.821404 11.2105C0.774636 11.3649 0.773703 11.5296 0.818719 11.6845C0.863735 11.8395 0.952763 11.978 1.07499 12.0833L4.02499 14.6333C4.41337 15.004 4.91075 15.2398 5.44353 15.3058C5.97632 15.3719 6.51621 15.2646 6.98333 15L18.75 8.275C18.8503 8.22294 18.9389 8.15103 19.0106 8.06365C19.0822 7.97626 19.1353 7.87522 19.1667 7.76666ZM6.22499 13.6C6.06492 13.6881 5.88033 13.7211 5.69964 13.694C5.51896 13.6669 5.35218 13.5812 5.225 13.45L3.64166 12.0917L5.91666 11.8167C6.02846 11.8023 6.13619 11.7655 6.23333 11.7083L9.03333 10.1C9.15807 10.028 9.26202 9.9249 9.33505 9.80076C9.40807 9.67662 9.44768 9.53567 9.45 9.39166C9.4517 9.24864 9.41657 9.10758 9.34798 8.98206C9.27938 8.85654 9.17963 8.7508 9.05833 8.675L6.30833 6.93333L7.225 6.40833L11.3917 8.34166C11.5101 8.40303 11.6416 8.43506 11.775 8.43506C11.9084 8.43506 12.0399 8.40303 12.1583 8.34166L14.2917 7.10833C14.7288 6.86333 15.2295 6.75538 15.7288 6.79847C16.2281 6.84156 16.7029 7.03371 17.0917 7.35L6.22499 13.6Z"
                      fill="#dcbb87"
                    />
                  </svg>
                  <div className="flight-card-details flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <label className="text-base font-bold cursor-pointer">
                        {
                          flight.airports_flights_departure_airport_idToairports
                            .airport_name
                        }
                      </label>
                      <i className="fa-solid fa-arrow-right"></i>
                      <label className="text-base font-bold cursor-pointer">
                        {
                          flight.airports_flights_arrival_airport_idToairports
                            .airport_name
                        }
                      </label>
                    </div>
                    <p className="font-bold text-[14px]">
                      {moment
                        .utc(flight.departure_time)
                        .format('dddd, DD/MM/YYYY')}
                    </p>
                  </div>
                  <button
                    className="text-[#dcbb87]"
                    type="button"
                    onClick={() => setDropdownCollapse(!dropdownCollapse)}
                  >
                    <i
                      className={`fa-solid ml-20 ${
                        dropdownCollapse ? 'fa-plus' : 'fa-minus'
                      }`}
                    ></i>
                  </button>
                </div>
              )}
            </div>
            {dropdownCollapse && (
              <div className="collapse-body">
                <div>
                  <div>
                    {index == 0 && (
                      <div className="flight-callendar">
                        {Array.from({ length: 5 }, (_, i) => {
                          const date = moment
                            .utc(flight.departure_time)
                            .subtract(2, 'days')
                            .add(i, 'days');
                          return (
                            <div
                              key={i}
                              className={`flight-callendar-item ${
                                date.isSame(
                                  moment(flight.departure_time),
                                  'day'
                                )
                                  ? 'flight-callendar-item-active'
                                  : ''
                              }`}
                            >
                              <div className="flight-callendar-day">
                                {date.format('dddd')}
                              </div>
                              <div className="flight-callendar-date">
                                {date.format('DD')}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <div className="flight-card-list flex flex-col gap-4">
                      {departureFlights.map((flight, index) => (
                        <div key={index} className="flight-card">
                          <div
                            className={`flight-item-card flex items-center gap-4 ${
                              flightCollapseStates[index]
                                ? 'collapse-header-active'
                                : 'collapse-header'
                            }`}
                            onClick={() => {
                              const newCollapseStates = [
                                ...flightCollapseStates,
                              ];
                              newCollapseStates[index] =
                                !newCollapseStates[index];
                              setFlightCollapseStates(newCollapseStates);
                            }}
                          >
                            <div className="flight-group">
                              <div className="flex items-center gap-4">
                                <div className="flight-logo">
                                  <div className="flight-logo-child">
                                    <img
                                      src={
                                        getAirlineInfo(flight.flight_number).src
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col flex-grow gap-1 text-left">
                                  <label className="text-[14px] font-bold">
                                    {flight.flight_number}
                                  </label>
                                  <p className="text-[14px] font-normal">
                                    {getAirlineInfo(flight.flight_number).name}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flight-group">
                              <div className="flex items-center gap-4">
                                <div className="flight-card-destination">
                                  <label className="text-[14px] font-bold">
                                    {moment
                                      .utc(flight.departure_time)
                                      .format('HH:mm')}
                                  </label>
                                  <p className="text-[14px] font-normal">
                                    {
                                      flight
                                        .airports_flights_departure_airport_idToairports
                                        .airport_code
                                    }
                                  </p>
                                </div>
                                <div className="flight-card-destination">
                                  <label className="text-[14px] font-bold">
                                    {moment
                                      .utc(flight.arrival_time)
                                      .format('HH:mm')}
                                  </label>
                                  <p className="text-[14px] font-normal">
                                    {
                                      flight
                                        .airports_flights_arrival_airport_idToairports
                                        .airport_code
                                    }
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flght-card-price">
                              <label className="text-[14px] font-bold">
                                {calculateTicketPrice(
                                  flight,
                                  adults,
                                  children,
                                  infants,
                                  ticketClass
                                )}
                              </label>
                              <p className="text-[14px] font-normal">VND</p>
                            </div>
                            <button
                              type="button"
                              className="btn-choose"
                              onClick={() =>
                                handleSelectDepartureFlight(flight, index)
                              }
                            >
                              Choose
                            </button>
                            <div>
                              <button type="button" className="text-[#475467]">
                                <i
                                  className={`fa-solid ${
                                    flightCollapseStates[index]
                                      ? 'fa-chevron-up'
                                      : 'fa-chevron-down'
                                  }`}
                                ></i>
                              </button>
                            </div>
                          </div>
                          {flightCollapseStates[index] && (
                            <div className="flight-card-collapse">
                              <div>
                                <div className="flight-card-content">
                                  <div className="flex flex-grow gap-[19px]">
                                    <div className="flight-item-card-steps">
                                      <div className="item-card-steps-big-dots"></div>
                                      <div className="item-card-steps-small-dots"></div>
                                      <div className="item-card-steps-small-dots"></div>
                                      <div className="item-card-steps-small-dots"></div>
                                      <div className="item-card-steps-small-dots"></div>
                                      <div className="item-card-steps-small-dots"></div>
                                      <div className="item-card-steps-big-dots"></div>
                                    </div>
                                    <div className="flex flex-col gap-3 justify-between">
                                      <div className="flex gap-2 items-center">
                                        <label className="text-[14px] font-bold cursor-pointer">
                                          {moment
                                            .utc(flight.departure_time)
                                            .format('DD/MM/YYYY HH:mm A')}
                                        </label>
                                        <div className="item-card-dots"></div>
                                        <label className="text-[14px] font-bold cursor-pointer">
                                          {
                                            flight
                                              .airports_flights_departure_airport_idToairports
                                              .airport_code
                                          }
                                        </label>
                                      </div>
                                      <p className="font-bold text-[14px] text-[#667085]">
                                        Trip time:&nbsp;
                                        {calculateTripTime(
                                          moment.utc(flight.departure_time),
                                          moment.utc(flight.arrival_time)
                                        )}
                                      </p>
                                      <div className="flex gap-2 items-center">
                                        <label className="text-[14px] font-bold cursor-pointer">
                                          {moment
                                            .utc(flight.arrival_time)
                                            .format('DD/MM/YYYY HH:mm A')}
                                        </label>
                                        <div className="item-card-dots"></div>
                                        <label className="text-[14px] font-bold cursor-pointer">
                                          {
                                            flight
                                              .airports_flights_arrival_airport_idToairports
                                              .airport_code
                                          }
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    <div className="flight-logo">
                                      <img
                                        src={
                                          getAirlineInfo(flight.flight_number)
                                            .src
                                        }
                                        alt=""
                                      />
                                    </div>
                                    <p>
                                      Airline:&nbsp;
                                      {
                                        getAirlineInfo(flight.flight_number)
                                          .name
                                      }
                                    </p>
                                    <p>Flight: {flight.flight_number}</p>
                                    <p>Seat class: {ticketClassLabel}</p>
                                    <p>Plane: 321</p>
                                    <p>Hand luggage: 1 piece x 12kg</p>
                                    <p>Checked baggage: 1 piece x 23kg</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    ));
  };
  const renderFlightReturn = (returnFlights) => {
    if (returnFlights.length === 0) {
      return (
        <div className="mr-40">
          <NotFoundFlightDestination />
        </div>
      );
    }

    if (selectedReturnFlight) {
      const flight = selectedReturnFlight;
      const index = selectedReturnFlightIndex;

      return (
        <div key={index}>
          <div className="book-ticket-flight-item-card">
            <div className="collapse-header">
              <div className="flight-card-header flex gap-0 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={48}
                  height={48}
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M17.6 13.525C17.3129 12.4729 16.6248 11.5754 15.6833 11.025L13.925 9.99997L13.525 5.44164C13.514 5.3085 13.4712 5.17995 13.4001 5.06682C13.3291 4.9537 13.2318 4.85932 13.1167 4.79164L10.6167 3.3583C10.49 3.28516 10.3463 3.24666 10.2 3.24666C10.0537 3.24666 9.91001 3.28516 9.78333 3.3583C9.65667 3.42747 9.55015 3.52835 9.47419 3.65106C9.39822 3.77376 9.35543 3.91409 9.35 4.0583L9.225 7.3083L7.76666 6.47497L5.38333 3.26664C5.28642 3.13805 5.15432 3.04029 5.00303 2.98519C4.85173 2.93009 4.68771 2.92 4.5308 2.95614C4.37389 2.99228 4.23081 3.07311 4.11886 3.18885C4.00691 3.30459 3.93089 3.45028 3.9 3.6083L3.175 7.44997C3.04874 7.97076 3.09316 8.51834 3.30171 9.01196C3.51027 9.50559 3.87191 9.91914 4.33333 10.1916L16.05 16.95C16.2383 17.0608 16.4626 17.0931 16.6746 17.0401C16.8866 16.9871 17.0693 16.853 17.1833 16.6666C17.4582 16.197 17.6366 15.6772 17.7082 15.1378C17.7797 14.5983 17.7429 14.05 17.6 13.525ZM16.0333 15L5.16666 8.74997C5.01083 8.65485 4.89056 8.51118 4.82431 8.34106C4.75807 8.17093 4.74953 7.98376 4.8 7.8083L5.18333 5.77497L6.56666 7.6083C6.63384 7.69952 6.7189 7.77608 6.81666 7.8333L9.60833 9.44997C9.73282 9.52197 9.87383 9.56052 10.0176 9.56189C10.1614 9.56325 10.3032 9.52737 10.429 9.45774C10.5548 9.38811 10.6605 9.2871 10.7357 9.16454C10.811 9.04198 10.8532 8.90203 10.8583 8.7583L10.9917 5.5083L11.9 6.0333L12.3 10.5916C12.3119 10.7256 12.356 10.8546 12.4285 10.9678C12.5011 11.081 12.5999 11.1749 12.7167 11.2416L14.85 12.5C15.1275 12.6601 15.3706 12.8736 15.5651 13.1282C15.7596 13.3828 15.9018 13.6734 15.9833 13.9833C16.0763 14.3141 16.0934 14.6616 16.0333 15Z"
                    fill="#dcbb87"
                  />
                </svg>
                <div className="flight-card-details flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <label className="text-base font-bold cursor-pointer">
                      {
                        flight.airports_flights_departure_airport_idToairports
                          .airport_name
                      }
                    </label>
                    <i className="fa-solid fa-arrow-right"></i>
                    <label className="text-base font-bold cursor-pointer">
                      {
                        flight.airports_flights_arrival_airport_idToairports
                          .airport_name
                      }
                    </label>
                  </div>
                  <p className="font-bold text-[14px]">
                    {moment
                      .utc(flight.departure_time)
                      .format('dddd, DD/MM/YYYY')}
                  </p>
                </div>
                <button className="text-[#dcbb87]" type="button">
                  <i className={`fa-solid ml-20 fa-plus`}></i>
                </button>
              </div>
              <div className="collapse-body">
                <div>
                  <div className="flight-callendar">
                    {Array.from({ length: 5 }, (_, i) => {
                      const date = moment
                        .utc(flight.departure_time)
                        .subtract(2, 'days')
                        .add(i, 'days');
                      return (
                        <div
                          key={i}
                          className={`flight-callendar-item ${
                            date.isSame(moment(flight.departure_time), 'day')
                              ? 'flight-callendar-item-active'
                              : ''
                          }`}
                        >
                          <div className="flight-callendar-day">
                            {date.format('dddd')}
                          </div>
                          <div className="flight-callendar-date">
                            {date.format('DD')}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flight-card-list flex flex-col gap-4">
                    <div className="flight-card fight-card-choose">
                      <div
                        className={`flight-item-card flex items-center ${
                          flightCollapseStates2[index]
                            ? 'collapse-header-active'
                            : 'collapse-header'
                        }`}
                        onClick={() => {
                          const newCollapseStates = [...flightCollapseStates2];
                          newCollapseStates[index] = !newCollapseStates[index];
                          setFlightCollapseStates2(newCollapseStates);
                        }}
                      >
                        <div className="flight-group">
                          <div className="flex items-center gap-4">
                            <div className="flight-logo">
                              <div className="flight-logo-child">
                                <img
                                  src={getAirlineInfo(flight.flight_number).src}
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="flex flex-col flex-grow gap-1 text-left">
                              <label className="text-[14px] font-bold">
                                {flight.flight_number}
                              </label>
                              <p className="text-[14px] font-normal">
                                {getAirlineInfo(flight.flight_number).name}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flight-group">
                          <div className="flex items-center gap-4">
                            <div className="flight-card-destination">
                              <label className="text-[14px] font-bold">
                                {moment
                                  .utc(flight.departure_time)
                                  .format('HH:mm')}
                              </label>
                              <p className="text-[14px] font-normal">
                                {
                                  flight
                                    .airports_flights_departure_airport_idToairports
                                    .airport_code
                                }
                              </p>
                            </div>
                            <div className="flight-card-destination">
                              <label className="text-[14px] font-bold">
                                {moment
                                  .utc(flight.arrival_time)
                                  .format('HH:mm')}
                              </label>
                              <p className="text-[14px] font-normal">
                                {
                                  flight
                                    .airports_flights_arrival_airport_idToairports
                                    .airport_code
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flght-card-price">
                          <label className="text-[14px] font-bold">
                            {calculateTicketPrice(
                              flight,
                              adults,
                              children,
                              infants,
                              ticketClass
                            )}
                          </label>
                          <p className="text-[14px] font-normal">VND</p>
                        </div>
                        <button
                          type="button"
                          className="btn-choose"
                          onClick={handleReselectReturn}
                        >
                          Reselect
                        </button>
                        <div>
                          <button type="button" className="text-[#475467]">
                            <i
                              className={`fa-solid ml-10 ${
                                flightCollapseStates2[index]
                                  ? 'fa-chevron-up'
                                  : 'fa-chevron-down'
                              }`}
                            ></i>
                          </button>
                        </div>
                      </div>
                      {flightCollapseStates2[index] && (
                        <div className="flight-card-collapse">
                          <div>
                            <div className="flight-card-content">
                              <div className="flex flex-grow gap-[19px]">
                                <div className="flight-item-card-steps">
                                  <div className="item-card-steps-big-dots"></div>
                                  <div className="item-card-steps-small-dots"></div>
                                  <div className="item-card-steps-small-dots"></div>
                                  <div className="item-card-steps-small-dots"></div>
                                  <div className="item-card-steps-small-dots"></div>
                                  <div className="item-card-steps-small-dots"></div>
                                  <div className="item-card-steps-big-dots"></div>
                                </div>
                                <div className="flex flex-col gap-3 justify-between">
                                  <div className="flex gap-2 items-center">
                                    <label className="text-[14px] font-bold cursor-pointer">
                                      {moment
                                        .utc(flight.departure_time)
                                        .format('DD/MM/YYYY HH:mm A')}
                                    </label>
                                    <div className="item-card-dots"></div>
                                    <label className="text-[14px] font-bold cursor-pointer">
                                      {
                                        flight
                                          .airports_flights_departure_airport_idToairports
                                          .airport_code
                                      }
                                    </label>
                                  </div>
                                  <p className="font-bold text-[14px] text-[#667085]">
                                    Trip time:&nbsp;
                                    {calculateTripTime(
                                      moment.utc(flight.departure_time),
                                      moment.utc(flight.arrival_time)
                                    )}
                                  </p>
                                  <div className="flex gap-2 items-center">
                                    <label className="text-[14px] font-bold cursor-pointer">
                                      {moment
                                        .utc(flight.arrival_time)
                                        .format('DD/MM/YYYY HH:mm A')}
                                    </label>
                                    <div className="item-card-dots"></div>
                                    <label className="text-[14px] font-bold cursor-pointer">
                                      {
                                        flight
                                          .airports_flights_arrival_airport_idToairports
                                          .airport_code
                                      }
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2">
                                <div className="flight-logo">
                                  <img
                                    src={
                                      getAirlineInfo(flight.flight_number).src
                                    }
                                    alt=""
                                  />
                                </div>
                                <p>
                                  Airline:&nbsp;
                                  {getAirlineInfo(flight.flight_number).name}
                                </p>
                                <p>Flight: {flight.flight_number}</p>
                                <p>Seat class: {ticketClassLabel}</p>
                                <p>Plane: 321</p>
                                <p>Hand luggage: 1 piece x 12kg</p>
                                <p>Checked baggage: 1 piece x 23kg</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return returnFlights.map((flight, index) => (
      <div key={index}>
        {index === 0 && (
          <div className="book-ticket-flight-item-card">
            <div
              onClick={() => setDropdownCollapse2(!dropdownCollapse2)}
              className={`collapse-header ${
                dropdownCollapse2 ? 'collapsed-header-off' : ''
              }`}
            >
              <div className="flight-card-header flex gap-0 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={48}
                  height={48}
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M17.6 13.525C17.3129 12.4729 16.6248 11.5754 15.6833 11.025L13.925 9.99997L13.525 5.44164C13.514 5.3085 13.4712 5.17995 13.4001 5.06682C13.3291 4.9537 13.2318 4.85932 13.1167 4.79164L10.6167 3.3583C10.49 3.28516 10.3463 3.24666 10.2 3.24666C10.0537 3.24666 9.91001 3.28516 9.78333 3.3583C9.65667 3.42747 9.55015 3.52835 9.47419 3.65106C9.39822 3.77376 9.35543 3.91409 9.35 4.0583L9.225 7.3083L7.76666 6.47497L5.38333 3.26664C5.28642 3.13805 5.15432 3.04029 5.00303 2.98519C4.85173 2.93009 4.68771 2.92 4.5308 2.95614C4.37389 2.99228 4.23081 3.07311 4.11886 3.18885C4.00691 3.30459 3.93089 3.45028 3.9 3.6083L3.175 7.44997C3.04874 7.97076 3.09316 8.51834 3.30171 9.01196C3.51027 9.50559 3.87191 9.91914 4.33333 10.1916L16.05 16.95C16.2383 17.0608 16.4626 17.0931 16.6746 17.0401C16.8866 16.9871 17.0693 16.853 17.1833 16.6666C17.4582 16.197 17.6366 15.6772 17.7082 15.1378C17.7797 14.5983 17.7429 14.05 17.6 13.525ZM16.0333 15L5.16666 8.74997C5.01083 8.65485 4.89056 8.51118 4.82431 8.34106C4.75807 8.17093 4.74953 7.98376 4.8 7.8083L5.18333 5.77497L6.56666 7.6083C6.63384 7.69952 6.7189 7.77608 6.81666 7.8333L9.60833 9.44997C9.73282 9.52197 9.87383 9.56052 10.0176 9.56189C10.1614 9.56325 10.3032 9.52737 10.429 9.45774C10.5548 9.38811 10.6605 9.2871 10.7357 9.16454C10.811 9.04198 10.8532 8.90203 10.8583 8.7583L10.9917 5.5083L11.9 6.0333L12.3 10.5916C12.3119 10.7256 12.356 10.8546 12.4285 10.9678C12.5011 11.081 12.5999 11.1749 12.7167 11.2416L14.85 12.5C15.1275 12.6601 15.3706 12.8736 15.5651 13.1282C15.7596 13.3828 15.9018 13.6734 15.9833 13.9833C16.0763 14.3141 16.0934 14.6616 16.0333 15Z"
                    fill="#dcbb87"
                  />
                </svg>
                <div className="flight-card-details flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <label className="text-base font-bold cursor-pointer">
                      {
                        flight.airports_flights_departure_airport_idToairports
                          .airport_name
                      }
                    </label>
                    <i className="fa-solid fa-arrow-right"></i>
                    <label className="text-base font-bold cursor-pointer">
                      {
                        flight.airports_flights_arrival_airport_idToairports
                          .airport_name
                      }
                    </label>
                  </div>
                  <p className="font-bold text-[14px]">
                    {moment
                      .utc(flight.departure_time)
                      .format('dddd, DD/MM/YYYY')}
                  </p>
                </div>
                <button
                  className="text-[#dcbb87]"
                  type="button"
                  onClick={() => setDropdownCollapse2(!dropdownCollapse2)}
                >
                  <i
                    className={`fa-solid ml-20 ${
                      dropdownCollapse2 ? 'fa-plus' : 'fa-minus'
                    }`}
                  ></i>
                </button>
              </div>
            </div>
            {dropdownCollapse2 && (
              <div className="collapse-body">
                <div>
                  <div className="flight-callendar">
                    {Array.from({ length: 5 }, (_, i) => {
                      const date = moment
                        .utc(flight.departure_time)
                        .subtract(2, 'days')
                        .add(i, 'days');
                      return (
                        <div
                          key={i}
                          className={`flight-callendar-item ${
                            date.isSame(moment(flight.departure_time), 'day')
                              ? 'flight-callendar-item-active'
                              : ''
                          }`}
                        >
                          <div className="flight-callendar-day">
                            {date.format('dddd')}
                          </div>
                          <div className="flight-callendar-date">
                            {date.format('DD')}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flight-card-list flex flex-col gap-4">
                    {returnFlights.map((flight, index) => (
                      <div key={index} className="flight-card">
                        <div
                          className={`flight-item-card flex items-center gap-4 ${
                            flightCollapseStates2[index]
                              ? 'collapse-header-active'
                              : 'collapse-header'
                          }`}
                          onClick={() => {
                            const newCollapseStates = [
                              ...flightCollapseStates2,
                            ];
                            newCollapseStates[index] =
                              !newCollapseStates[index];
                            setFlightCollapseStates2(newCollapseStates);
                          }}
                        >
                          <div className="flight-group">
                            <div className="flex items-center gap-4">
                              <div className="flight-logo">
                                <div className="flight-logo-child">
                                  <img
                                    src={
                                      getAirlineInfo(flight.flight_number).src
                                    }
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col flex-grow gap-1 text-left">
                                <label className="text-[14px] font-bold">
                                  {flight.flight_number}
                                </label>
                                <p className="text-[14px] font-normal">
                                  {getAirlineInfo(flight.flight_number).name}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flight-group">
                            <div className="flex items-center gap-4">
                              <div className="flight-card-destination">
                                <label className="text-[14px] font-bold">
                                  {moment
                                    .utc(flight.departure_time)
                                    .format('HH:mm')}
                                </label>
                                <p className="text-[14px] font-normal">
                                  {
                                    flight
                                      .airports_flights_departure_airport_idToairports
                                      .airport_code
                                  }
                                </p>
                              </div>
                              <div className="flight-card-destination">
                                <label className="text-[14px] font-bold">
                                  {moment
                                    .utc(flight.arrival_time)
                                    .format('HH:mm')}
                                </label>
                                <p className="text-[14px] font-normal">
                                  {
                                    flight
                                      .airports_flights_arrival_airport_idToairports
                                      .airport_code
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flght-card-price">
                            <label className="text-[14px] font-bold">
                              {calculateTicketPrice(
                                flight,
                                adults,
                                children,
                                infants,
                                ticketClass
                              )}
                            </label>
                            <p className="text-[14px] font-normal">VND</p>
                          </div>
                          <button
                            type="button"
                            className="btn-choose"
                            onClick={() =>
                              handleSelectReturnFlight(flight, index)
                            }
                          >
                            Choose
                          </button>
                          <div>
                            <button type="button" className="text-[#475467]">
                              <i
                                className={`fa-solid ${
                                  flightCollapseStates2[index]
                                    ? 'fa-chevron-up'
                                    : 'fa-chevron-down'
                                }`}
                              ></i>
                            </button>
                          </div>
                        </div>
                        {flightCollapseStates2[index] && (
                          <div className="flight-card-collapse">
                            <div>
                              <div className="flight-card-content">
                                <div className="flex flex-grow gap-[19px]">
                                  <div className="flight-item-card-steps">
                                    <div className="item-card-steps-big-dots"></div>
                                    <div className="item-card-steps-small-dots"></div>
                                    <div className="item-card-steps-small-dots"></div>
                                    <div className="item-card-steps-small-dots"></div>
                                    <div className="item-card-steps-small-dots"></div>
                                    <div className="item-card-steps-small-dots"></div>
                                    <div className="item-card-steps-big-dots"></div>
                                  </div>
                                  <div className="flex flex-col gap-3 justify-between">
                                    <div className="flex gap-2 items-center">
                                      <label className="text-[14px] font-bold cursor-pointer">
                                        {moment
                                          .utc(flight.departure_time)
                                          .format('DD/MM/YYYY HH:mm A')}
                                      </label>
                                      <div className="item-card-dots"></div>
                                      <label className="text-[14px] font-bold cursor-pointer">
                                        {
                                          flight
                                            .airports_flights_departure_airport_idToairports
                                            .airport_code
                                        }
                                      </label>
                                    </div>
                                    <p className="font-bold text-[14px] text-[#667085]">
                                      Trip time:&nbsp;
                                      {calculateTripTime(
                                        moment.utc(flight.departure_time),
                                        moment.utc(flight.arrival_time)
                                      )}
                                    </p>
                                    <div className="flex gap-2 items-center">
                                      <label className="text-[14px] font-bold cursor-pointer">
                                        {moment
                                          .utc(flight.arrival_time)
                                          .format('DD/MM/YYYY HH:mm A')}
                                      </label>
                                      <div className="item-card-dots"></div>
                                      <label className="text-[14px] font-bold cursor-pointer">
                                        {
                                          flight
                                            .airports_flights_arrival_airport_idToairports
                                            .airport_code
                                        }
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                  <div className="flight-logo">
                                    <img
                                      src={
                                        getAirlineInfo(flight.flight_number).src
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <p>
                                    Airline:&nbsp;
                                    {getAirlineInfo(flight.flight_number).name}
                                  </p>
                                  <p>Flight: {flight.flight_number}</p>
                                  <p>Seat class: {ticketClassLabel}</p>
                                  <p>Plane: 321</p>
                                  <p>Hand luggage: 1 piece x 12kg</p>
                                  <p>Checked baggage: 1 piece x 23kg</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    ));
  };
  const token = localStorage.getItem('LOGIN_USER');
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;

  return (
    <div className="book-ticket-flight flex justify-between gap-14 mx-10">
      <div className="book-ticket-filter">
        <BookTicketSideBar
          infoFlight={infoFlight}
          infoFlightDeparture={infoFlightDeparture}
          infoFlightReturn={infoFlightReturn}
          adults={adults}
          children={children}
          infants={infants}
          ticketClass={ticketClass}
          ticketType={ticketType}
        />
      </div>
      <div className="book-ticket-flight-list flex flex-col items-center gap-4">
        {departureFlights !== undefined ? (
          <>
            <div>{renderFlightDeparture(departureFlights)}</div>
            <div>{renderFlightReturn(returnFlights)}</div>
          </>
        ) : (
          <div>{renderFlightOnly(arrFlight)}</div>
        )}
        {step == 0 ? (
          <></>
        ) : step == 1 ? (
          <>
            <BookTicketForm
              adults={adults}
              children={children}
              infants={infants}
              selectedFlight={selectedFlight}
              selectedDepartureFlight={selectedDepartureFlight}
              selectedReturnFlight={selectedReturnFlight}
              ticketClassLabel={ticketClassLabel}
              ticketType={ticketType}
              user_id={user_id}
            />
          </>
        ) : step == 2 ? (
          <Payment />
        ) : null}
      </div>
    </div>
  );
};

export default BookTicketContent;

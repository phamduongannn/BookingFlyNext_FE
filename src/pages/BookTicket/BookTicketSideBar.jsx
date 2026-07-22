import { Checkbox } from 'antd';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTotalPrice } from '../../redux/Slice/ticketSlice';

const BookTicketSideBar = ({
  infoFlight,
  infoFlightDeparture,
  infoFlightReturn,
  adults,
  children,
  infants,
  ticketClass,
  ticketType,
}) => {
  const { step } = useSelector((state) => state.ticketSlice);
  const airlines = {
    VN: { src: '/img/VN.png', name: 'Vietnam Airlines' },
    VJ: { src: '/img/VJ.png', name: 'VietJet Air' },
    QH: { src: '/img/QH.png', name: 'Bamboo Airways' },
    VU: { src: '/img/VU.png', name: 'Vietravel Airlines' },
    BL: { src: '/img/BL.png', name: 'Pacific Airlines' },
  };
  const getAirlineInfo = (flightNumber) => {
    if (!flightNumber) {
      return null;
    }
    const airlineCode = flightNumber.substring(0, 2);
    return airlines[airlineCode];
  };
  const calculateTicketPrice = (
    infoFlight,
    adults,
    children,
    infants,
    ticketClass
  ) => {
    const airlineInfo = getAirlineInfo(infoFlight.flight_number);
    if (!airlineInfo) return 0;
    const adultPrice = infoFlight.price;
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
      return total * 1.05;
    } else {
      return total;
    }
  };
  const renderTicketDetails = (flight) => {
    if (!flight) return null;

    const airlineInfo = getAirlineInfo(flight.flight_number);
    const total = calculateTicketPrice(
      flight,
      adults,
      children,
      infants,
      ticketClass
    );
    dispatch(setTotalPrice(total));
    return (
      <div className="filter-side-bar flex flex-col">
        <div className="filter-side-bar-header">
          <div className="filter-side-bar-title flex-grow">
            Ticket price details
          </div>
        </div>
        <div className="filter-side-bar-main">
          <div className="filter-side-bar-item">
            <div className="flex flex-col gap-[16px]">
              <div className="flex gap-[12px]">
                <div className="w-[45px] h-[45px]">
                  <div className="w-full h-full relative overflow-hidden">
                    <img src={airlineInfo?.src} alt="" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-base font-bold">
                    {
                      flight?.airports_flights_departure_airport_idToairports
                        ?.airport_code
                    }{' '}
                    →{' '}
                    {
                      flight?.airports_flights_arrival_airport_idToairports
                        ?.airport_code
                    }
                  </label>
                  <p className="text-[14px] font-normal">
                    {moment.utc(flight?.departure_time).format('HH:mm')},{' '}
                    {moment.utc(flight?.departure_time).format('DD/MM/YYYY')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="filter-side-bar-item">
            <label className="text-base font-bold">Ticket summary</label>
            <div className="flex flex-col gap-[16px]">
              {adults > 0 && (
                <div className="flex flex-col gap-[4px]">
                  <p className="text-[14px] font-bold">Adult</p>
                  <label className="text-[14px] font-semibold">
                    {adults} x {flight?.price?.toLocaleString('vi-VN')} VND
                  </label>
                </div>
              )}
              {children > 0 && (
                <div className="flex flex-col gap-[4px]">
                  <p className="text-[14px] font-bold">Children</p>
                  <label className="text-[14px] font-semibold">
                    {children} x{' '}
                    {(
                      flight?.price *
                      (airlineInfo?.name === 'Bamboo Airways' ? 0.75 : 0.9)
                    ).toLocaleString('vi-VN')}{' '}
                    VND
                  </label>
                </div>
              )}
              {infants > 0 && (
                <div className="flex flex-col gap-[4px]">
                  <p className="text-[14px] font-bold">Infants</p>
                  <label className="text-[14px] font-semibold">
                    {infants} x{' '}
                    {airlineInfo?.name === 'Bamboo Airways'
                      ? '108,000'
                      : '110,000'}{' '}
                    VND
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className="filter-side-bar-item">
            <label className="text-base font-bold">Signed luggage</label>
            <div className="flex gap-16">
              <div className="flex flex-col gap-4">
                <div>1 piece x 12kg</div>
                <div>1 piece x 23kg</div>
              </div>
            </div>
          </div>
          <div className="filter-side-bar-item">
            <div className="flex justify-between gap-[12px] w-full">
              <label className="text-base font-bold">Total</label>
              <p className="text-[14px] font-bold">
                {total.toLocaleString('vi-VN')} VND
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const dispatch = useDispatch();
  const renderTicketDetailsDouble = (flightDeparture, flightReturn) => {
    if (!flightDeparture) return null;

    const airlineInfoDeparture = getAirlineInfo(flightDeparture.flight_number);
    const airlineInfoReturn = getAirlineInfo(flightReturn.flight_number);

    const totalDeparture = calculateTicketPrice(
      flightDeparture,
      adults,
      children,
      infants,
      ticketClass
    );

    const totalReturn = calculateTicketPrice(
      flightReturn,
      adults,
      children,
      infants,
      ticketClass
    );
    const total = totalDeparture + totalReturn;
    dispatch(setTotalPrice(total));
    return (
      <div className="filter-side-bar flex flex-col">
        <div className="filter-side-bar-header">
          <div className="filter-side-bar-title flex-grow">
            Ticket price details
          </div>
        </div>
        <div className="filter-side-bar-main">
          <div className="filter-side-bar-item">
            <div className="flex flex-col gap-[16px]">
              <div className="flex gap-[12px]">
                <div className="w-[45px] h-[45px]">
                  <div className="w-full h-full relative overflow-hidden">
                    <img src={airlineInfoDeparture?.src} alt="" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-base font-bold">
                    {
                      flightDeparture
                        ?.airports_flights_departure_airport_idToairports
                        ?.airport_code
                    }{' '}
                    →{' '}
                    {
                      flightDeparture
                        ?.airports_flights_arrival_airport_idToairports
                        ?.airport_code
                    }
                  </label>
                  <p className="text-[14px] font-normal">
                    {moment
                      .utc(flightDeparture?.departure_time)
                      .format('HH:mm')}
                    ,{' '}
                    {moment
                      .utc(flightDeparture?.departure_time)
                      .format('DD/MM/YYYY')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="filter-side-bar-item">
            <label className="text-base font-bold">
              Ticket summary (Departure)
            </label>
            <div className="flex flex-col gap-[16px]">
              {adults > 0 && (
                <div className="flex flex-col gap-[4px]">
                  <p className="text-[14px] font-bold">Adult</p>
                  <label className="text-[14px] font-semibold">
                    {adults} x {flightDeparture?.price?.toLocaleString('vi-VN')}{' '}
                    VND
                  </label>
                </div>
              )}
              {children > 0 && (
                <div className="flex flex-col gap-[4px]">
                  <p className="text-[14px] font-bold">Children</p>
                  <label className="text-[14px] font-semibold">
                    {children} x{' '}
                    {(
                      flightDeparture?.price *
                      (airlineInfoDeparture?.name === 'Bamboo Airways'
                        ? 0.75
                        : 0.9)
                    ).toLocaleString('vi-VN')}{' '}
                    VND
                  </label>
                </div>
              )}
              {infants > 0 && (
                <div className="flex flex-col gap-[4px]">
                  <p className="text-[14px] font-bold">Infants</p>
                  <label className="text-[14px] font-semibold">
                    {infants} x{' '}
                    {airlineInfoDeparture?.name === 'Bamboo Airways'
                      ? '108,000'
                      : '110,000'}{' '}
                    VND
                  </label>
                </div>
              )}
            </div>
          </div>
          {flightReturn && (
            <>
              <div className="filter-side-bar-item">
                <div className="flex flex-col gap-[16px]">
                  <div className="flex gap-[12px]">
                    <div className="w-[45px] h-[45px]">
                      <div className="w-full h-full relative overflow-hidden">
                        <img src={airlineInfoReturn?.src} alt="" />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-base font-bold">
                        {
                          flightReturn
                            ?.airports_flights_departure_airport_idToairports
                            ?.airport_code
                        }{' '}
                        →{' '}
                        {
                          flightReturn
                            ?.airports_flights_arrival_airport_idToairports
                            ?.airport_code
                        }
                      </label>
                      <p className="text-[14px] font-normal">
                        {moment
                          .utc(flightReturn?.departure_time)
                          .format('HH:mm')}
                        ,{' '}
                        {moment
                          .utc(flightReturn?.departure_time)
                          .format('DD/MM/YYYY')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter-side-bar-item">
                <label className="text-base font-bold">
                  Ticket summary (Return)
                </label>
                <div className="flex flex-col gap-[16px]">
                  {adults > 0 && (
                    <div className="flex flex-col gap-[4px]">
                      <p className="text-[14px] font-bold">Adult</p>
                      <label className="text-[14px] font-semibold">
                        {adults} x{' '}
                        {flightReturn?.price?.toLocaleString('vi-VN')} VND
                      </label>
                    </div>
                  )}
                  {children > 0 && (
                    <div className="flex flex-col gap-[4px]">
                      <p className="text-[14px] font-bold">Children</p>
                      <label className="text-[14px] font-semibold">
                        {children} x{' '}
                        {(
                          flightReturn?.price *
                          (airlineInfoReturn?.name === 'Bamboo Airways'
                            ? 0.75
                            : 0.9)
                        ).toLocaleString('vi-VN')}{' '}
                        VND
                      </label>
                    </div>
                  )}
                  {infants > 0 && (
                    <div className="flex flex-col gap-[4px]">
                      <p className="text-[14px] font-bold">Infants</p>
                      <label className="text-[14px] font-semibold">
                        {infants} x{' '}
                        {airlineInfoReturn?.name === 'Bamboo Airways'
                          ? '108,000'
                          : '110,000'}{' '}
                        VND
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="filter-side-bar-item">
            <label className="text-base font-bold">Signed luggage</label>
            <div className="flex gap-16">
              <div className="flex flex-col gap-4">
                <div>1 piece x 12kg</div>
                <div>1 piece x 23kg</div>
              </div>
            </div>
          </div>
          <div className="filter-side-bar-item">
            <div className="flex justify-between gap-[12px] w-full">
              <label className="text-base font-bold">Total</label>
              <p className="text-[14px] font-bold">
                {total.toLocaleString('vi-VN')} VND
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      {step === 0 ? (
        <div className="filter-side-bar flex flex-col">
          <div className="filter-side-bar-header">
            <div className="filter-side-bar-title flex-grow">
              Filter results
            </div>
          </div>
          <div className="filter-side-bar-main">
            <div className="filter-side-bar-item">
              <label className="text-base font-bold leading-6">Show by</label>
              <Checkbox>Vietnam Airlines</Checkbox>
              <Checkbox>VietJet Air</Checkbox>
              <Checkbox>Bamboo Airways</Checkbox>
              <Checkbox>Vietravel Airlines</Checkbox>
              <Checkbox>Pacific Airlines</Checkbox>
            </div>
          </div>
        </div>
      ) : step === 1 ? (
        <>
          {ticketType === 'one-way' &&
            infoFlight &&
            renderTicketDetails(infoFlight)}
          {ticketType === 'round-trip' &&
            infoFlightDeparture &&
            infoFlightReturn &&
            renderTicketDetailsDouble(infoFlightDeparture, infoFlightReturn)}
        </>
      ) : step == 2 ? (
        <div>2</div>
      ) : null}
    </div>
  );
};

export default BookTicketSideBar;

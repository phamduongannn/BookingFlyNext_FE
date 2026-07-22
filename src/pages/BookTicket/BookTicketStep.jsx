import React from 'react';
import { useSelector } from 'react-redux';

const BookTicketStep = () => {
  const { step } = useSelector((state) => state.ticketSlice);

  const steps = [
    { title: 'Select flight', description: 'Please select a flight' },
    {
      title: 'Reservations',
      description: 'Fill in the information to make a reservation',
    },
    { title: 'Payment', description: 'Pay to receive air tickets' },
  ];

  return (
    <div className="book-ticket-step m-auto">
      <div className="step-by-step flex gap-4 items-center">
        {steps.map((s, index) => (
          <div
            key={index}
            className={`step-by-step-item flex flex-col gap-4 items-center justify-center text-center`}
          >
            <div
              className={`step-by-step-icon ${
                step === index ? '' : 'step-by-step-icon-non-active'
              }`}
            ></div>
            <div className="step-by-step-body">
              <p className="sub-headding">{s.title}</p>
              <p className="sub-content">{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookTicketStep;

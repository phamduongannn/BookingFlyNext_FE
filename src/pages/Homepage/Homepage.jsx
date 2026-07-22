import React from 'react';
import Banner from '../../layout/Banner/Banner';
import Ticket from '../../layout/Ticket/Ticket';
import Benefits from '../../layout/Benefits/Benefits';
import Feedback from '../../layout/Feedback/Feedback';
import Partner from '../../layout/Partner/Partner';
import Blog from '../../layout/Blog/Blog';
import Chatbox from '../../components/ChatBox/ChatBox';

const Homepage = () => {
  return (
    <>
      <Banner />
      <Ticket />
      <Benefits />
      <Partner />
      <Feedback />
      <Blog />
      <Chatbox />
    </>
  );
};

export default Homepage;

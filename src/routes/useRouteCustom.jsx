import { useRoutes } from 'react-router-dom';
import { path } from '../common/path';
import AboutPage from '../pages/AbouPage/AboutPage';
import Homepage from '../pages/Homepage/Homepage';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import HomeTemplate from '../templates/HomeTemplate/HomeTemplate';
import AdminTemplate from '../templates/AdminTemplate/AdminTemplate';
import Dashboard from '../pages/AdminPage/Dashboard/Dashboard';
import AnnualRevenue from '../pages/AdminPage/AnnualRevenue/AnnualRevenue';
import RevenueByFlight from '../pages/AdminPage/RevenueByFlight/RevenueByFlight';
import FlightList from '../pages/AdminPage/FlightList/FlightList';
import AddFlight from '../pages/AdminPage/AddFlight/AddFlight';
import NotFound from '../pages/NotFound/NotFound';
import BookTicket from '../pages/BookTicket/BookTicket';
import BookTicketTemplate from '../templates/BookTicketTemplate/BookTicketTemplate';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import ChatSupport from '../pages/AdminPage/ChatSupport/ChatSupport';
import TicketDashboard from '../pages/AdminPage/TicketDashboard/TicketDashboard';
import UserList from '../pages/AdminPage/UserList/UserList';
import PageTemplate from '../templates/PagesTemplate/PageTemplate';
import BlogPage from '../pages/BlogPage/BlogPage';

const useRouteCustom = () => {
  const route = useRoutes([
    {
      path: path.homepage,
      element: <HomeTemplate />,
      children: [
        {
          index: true,
          element: <Homepage />,
        },
      ],
    },
    {
      path: path.admin.base,
      element: <AdminTemplate />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: path.admin.annualRevenue,
          element: <AnnualRevenue />,
        },
        {
          path: path.admin.revenueByFlight,
          element: <RevenueByFlight />,
        },
        {
          path: path.admin.flightList,
          element: <FlightList />,
        },
        {
          path: path.admin.addFlight,
          element: <AddFlight />,
        },
        {
          path: path.admin.chat,
          element: <ChatSupport />,
        },
        {
          path: path.admin.ticketDashboard,
          element: <TicketDashboard />,
        },
        {
          path: path.admin.user,
          element: <UserList />,
        },
      ],
    },
    {
      path: path.bookTicket,
      element: <BookTicketTemplate />,
      children: [
        {
          index: true,
          element: <BookTicket />,
        },
      ],
    },
    {
      path: path.login,
      element: <LoginPage />,
    },
    {
      path: path.signup,
      element: <SignUpPage />,
    },
    {
      path: path.about,
      element: <AboutPage />,
    },
    {
      path: path.profile,
      element: <ProfilePage />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
    {
      path: path.pages,
      element: <PageTemplate />
    },
    {
      path: path.blog,
      element: <BlogPage />
    }
  ]);
 
  return route;
};

export default useRouteCustom;

import { Breadcrumb, Layout, Menu, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { path } from '../../common/path';
import './AdminTemplate.scss';
import { Helmet } from 'react-helmet';
import { userServ } from '../../services/userServ';
import { getLocalStorage } from '../../utils/localStorage';
import { jwtDecode } from 'jwt-decode';
const { Header, Content, Footer, Sider } = Layout;
import { useDispatch, useSelector } from 'react-redux';
import {
  handleTurnOffLoading,
  handleTurnOnLoading,
} from '../../redux/Slice/loadingSlice';
import LoadingAnimation from '../../Components/Animation/LoadingAnimation';

const arrMenu = [
  {
    key: 'trangChu',
    type: 'group',
    children: [
      {
        key: 'homepage',
        label: <Link to={path.homepage}>Home Page</Link>,
        icon: (
          <img
            src="/img/logo-FlyNext.png"
            alt="home"
            className="animate__animated animat`e`__fadeInLeft w-full h-full"
          />
        ),
      },
    ],
  },
  {
    key: 'dashboardAdmin',
    type: 'group',
    children: [
      {
        key: 'dashboard',
        label: <Link to={path.admin.base}>Dashboard</Link>,
        icon: <i className="fa-solid fa-house"></i>,
      },
    ],
  },
  {
    key: 'quanliDoanhThu',
    label: 'Revenue Management',
    type: 'group',
    children: [
      {
        key: 'doanhThuNam',
        label: <Link to={path.admin.annualRevenue}>Annual Revenue</Link>,
        icon: <i className="fa-solid fa-chart-simple"></i>,
      },
      {
        key: 'doanhThuTheoFlight',
        label: <Link to={path.admin.revenueByFlight}>Revenue by Flight</Link>,
        icon: <i className="fa-solid fa-chart-line"></i>,
      },
    ],
  },
  {
    key: 'quanliChuyenBay',
    label: 'Flight Management',
    type: 'group',
    children: [
      {
        key: 'flightList',
        label: <Link to={path.admin.flightList}>Flight List</Link>,
        icon: <img src="/img/calendar-flight.png" alt="flight" />,
      },
      {
        key: 'addFlight',
        label: <Link to={path.admin.addFlight}>Add Flight</Link>,
        icon: <i className="fa-solid fa-plane"></i>,
      },
    ],
  },
  {
    key: 'quanliTicket',
    label: 'Ticket Management',
    type: 'group',
    children: [
      {
        key: 'ticketList',
        label: <Link to={path.admin.ticketDashboard}>Ticket List</Link>,
        icon: <img src="/img/ticket-flight.png" alt="ticket" />,
      },
    ],
  },
  {
    key: 'trungTamHoTro',
    label: 'Support Center',
    type: 'group',
    children: [
      {
        key: 'chatbox',
        label: <Link to={path.admin.chat}>Chat Support</Link>,
        icon: <i className="fa-brands fa-facebook-messenger"></i>,
      },
    ],
  },
  {
    key: 'quanliUser',
    label: 'User Management',
    type: 'group',
    children: [
      {
        key: 'quanLiNguoiDung',
        label: <Link to={path.admin.user}>User List</Link>,
        icon: <i className="fa-solid fa-users"></i>,
      },
    ],
  },
];
const AdminTemplate = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('Dashboard');
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const isLoading = useSelector((state) => state.loadingSlice.isLoading);
  const dispatch = useDispatch();
  const handleMenuClick = (e) => {
    const key = e.key;
    for (const group of arrMenu) {
      for (const item of group.children) {
        if (item.key === key) {
          setSelectedLabel(item.label);
          return;
        }
      }
    }
  };
  useEffect(() => {
    dispatch(handleTurnOnLoading());
    const user = getLocalStorage('LOGIN_USER');
    if (user) {
      const token = jwtDecode(user);
      userServ.getUserById(token.user_id).then((res) => {
        const { role } = res.data.data;
        if (role !== 'ADMIN') {
          window.location.href = path.homepage;
        }
        dispatch(handleTurnOffLoading());
      });
    } else {
      window.location.href = '*';
    }
  }, []);
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      {isLoading && <LoadingAnimation />}
      <Helmet>
        <title>Flynext | Management</title>
      </Helmet>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[
            location.pathname === '/admin' ? 'dashboard' : '',
          ]}
          mode="inline"
          items={arrMenu}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          children={
            <>
              <div className="header-admin-title flex justify-center items-center mt-[13px] font-bold text-4xl animate__animated animate__fadeInDown">
                <p>
                  Fly<span>next</span> Management
                </p>
              </div>
            </>
          }
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>{selectedLabel}</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Fly<span className="admin-footer">next</span> ©
          {new Date().getFullYear()} Created by Fly
          <span className="admin-footer">next</span> -
          <span className="admin-footer"> Group 8</span>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminTemplate;

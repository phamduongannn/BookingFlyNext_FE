import 'animate.css';
import { message } from 'antd';
import { createContext } from 'react';
import './App.scss';
import useRouteCustom from './routes/useRouteCustom';
import AOSProvider from './utils/AOSProvider.jsx';
import BackToTop from './components/BackToTop/BackToTop.jsx';

export const AlertContext = createContext();

function App() {
  const [messageApi, contextHolder] = message.useMessage();

  const myRoutes = useRouteCustom();
  const handleAlert = (type, content) => {
    messageApi.open({
      type,
      content,
    });
  };
  return (
    <AlertContext.Provider value={{ handleAlert }}>
      <AOSProvider>
        {contextHolder}
        {myRoutes}
        <BackToTop />
      </AOSProvider>
    </AlertContext.Provider>
  );
}

export default App;

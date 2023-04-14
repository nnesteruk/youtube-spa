import { Layout, Menu } from 'antd';
import React from 'react';
import icon from '../assets/img/youtube.ico';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearRequestAction } from '../redux/favorite/slice';
import { useTheme } from '../hooks/useTheme';

const { Header, Content } = Layout;

export const Wrap = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { requests } = useSelector((state) => state.favorites);

  const checkUser = () => {
    const token = localStorage.getItem('token');
    const partialToken = token.slice(0, token.indexOf('.'));
    const users = JSON.parse(localStorage.getItem('saved')) || [];
    const currentUser = users.find((user) => user.token === partialToken);

    if (!currentUser) {
      return localStorage.setItem(
        'saved',
        JSON.stringify([...users, { token: partialToken, data: [] }]),
      );
    }
    currentUser.data = [...requests];
    return localStorage.setItem('saved', JSON.stringify([...users]));
  };

  const home = () => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key !== 'token' && key !== 'saved') {
        localStorage.removeItem(key);
      }
    }
    navigate('/youtube-spa/main');
    window.location.reload();
  };

  return (
    <Layout className="layout ">
      <Header className="layout__header " id="head">
        <div className="header__container _container">
          <div className="header__logo">
            <img className="header__icon" src={icon} alt="Icon" onClick={() => home()} />
          </div>
          <Menu
            // theme="light"
            className="header__menu"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={['Поиск', 'Избранное', 'Выйти'].map((item, index) => {
              const key = index + 1;
              return {
                key,
                label: `${item}`,
              };
            })}
            onClick={(item) => {
              switch (item.key) {
                case '1':
                  navigate('/youtube-spa/main');
                  break;
                case '2':
                  navigate('/youtube-spa/main/favorites');
                  break;
                case '3':
                  navigate('/youtube-spa');
                  localStorage.clear();
                  dispatch(clearRequestAction());
                  break;
                default:
                  console.log('Unknown navigation');
              }
            }}
          />
        </div>
      </Header>
      <Content className="layout__content">
        <Outlet context={checkUser} />
      </Content>
    </Layout>
  );
};

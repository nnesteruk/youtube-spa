import { Layout, Menu } from 'antd';
import React from 'react';
import icon from '../assets/img/youtube.ico';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Header, Content } = Layout;

export const Wrap = () => {
  const navigate = useNavigate();

  const { requests } = useSelector((state) => state.favorites);

  const checkUser = () => {
    const token = localStorage.getItem('token');
    const users = JSON.parse(localStorage.getItem('saved')) || [];
    const currentUser = users.find((user) => user.token === token);
    if (!currentUser) {
      return localStorage.setItem('saved', JSON.stringify([...users, { token, data: [] }]));
      // const user = JSON.parse(localStorage.getItem('saved'));
      // const current = user.find((user) => user.token === token);
      // current.data = [...requests];
      // return localStorage.setItem('saved', JSON.stringify([...user]));
    }
    currentUser.data = [...requests];
    return localStorage.setItem('saved', JSON.stringify([...users]));
  };

  return (
    <Layout className="layout ">
      <Header className="layout__header " id="head">
        <div className="header__container _container">
          <div className="header__logo">
            <img className="header__icon" src={icon} alt="Icon" />
          </div>
          <Menu
            // className="header__menu"
            theme="light"
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
                  navigate('/main');
                  break;
                case '2':
                  navigate('/main/favorites');
                  break;
                case '3':
                  navigate('/');
                  localStorage.removeItem('token');
                  // localStorage.clear();
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

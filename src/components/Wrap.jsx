import { Layout, Menu } from 'antd';
import React from 'react';
import icon from '../assets/img/youtube.ico';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { youtubeApi } from '../redux/services/youtubeApi';

const { Header, Content } = Layout;

export const Wrap = () => {
  const navigate = useNavigate();

  //const { data } = youtubeApi.useGetListQuery('');

  // console.log(data);

  // const header = (headers) => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     headers.set('Authorization', `Bearer ${token}`);
  //   }
  //   return headers;
  // };

  return (
    <Layout className="layout ">
      <Header className="layout__header " id="head">
        <div className="header__container _container">
          <div className="header__logo">
            <img className="header__icon" src={icon} alt="Icon" />
          </div>
          <Menu
            className="header__menu"
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
                  localStorage.clear();
                  break;
                default:
                  console.log('Unknown navigation');
              }
            }}
          />
        </div>
      </Header>
      <Content className="layout__content">
        <Outlet />
      </Content>
    </Layout>
  );
};

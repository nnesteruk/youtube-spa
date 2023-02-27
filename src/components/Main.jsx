import { Input, Layout, Menu, theme, Space } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import React from 'react';
import icon from '../assets/img/youtube.ico';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { youtubeApi } from '../redux/services/youtubeApi';

const { Header, Content } = Layout;

const { Search } = Input;

export const Main = () => {
  const heartClickHandler = () => console.log('add to private');
  const suffix = (
    <HeartOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
      onClick={() => heartClickHandler()}
    />
  );

  const navigate = useNavigate();

  const { data } = youtubeApi.useGetListQuery('');

  console.log(data);

  // const header = (headers) => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     headers.set('Authorization', `Bearer ${token}`);
  //   }
  //   return headers;
  // };

  const onSearch = (value) => {
    // axios
    //   .get(`${process.env.REACT_APP_SEARCHURL}/videos`, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem('token')}`,
    //     },
    //   })
    //   .then((data) => console.log(data))
    //   .catch((err) => console.log(err));
  };
  return (
    <Layout className="layout">
      <Header className="layout__header" id="head">
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
            if (item.key === '3') {
              navigate('/');
              localStorage.clear();
            }
          }}
        />
      </Header>
      <Content className="layout__content">
        <div className="content _container">
          <Space direction="vertical" size="small">
            <h1 className="content__title">Поиск видео</h1>
            <Search
              placeholder="input search text"
              enterButton="Найти"
              size="large"
              className="content__input"
              suffix={suffix}
              onSearch={onSearch}
            />
          </Space>
        </div>
      </Content>
    </Layout>
  );
};

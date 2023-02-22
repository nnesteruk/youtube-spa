import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import icon from '../../assets/img/youtube128.png';

export const Login = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/auth/login`, values)
      .then(({ data }) => {
        localStorage.setItem('token', data.token);
        navigate('/search');
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div className="login">
      <img className="login__icon" src={icon} alt="Icon" />
      <h1 className="login__title">Вход</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}>
        <Form.Item
          className="login-form__input"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}>
          <Input
            className="login-form__input-email"
            prefix={<UserOutlined />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          className="login-form__input"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}>
          <Input.Password
            className="login-form__input-password"
            prefix={<LockOutlined />}
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item className="login-form__buttons">
          <Button className="login-form__buttons-enter" type="primary" htmlType="submit">
            Войти
          </Button>
          <p className="login-form__buttons-registration">
            <Link to="/registration">Зарегистрироваться</Link>
          </p>
        </Form.Item>
      </Form>
    </div>
  );
};

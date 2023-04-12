import { Button, Form, Input, InputNumber, Select } from 'antd';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

export const Registration = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/users/register`, values)
      .then((response) => {
        if (response) {
          console.log(response);
          alert('Registration is succsessfuly');
          navigate('/youtube-spa');
          return response;
        }
      })
      .catch((error) => {
        const [errorMessage] = error.response.data.errors;
        alert(errorMessage.msg);
        return error;
      });
  };

  return (
    <div className="registration">
      <h1 className="registration__title">Регистрация</h1>
      <Form
        {...formItemLayout}
        className="registration__form"
        form={form}
        name="register"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError>
        <Form.Item
          className="form__input"
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          className="form__input"
          name="password"
          label="Password"
          tooltip="'Пароль должен быть длиной не менее 8 символов, из них минимум 1 заглавная буква, 1 прописная, 1 число и 1 символ'"
          rules={[
            {
              required: true,
              message:
                'Пароль должен быть длиной не менее 8 символов, из них минимум 1 заглавная буква, 1 прописная, 1 число и 1 символ',
              pattern: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
            },
          ]}
          hasFeedback>
          <Input.Password />
        </Form.Item>

        <Form.Item
          className="form__input"
          name="name"
          label="Name"
          tooltip="What is your name?"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
              whitespace: true,
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          className="form__input"
          name="username"
          label="Username"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
              whitespace: true,
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          className="form__input"
          name="age"
          label="Age"
          rules={[
            {
              required: true,
              message: 'Please input your age!',
            },
          ]}>
          <InputNumber />
        </Form.Item>

        <Form.Item
          className="form__input"
          name="isMan"
          label="isMan"
          rules={[
            {
              required: true,
              message: 'Please select isMan!',
            },
          ]}>
          <Select placeholder="select your isMan">
            <Option value={true}>Male</Option>
            <Option value={false}>Female</Option>
          </Select>
        </Form.Item>

        <Form.Item className="form__button">
          <Button className="form__button-register" type="primary" htmlType="submit">
            Register
          </Button>
          <p>
            Уже есть аккаунт?
            <NavLink
              to="/youtube-spa"
              className={({ isActive }) => (!isActive ? '' : 'active-link')}>
              Войти
            </NavLink>
          </p>
        </Form.Item>
      </Form>
    </div>
  );
};

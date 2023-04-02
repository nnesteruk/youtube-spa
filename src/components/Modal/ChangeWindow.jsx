import { Modal, Button, Form, Input, Select, Space, InputNumber, Slider } from 'antd';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateFavoriteAction } from '../../redux/favorite/slice';

const { Option } = Select;

export const ChangeWindow = ({ isModalOpen, setIsModalOpen, item }) => {
  const [form] = Form.useForm();
  const formRef = useRef(null);
  const [count, setCount] = useState(item.count); //!Количество видео
  const dispatch = useDispatch();

  const onChange = (number) => {
    setCount(number);
  };

  const updateRequest = (favorite) => dispatch(updateFavoriteAction(favorite));
  const handleChange = ({ request, name, sort }) => {
    updateRequest({
      id: item.id,
      request,
      name,
      sort,
      count,
    });
    setIsModalOpen(false);
  };
  const handleNotChange = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      wrapClassName="modal"
      centered
      open={isModalOpen}
      footer={null}
      width={510}
      closable={false}
      bodyStyle={{ height: '500px', padding: '0px', width: '430px', margin: '0px auto' }}>
      <div className="modal__content">
        <h1 className="modal__title">Изменить запрос</h1>
        <Form
          form={form}
          layout="vertical"
          requiredMark={true}
          className="modal__form"
          onFinish={handleChange}
          ref={formRef}>
          <label>Запрос</label>
          <Form.Item name="request" initialValue={item.request}>
            <Input className="input" placeholder="input placeholder" />
          </Form.Item>

          <label className="required">Название</label>
          <Form.Item
            name="name"
            rules={[
              { required: true, message: 'Пожалуйста напишите название!', type: 'string', min: 1 },
            ]}
            initialValue={item.name}>
            <Input className="input" placeholder="Укажите название" />
          </Form.Item>

          <label>Сортировать по</label>
          <Form.Item name="sort" initialValue={item.sort}>
            <Select placeholder="Без сортировки" size="large">
              <Option value="relevance">По умолчанию</Option>
              <Option value="date">По дате загрузки</Option>
              <Option value="rating">По рейтингу</Option>
              <Option value="title">По названию</Option>
              <Option value="videoCount">По каналам</Option>
              <Option value="viewCount">По числу просмотров</Option>
            </Select>
          </Form.Item>

          <label>Максимальное количество</label>
          <Form.Item>
            <div className="modal__count">
              <Slider
                min={0}
                max={50}
                onChange={onChange}
                className="modal__slider"
                value={typeof count === 'number' ? count : 0}
              />
              <InputNumber
                min={0}
                max={50}
                className="modal__slider-number"
                value={typeof count === 'number' ? count : 0}
                onChange={onChange}
              />
            </div>
          </Form.Item>
          <Form.Item className="modal__buttons">
            <Space>
              <Button className="modal__button button" onClick={() => handleNotChange()}>
                Не изменять
              </Button>
              <Button className="modal__button button" type="primary" htmlType="submit">
                Изменить
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

import { Modal, Button, Form, Input, Select, Space, InputNumber, Slider } from 'antd';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFavoriteAction } from '../../redux/favorite/slice';

const { Option } = Select;

export const ModalWindow = ({ isModalOpen, setIsModalOpen, searchText, setSaveRequest }) => {
  const [form] = Form.useForm();
  const [count, setCount] = useState(1); //!Количество видео
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const onChange = (number) => {
    setCount(number);
  };

  const addRequest = (favorite) => dispatch(addFavoriteAction(favorite));
  const handleSave = ({ request, name, sort }) => {
    console.log(request);
    addRequest({
      id: Date.now(),
      request,
      name,
      sort,
      count,
    });
    formRef.current?.resetFields();
    setCount(1);
    setIsModalOpen(false);
    setSaveRequest(true);
  };
  const handleNotSave = () => {
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
        <h1 className="modal__title">Сохранить запрос</h1>
        <Form
          form={form}
          layout="vertical"
          requiredMark={true}
          className="modal__form"
          onFinish={handleSave}
          ref={formRef}>
          <label>Запрос</label>
          <Form.Item name="request" initialValue={searchText}>
            <Input
              className="input"
              placeholder="input placeholder"
              // disabled={typeof requestStatus === 'undefined' ? true : false}
              disabled={true}
            />
          </Form.Item>

          <label className="required">Название</label>
          <Form.Item
            name="name"
            rules={[
              { required: true, message: 'Пожалуйста напишите название!', type: 'string', min: 1 },
            ]}>
            <Input className="input" placeholder="Укажите название" />
          </Form.Item>

          <label>Сортировать по</label>
          <Form.Item name="sort">
            <Select placeholder="Без сортировки" size="large">
              <Option value="date">По дате загрузки</Option>
              <Option value="views">По числу просмотров</Option>
              <Option value="rating">По рейтингу</Option>
            </Select>
          </Form.Item>

          <label>Максимальное количество</label>
          <Form.Item>
            <div className="modal__count">
              <Slider
                min={1}
                max={50}
                onChange={onChange}
                className="modal__slider"
                value={typeof count === 'number' ? count : 0}
              />
              <InputNumber
                min={1}
                max={50}
                className="modal__slider-number"
                value={typeof count === 'number' ? count : 0}
                onChange={onChange}
              />
            </div>
          </Form.Item>
          <Form.Item className="modal__buttons">
            <Space>
              <Button className="modal__button button" onClick={() => handleNotSave()}>
                Не сохранять
              </Button>
              <Button className="modal__button button" type="primary" htmlType="submit">
                Сохранить
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

import { Modal, Button, Form, Input, Select, Space, InputNumber, Slider } from 'antd';
import { useState } from 'react';

export const ModalWindow = ({ isModalOpen, setIsModalOpen, searchText }) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [form] = Form.useForm();
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const [inputValue, setInputValue] = useState(1);
  const onChange = (newValue) => {
    setInputValue(newValue);
  };

  return (
    <Modal
      wrapClassName="modal"
      centered
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={510}
      closable={false}
      bodyStyle={{ height: '500px', padding: '0px', width: '430px', margin: '0px auto' }}>
      <div className="modal__content">
        <h1 className="modal__title">Сохранить запрос</h1>
        <Form form={form} layout="vertical" requiredMark={true} className="modal__form">
          <Form.Item>
            <label>Запрос</label>
            <Input
              className="input"
              placeholder="input placeholder"
              disabled={true}
              value={searchText}
            />
          </Form.Item>
          <Form.Item
            noStyle={false}
            rules={[{ required: true }, { type: 'string', warningOnly: true }]}>
            <label className="required">Название</label>
            <Input className="input" placeholder="Укажите название" />
          </Form.Item>
          <Form.Item>
            <label>Сортировать по</label>
            <Select
              placeholder="Без сортировки"
              onChange={handleChange}
              options={[
                {
                  label: 'По дате загрузки',
                  value: 'date',
                },
                {
                  label: 'По числу просмотров',
                  value: 'views',
                },
                {
                  label: 'По рейтингу',
                  value: 'rating',
                },
                {
                  label: 'Disabled',
                  value: 'disabled',
                  disabled: true,
                },
              ]}
            />
          </Form.Item>
          <Form.Item className="modal__count">
            <label>Максимальное количество</label>
            <div style={{ display: 'flex' }}>
              <Slider
                min={1}
                max={50}
                onChange={onChange}
                className="modal__slider"
                value={typeof inputValue === 'number' ? inputValue : 0}
              />
              <InputNumber
                min={1}
                max={50}
                className="modal__slider-number"
                value={inputValue}
                style={{ fontSize: '20px' }}
                onChange={onChange}
              />
            </div>
          </Form.Item>
          <Form.Item className="modal__buttons">
            <Space>
              <Button className="modal__button button" onClick={() => handleCancel()}>
                Не сохранять
              </Button>
              <Button className="modal__button button" type="primary" onClick={() => handleOk()}>
                Сохранить
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

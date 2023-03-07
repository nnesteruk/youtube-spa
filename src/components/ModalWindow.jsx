import { Modal, Button, Form, Input, Select } from 'antd';

export const ModalWindow = ({ isModalOpen, setIsModalOpen }) => {
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

  return (
    <Modal
      className="modal"
      title="Сохранить запрос"
      centered
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}>
      <div className="modal__content">
        <Form form={form} layout="vertical" requiredMark={true}>
          <Form.Item label="Запрос">
            <Input placeholder="input placeholder" disabled={true} />
          </Form.Item>
          <Form.Item
            name="name"
            label="Наименование"
            rules={[{ required: true }, { type: 'string', warningOnly: true }]}>
            <Input placeholder="Укажите название" />
          </Form.Item>
          <Form.Item label="Наименование">
            <Select
              placeholder="Без сортировки"
              style={{
                width: 320,
              }}
              onChange={handleChange}
              options={[
                {
                  value: 'jack',
                  label: 'Jack',
                },
                {
                  value: 'lucy',
                  label: 'Lucy',
                },
                {
                  value: 'Yiminghe',
                  label: 'yiminghe',
                },
                {
                  value: 'disabled',
                  label: 'Disabled',
                  disabled: true,
                },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary">Не сохранять</Button>
            <Button type="primary">Сохранить</Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

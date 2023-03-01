import { Input, Space } from 'antd';

import { HeartOutlined } from '@ant-design/icons';

const { Search } = Input;

export const SearchPage = () => {
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
  );
};

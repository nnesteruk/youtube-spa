import { Input, Tooltip } from 'antd';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import { ModalWindow } from './Modal/ModalWindow';
import { useEffect, useState } from 'react';
import { youtubeApi } from '../redux/services/youtubeApi';
import { Link } from 'react-router-dom';
import { VideosBlock } from './VideosBlock/VideosBlock';

const { Search } = Input;

export const SearchPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const choice = JSON.parse(localStorage.getItem('choice')) || null;
  const [searchText, setSearchText] = useState('');
  const [saveRequest, setSaveRequest] = useState(false);
  const [skip, setSkip] = useState(true);
  const { data, isSuccess } = youtubeApi.useGetListQuery(searchText, { skip });
  // const videos = data?.items;
  // const { totalResults } = isSuccess && data?.pageInfo;

  const heartClickHandler = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (choice) {
      setSearchText(choice.request);
      setSkip(false);
      localStorage.removeItem('choice');
    }
    <Search />;
  }, [choice]);

  const suffix =
    searchText && saveRequest ? (
      <Tooltip
        title={() => (
          <div className="tooltip">
            <p>Поиск сохранён в разделе «Избранное»</p>
            <Link to="/main/favorites">Перейти в избранное</Link>
          </div>
        )}
        color="white"
        overlayInnerStyle={{
          color: 'black',
          backgroundColor: '#fff',
          width: '220px',
          padding: '14px',
        }}
        placement="bottom"
        open>
        <HeartTwoTone className="icon-heart" onClick={() => heartClickHandler()} />
      </Tooltip>
    ) : (
      <HeartOutlined className="icon-heart" onClick={() => heartClickHandler()} />
    );

  const heart = isSuccess ? suffix : null;
  const content = isSuccess ? 'content2 _container' : 'content _container';
  const searchInput = isSuccess ? '' : 'content__input';

  const onSearch = (value) => {
    setSkip(false);
    localStorage.removeItem('choice');
    console.log(data);
    console.log(value);
  };

  return (
    <div className={content}>
      {/* <Space direction="vertical" size="large"> */}
      <h1>Поиск видео</h1>
      <Search
        placeholder="Что хотите посмотреть?"
        enterButton="Найти"
        size="large"
        value={searchText}
        className={searchInput}
        onChange={(e) => setSearchText(e.target.value)}
        suffix={heart}
        onSearch={() => onSearch()}
      />

      {isSuccess && <VideosBlock data={data} isSuccess={isSuccess} searchText={searchText} />}
      <ModalWindow
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        searchText={searchText}
        setSaveRequest={setSaveRequest}
      />
      {/* </Space> */}
    </div>
  );
};

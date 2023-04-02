import { Input, Tooltip } from 'antd';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import { ModalWindow } from './Modal/ModalWindow';
import { useCallback, useEffect, useState } from 'react';
import { youtubeApi } from '../redux/services/youtubeApi';
import { Link } from 'react-router-dom';
import { VideosBlock } from './VideosBlock/VideosBlock';
import { useSelector } from 'react-redux';

const { Search } = Input;

export const SearchPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [saveRequest, setSaveRequest] = useState(false);
  const [skip, setSkip] = useState(true);

  const { choice, requests } = useSelector((state) => state.favorites); //? Нужно ли тут сохранять запросы в ls

  const checkUser = () => {
    const token = localStorage.getItem('token');
    const users = JSON.parse(localStorage.getItem('saved')) || [];
    const currentUser = users.find((user) => user.token === token);
    if (!currentUser) {
      return localStorage.setItem('saved', JSON.stringify([...users, { token, data: [] }]));
      // const user = JSON.parse(localStorage.getItem('saved'));
      // const current = user.find((user) => user.token === token);
      // current.data = [...requests];
      // return localStorage.setItem('saved', JSON.stringify([...user]));
    }
    currentUser.data = [...requests];
    return localStorage.setItem('saved', JSON.stringify([...users]));
  };

  useEffect(() => {
    checkUser();
    if (choice) {
      setSearchText(choice?.request);
      setSkip(!skip);
      // localStorage.setItem('choice');
    }
    return () => {
      setSkip(true);
    };
  }, []);

  const { data, isSuccess } = youtubeApi.useGetListQuery(
    {
      searchText,
      limit: choice?.count || 12,
      order: choice?.sort || 'relevance',
    },
    { skip },
  );

  const heartClickHandler = () => {
    setIsModalOpen(true);
  };

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

  // const heart = isSuccess ? suffix : null;
  const heart = suffix;
  const content = isSuccess ? 'content2 _container' : 'content _container';
  const searchInput = isSuccess ? '' : 'content__input';

  const onSearch = () => {
    setSkip(false);
    console.log(data);
  };

  return (
    <div className={content}>
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

      {isSuccess && (
        <VideosBlock
          data={data}
          isSuccess={isSuccess}
          searchText={searchText}
          sort={choice?.sort}
        />
      )}
      <ModalWindow
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        searchText={searchText}
        setSaveRequest={setSaveRequest}
      />
    </div>
  );
};

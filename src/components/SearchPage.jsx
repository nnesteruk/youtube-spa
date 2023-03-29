import { Input, Tooltip } from 'antd';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import { ModalWindow } from './Modal/ModalWindow';
import { useEffect, useState } from 'react';
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

  const { choice } = useSelector((state) => state.favorites); //? Нужно ли тут сохранять запросы в ls

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

  useEffect(() => {
    // localStorage.setItem(
    //   'favorites',
    //   JSON.stringify([{ token: localStorage.getItem('token'), data: requests }]),
    // );
    if (choice) {
      setSearchText(choice?.request);
      setSkip(false);
      // localStorage.setItem('choice');
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

  const onSearch = () => {
    setSkip(false);
    // isSuccess && setSkip(true);
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

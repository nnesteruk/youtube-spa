import { Input, Tooltip } from 'antd';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import { ModalWindow } from './Modal/ModalWindow';
import { useEffect, useState } from 'react';
import { youtubeApi } from '../redux/services/youtubeApi';
import { Link, useOutletContext } from 'react-router-dom';
import { VideosBlock } from './VideosBlock/VideosBlock';
import { useSelector } from 'react-redux';

const { Search } = Input;

export const SearchPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const request = JSON.parse(localStorage.getItem('request'));
  const [searchText, setSearchText] = useState('');
  const [saveRequest, setSaveRequest] = useState(false);
  const [skip, setSkip] = useState(true);
  const [openTootip, setOpenTooltip] = useState(true);

  const { choice } = useSelector((state) => state.favorites);
  const checkUser = useOutletContext();
  const { data, isLoading } = youtubeApi.useGetListQuery(
    {
      searchText,
      limit: choice?.count || 12,
      order: choice?.sort || 'relevance',
    },
    { skip },
  );

  useEffect(() => {
    if (choice?.request) {
      setSearchText(choice?.request);
      setSkip(false);
      setOpenTooltip(!openTootip);
    }
    return () => {
      localStorage.removeItem('choice');
    };
  }, [choice]);

  useEffect(() => {
    localStorage.setItem(
      'request',
      JSON.stringify({
        searchText,
        limit: choice?.count || 12,
        order: choice?.sort || 'relevance',
      }),
    );
    localStorage.setItem('data', JSON.stringify(data));

    if (request?.searchText) {
      setSearchText(request?.searchText);
      setSkip(false);
    }
    return () => {
      localStorage.removeItem('request');
      setSkip(true);
    };
  }, [data]);

  const handleOnChange = (event) => {
    setSearchText(event.target.value);
    setSkip(true);
  };

  const heartClickHandler = () => {
    setIsModalOpen(true);
  };

  const suffix =
    searchText && (saveRequest || choice) ? (
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
        mouseLeaveDelay={0.5}
        defaultOpen={openTootip}
        onChange={(open) => open}>
        <HeartTwoTone className="icon-heart" onClick={() => heartClickHandler()} />
      </Tooltip>
    ) : (
      <HeartOutlined className="icon-heart" onClick={() => heartClickHandler()} />
    );

  const heart = data ? suffix : null;
  const content = data ? 'content2 _container' : 'content _container';
  const searchInput = data ? '' : 'content__input';

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
        onChange={(e) => handleOnChange(e)}
        suffix={heart}
        onSearch={() => onSearch()}
      />

      {data?.items.length && (
        <VideosBlock
          data={data}
          searchText={searchText}
          sort={choice?.sort}
          isLoading={isLoading}
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

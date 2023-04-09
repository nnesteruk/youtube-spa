import { Input, Tooltip } from 'antd';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import { ModalWindow } from '../Modal/ModalWindow';
import { useEffect, useState } from 'react';
import { youtubeApi } from '../../redux/services/youtubeApi';
import { Link } from 'react-router-dom';
import { VideosBlock } from './VideosBlock';
import { useSelector } from 'react-redux';

const { Search } = Input;

export const SearchPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [saveRequest, setSaveRequest] = useState(false);
  const [skip, setSkip] = useState(true);
  const [openTooltip, setOpenTooltip] = useState(true);

  const { choice, requests } = useSelector((state) => state.favorites);

  const getSaveRequest = JSON.parse(localStorage.getItem('choice')) || null;
  const { data, isLoading } = youtubeApi.useGetListQuery(
    {
      searchText,
      limit: choice?.count || 12,
      order: choice?.sort || 'relevance',
    },
    { skip },
  );
  const searchBtnClick = JSON.parse(localStorage.getItem('searchBtnClick')) || false;

  useEffect(() => {
    const search = JSON.parse(localStorage.getItem('search')) || null;
    if (!searchBtnClick && getSaveRequest) {
      setSearchText(getSaveRequest?.request);
      setSkip(false);
      setOpenTooltip(!openTooltip);
    } else if (searchBtnClick) {
      setSearchText(search?.searchText);
      setSkip(false);
    }
    return () => {};
  }, [searchBtnClick]);

  const handleOnChange = (event) => {
    setSearchText(event.target.value);
    setSkip(true);
  };

  const heartClickHandler = () => {
    setIsModalOpen(true);
  };

  const suffix = requests.find((item) => item.request === searchText) ? (
    <Tooltip
      title={() => (
        <div className="tooltip">
          <p>Поиск сохранён в разделе «Избранное»</p>
          <Link to="/youtube-spa/main/favorites" className="tooltip__link">
            Перейти в избранное
          </Link>
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
      defaultOpen={openTooltip || saveRequest}
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
    setSaveRequest(false);
    localStorage.setItem(
      'search',
      JSON.stringify({
        searchText,
        limit: 12,
        order: 'relevance',
      }),
    );
    localStorage.setItem('searchBtnClick', true);
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

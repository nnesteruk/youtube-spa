import { Input, Tooltip } from 'antd';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import { ModalWindow } from './Modal/ModalWindow';
import { useEffect, useState } from 'react';
import { youtubeApi } from '../redux/services/youtubeApi';
import { Link, useOutletContext } from 'react-router-dom';
import { VideosBlock } from './VideosBlock/VideosBlock';
import { useDispatch, useSelector } from 'react-redux';
import { addChoiceAction } from '../redux/favorite/slice';

const { Search } = Input;

export const SearchPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [saveRequest, setSaveRequest] = useState(false);
  const [skip, setSkip] = useState(true);
  const [openTootip, setOpenTooltip] = useState(true);
  const dispatch = useDispatch();

  const { choice } = useSelector((state) => state.favorites);
  const checkUser = useOutletContext();
  console.log(openTootip);

  useEffect(() => {
    checkUser();
    if (choice?.request) {
      setSearchText(choice?.request);
      setSkip(!skip);
      setOpenTooltip(!openTootip);
    }
    return () => {
      localStorage.removeItem('choice');
      // dispatch(addChoiceAction(null));
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

  // const heart = isSuccess ? suffix : null;
  const heart = suffix;
  const content = isSuccess ? 'content2 _container' : 'content _container';
  const searchInput = isSuccess ? '' : 'content__input';

  const onSearch = () => {
    setSkip(!skip);
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

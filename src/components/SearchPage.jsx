import { Input, Space, Tooltip } from 'antd';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import { ModalWindow } from './Modal/ModalWindow';
import { useState } from 'react';
import { youtubeApi } from '../redux/services/youtubeApi';
import { Link } from 'react-router-dom';

const { Search } = Input;

export const SearchPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const [saveRequest, setSaveRequest] = useState(false);
  const { data, isSuccess } = youtubeApi.useGetListQuery(searchText);
  const videos = data?.items;
  // const { totalResults } = data?.pageInfo;
  // console.log(totalResults);
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
  const onSearch = (value) => {
    // axios
    //   .get(`${process.env.REACT_APP_SEARCHURL}/videos`, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem('token')}`,
    //     },
    //   })
    //   .then((data) => console.log(data))
    //   .catch((err) => console.log(err));
    console.log(data);
    console.log(value);
  };
  return (
    <div className="content _container">
      <Space direction="vertical" size="small">
        <h1 className="content__title">Поиск видео</h1>
        <Search
          placeholder="Что хотите посмотреть?"
          enterButton="Найти"
          size="large"
          className="content__input"
          onChange={(e) => setSearchText(e.target.value)}
          suffix={suffix}
          onSearch={onSearch}
        />

        {isSuccess && (
          <div className="_container">
            <div className="">
              <p className="content__signature">
                Видео по запросу <span>«{searchText}»</span>
                {/* <span>{totalResults}</span> */}
              </p>
            </div>
            <></>
            <div className="content__videos">
              {videos.map((item) => (
                <div key={item.etag} className="card-video">
                  <img className="content__img" src={item.snippet.thumbnails.high.url} alt="" />
                  <h2>{item.snippet.title}</h2>
                  <h4> {item.snippet.channelTitle}</h4>
                </div>
              ))}
            </div>
          </div>
        )}
        <ModalWindow
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          searchText={searchText}
          setSaveRequest={setSaveRequest}
        />
      </Space>
    </div>
  );
};

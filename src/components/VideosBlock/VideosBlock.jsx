import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Skeleton } from './Skeleton';
import { useState } from 'react';

export const VideosBlock = ({ data, searchText, sort, isLoading }) => {
  const videos = data?.items || [];
  const { totalResults } = data?.pageInfo;
  const [isList, setIsList] = useState(true);
  const listStyleHandlle = () => {
    setIsList(true);
  };
  const cardStyleHandlle = () => {
    setIsList(false);
  };

  const cardStyle = 'icon-block ' + (isList ? 'main' : '');
  const listStyle = 'icon-list ' + (isList ? '' : 'main');

  return (
    <div className="videos">
      {/* <div className="_container"> */}
      <div className="videos__header-block">
        <div className="videos__signature">
          <p>
            Видео по запросу <span>«{searchText}»</span>
          </p>
          <span className="videos__count">{totalResults}</span>
          <span>Количество видео: {videos.length}</span>
          <span>Сортировка: {sort}</span>
        </div>
        <div>
          <UnorderedListOutlined className={listStyle} onClick={listStyleHandlle} />
          <AppstoreOutlined className={cardStyle} onClick={cardStyleHandlle} />
        </div>
      </div>
      {!isList ? (
        <div className="videos__content">
          {videos.map((item) => (
            <div key={item.etag} className="videos__block">
              <div className="videos__img">
                <a
                  href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                  target="_blank"
                  rel="noreferrer">
                  <img src={item.snippet.thumbnails.high.url} alt="" />
                </a>
              </div>
              <div className="videos__text">
                <h2>{item.snippet.title}</h2>
                <h4> {item.snippet.channelTitle}</h4>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="videos__content2">
          {videos.map((item) => (
            <>
              {isLoading ? (
                <Skeleton />
              ) : (
                <div key={item.etag} className="videos__block2">
                  <a
                    href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                    target="_blank"
                    rel="noreferrer">
                    <img className="videos__img2" src={item.snippet.thumbnails.high.url} alt="" />
                  </a>
                  <div className="videos__text2">
                    <h2>{item.snippet.title}</h2>
                    <h4> {item.snippet.channelTitle}</h4>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      )}
      {/* </div> */}
    </div>
  );
};

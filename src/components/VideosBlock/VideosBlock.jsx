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
        <div className="videos__block-content block-content">
          <div className="block-content__row">
            {videos.map((item) => (
              <div key={item.etag} className="block-content__column">
                <div className="block-content__block">
                  <div className="block-content__img">
                    <a
                      href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                      target="_blank"
                      rel="noreferrer">
                      <img src={item.snippet.thumbnails.high.url} alt="" />
                    </a>
                  </div>
                  <div className="block-content__text">
                    <a
                      href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                      target="_blank"
                      rel="noreferrer">
                      <h2>{item.snippet.title}</h2>
                    </a>
                    <a
                      href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                      target="_blank"
                      rel="noreferrer">
                      <h4> {item.snippet.channelTitle}</h4>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="videos__list-content list-content">
            <div className="list-content__row">
              {videos.map((item) => (
                <div key={item.etag} className="list-content__column">
                  <div className="list-content__block">
                    <div className="list-content__img">
                      <a
                        href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                        target="_blank"
                        rel="noreferrer">
                        <img src={item.snippet.thumbnails.high.url} alt="" />
                      </a>
                    </div>
                    <div className="list-content__text">
                      <a
                        href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                        target="_blank"
                        rel="noreferrer">
                        <h2>{item.snippet.title}</h2>
                      </a>
                      <a
                        href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                        target="_blank"
                        rel="noreferrer">
                        <h4> {item.snippet.channelTitle}</h4>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

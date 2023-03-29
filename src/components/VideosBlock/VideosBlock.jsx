import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useState } from 'react';

export const VideosBlock = ({ data, isSuccess, searchText, sort }) => {
  const videos = data?.items;
  const { totalResults } = isSuccess && data?.pageInfo;
  const [id] = videos.map((item) => item);
  console.log(id);
  const [isList, setIsList] = useState(true);
  const listStyleHandlle = () => {
    console.log('List');
    setIsList(true);
  };
  const cardStyleHandlle = () => {
    console.log('List');
    setIsList(false);
  };

  const cardStyle = 'icon-block ' + (isList ? 'main' : '');
  const listStyle = 'icon-list ' + (isList ? '' : 'main');
  console.log(isList);

  return (
    <div className="videos ">
      <div className="_container">
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
                <a
                  href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                  target="_blank"
                  rel="noreferrer">
                  <img className="videos__img" src={item.snippet.thumbnails.high.url} alt="" />
                </a>
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
              <div key={item.etag} className="videos__block2">
                <a
                  href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                  target="_blank"
                  rel="noreferrer">
                  <img className="videos__img2" src={item.snippet.thumbnails.high.url} alt="" />
                </a>
                {/* <div>
                  <iframe
                    width="100%"
                    height="auto"
                    src={`https://www.youtube.com/embed/${item.id.videoId}`}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen></iframe>
                </div> */}
                <div className="videos__text2">
                  <h2>{item.snippet.title}</h2>
                  <h4> {item.snippet.channelTitle}</h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

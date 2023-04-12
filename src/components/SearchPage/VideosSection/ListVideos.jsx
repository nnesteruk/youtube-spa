import React from 'react';

export const ListVideos = ({ videos }) => {
  return (
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
                  href={`https://www.youtube.com/channel/${item.snippet.channelId}`}
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
  );
};

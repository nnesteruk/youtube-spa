import React from 'react';

export const BlockListVideos = ({ videos }) => {
  return (
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

import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { BlockListVideos } from './BlockListVideos';
import { ListVideos } from './ListVideos';

export const VideosSection = ({ data, searchText }) => {
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
        </div>
        <div>
          <UnorderedListOutlined className={listStyle} onClick={listStyleHandlle} />
          <AppstoreOutlined className={cardStyle} onClick={cardStyleHandlle} />
        </div>
      </div>
      {!isList ? <BlockListVideos videos={videos} /> : <ListVideos videos={videos} />}
    </div>
  );
};

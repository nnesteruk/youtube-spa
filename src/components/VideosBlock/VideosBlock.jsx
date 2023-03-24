import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';

export const VideosBlock = ({ data, isSuccess, searchText }) => {
  const videos = data?.items;
  const { totalResults } = isSuccess && data?.pageInfo;
  const [id] = videos.map((item) => item);
  console.log(id);
  const cardHandlle = () => console.log('work');
  const cardStyle = cardHandlle() ? 'icon-red' : 'icon-block';

  return (
    <div className="videos ">
      <div className="_container">
        <div className="videos__header-block">
          <div className="videos__signature">
            <p>
              Видео по запросу <span>«{searchText}»</span>
            </p>
            <span className="videos__count">{totalResults}</span>
          </div>
          <div>
            <UnorderedListOutlined
              className="icon-list"
              onClick={() => console.log('List style')}
            />
            <AppstoreOutlined className={cardStyle} onClick={() => cardHandlle()} />
          </div>
        </div>
        <div className="videos__content">
          {videos.map((item) => (
            <div key={item.etag} className="videos__block">
              <img className="videos__img" src={item.snippet.thumbnails.high.url} alt="" />
              <div className="videos__text">
                <h2>{item.snippet.title}</h2>
                <h4> {item.snippet.channelTitle}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

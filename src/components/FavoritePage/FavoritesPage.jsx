import { useSelector } from 'react-redux';
import { SaveRequest } from './SaveRequest';

export const FavoritesPage = () => {
  const { requests } = useSelector((state) => state.favorites);
  // localStorage.setItem('favorites', JSON.stringify(requests));

  return (
    <div className="favorites _container">
      <h1 className="favorites__title">Избранное</h1>
      <div className="favorites__search">
        <ul className="favorites__list">
          {requests.length ? (
            requests.map((item) => <SaveRequest key={item.id} item={item} />)
          ) : (
            <li>
              <p className="favorites__link">Добавьте свой первый любимый запрос</p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

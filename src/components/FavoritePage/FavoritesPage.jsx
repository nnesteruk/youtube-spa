import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { addUsersAction } from '../../redux/favorite/slice';
import { SaveRequest } from './SaveRequest';

export const FavoritesPage = () => {
  const { requests } = useSelector((state) => state.favorites);
  const checkUser = useOutletContext();
  // const dispatch = useDispatch();

  useEffect(() => {
    checkUser();
  }, [requests]);

  return (
    <div className="favorites _container">
      <h1 className="favorites__title">Избранное</h1>
      <div className="favorites__search">
        <ul className="favorites__list">
          {requests.length ? (
            requests.map((item, _, array) => (
              <SaveRequest key={item.id} item={item} favorites={array} />
            ))
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

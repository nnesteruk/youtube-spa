import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const FavoritesPage = () => {
  const [favorite, setFavorite] = useState([]);
  const dispatch = useDispatch();
  const { requests } = useSelector((state) => state.favorites);
  console.log(requests);
  return (
    <div className="favoriets _container">
      <h1 className="favoriets__title">Избранное</h1>
      <div className="favoriets__search">
        <ul className="favoriets__list">
          {requests.map((item) => (
            <li>
              <p className="favoriets__link">{item}</p>
            </li>
          ))}
          {/* <li>
              <p
                className="favoriets__link"
                onClick={(event) => console.log(event.target.innerText)}>
                bad bunny
              </p>
            </li> */}
        </ul>
      </div>
    </div>
  );
};

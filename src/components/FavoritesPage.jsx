import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFavorite } from '../redux/favorite/slice';
import { ModalWindow } from './Modal/ModalWindow';

export const FavoritesPage = () => {
  const { requests } = useSelector((state) => state.favorites);
  localStorage.setItem('favorites', JSON.stringify(requests));
  const dispatch = useDispatch();
  const deleteRequest = (id) => dispatch(deleteFavorite({ id }));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestStatus, setRequestStatus] = useState(null);
  const changeHandler = () => {
    setRequestStatus(false);
    setIsModalOpen(true);
  };
  return (
    <div className="favorites _container">
      <h1 className="favorites__title">Избранное</h1>
      <div className="favorites__search">
        <ul className="favorites__list">
          {requests.length ? (
            requests.map((item) => (
              <li className="favorites__item" key={item.id}>
                <p
                  className="favorites__link"
                  onClick={(event) => console.log(event.target.innerText)}>
                  {item.name}
                </p>
                <div className="buttons">
                  <button className="buttons__change" onClick={() => changeHandler()}>
                    Изменить
                  </button>
                  <button className="buttons__delete" onClick={() => deleteRequest(item.id)}>
                    Удалить
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li>
              <p className="favorites__link">Добавьте свой первый любимый запрос</p>
            </li>
          )}
          <ModalWindow
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            requestStatus={requestStatus}
          />
          {/* <li>
              <p
                className="favorites__link"
                onClick={(event) => console.log(event.target.innerText)}>
                bad bunny
              </p>
            </li> */}
        </ul>
      </div>
    </div>
  );
};

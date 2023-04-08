import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteFavoriteAction, addChoiceAction } from '../../redux/favorite/slice';
import { ChangeWindow } from '../Modal/ChangeWindow';

export const SaveRequest = ({ item, favorites }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const deleteRequest = (id) => dispatch(deleteFavoriteAction({ id }));
  const navigate = useNavigate();

  const handleClick = (event) => {
    const request = event.target.innerText;
    const favoriteRequest = favorites.find((item) => item.name === request);
    dispatch(addChoiceAction(favoriteRequest));
    localStorage.setItem('choice', JSON.stringify(favoriteRequest));
    localStorage.setItem('searchBtnClick', false);
    navigate('/main');
  };
  return (
    <Fragment key={item.id}>
      <li className="favorites__item ">
        <p className="favorites__link" onClick={handleClick}>
          {item.name}
        </p>
        <div className="buttons">
          <button
            className="buttons__change"
            onClick={() => {
              setIsModalOpen(true);
              console.log(item.name, item.count);
            }}>
            Изменить
          </button>
          <button className="buttons__delete" onClick={() => deleteRequest(item.id)}>
            Удалить
          </button>
        </div>
      </li>
      <ChangeWindow isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} item={item} />
    </Fragment>
  );
};

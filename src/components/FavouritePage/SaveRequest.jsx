import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteFavorite } from '../../redux/favorite/slice';
import { ChangeWindow } from '../Modal/ChangeWindow';

export const SaveRequest = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const deleteRequest = (id) => dispatch(deleteFavorite({ id }));
  return (
    <Fragment key={item.id}>
      <li className="favorites__item">
        <p className="favorites__link" onClick={(event) => console.log(event.target.innerText)}>
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

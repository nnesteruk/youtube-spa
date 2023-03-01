import React from 'react';

export const FavorietsPage = () => {
  return (
    <div className="favoriets _container">
      <h1 className="favoriets__title">Избранное</h1>
      <div className="favoriets__search">
        <ul className="favoriets__list">
          <li>
            <p className="favoriets__link">видео</p>
          </li>
          <li>
            <p className="favoriets__link">чем кормить кота</p>
          </li>
          <li>
            <p className="favoriets__link">bts</p>
          </li>
          <li>
            <p className="favoriets__link" onClick={(event) => console.log(event.target.innerText)}>
              bad bunny
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

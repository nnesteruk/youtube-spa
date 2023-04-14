import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './scss/app.scss';
import { Login } from './components/Authorization/Login';
import { Registration } from './components/Authorization/Registration';
import { RequireAuth } from './hoc/RequireAuth';
import { Wrap } from './components/Wrap';
import { SearchPage } from './components/SearchPage/SearchPage';
import { FavoritesPage } from './components/FavoritePage/FavoritesPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/youtube-spa" element=<Login /> />
      <Route path="/youtube-spa/registration" element=<Registration /> />
      <Route
        path="/youtube-spa/main"
        element={
          <RequireAuth>
            <Wrap />
          </RequireAuth>
        }>
        <Route index element=<SearchPage /> />
        <Route path="/youtube-spa/main/favorites" element=<FavoritesPage /> />
      </Route>
    </Route>,
  ),
);

export const App = () => {
  return <RouterProvider router={router} />;
};

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './scss/components/app.scss';
import { Login } from './components/Authorization/Login';
import { Registration } from './components/Authorization/Registration';
import { RequireAuth } from './hoc/RequireAuth';
import { Wrap } from './components/Wrap';
import { SearchPage } from './components/SearchPage';
import { FavoritesPage } from './components/FavoritesPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element=<Login /> />
      <Route path="/registration" element=<Registration /> />
      <Route
        path="/main"
        element={
          <RequireAuth>
            <Wrap />
          </RequireAuth>
        }>
        <Route index element=<SearchPage /> />
        <Route path="/main/favorites" element=<FavoritesPage /> />
      </Route>
    </Route>,
  ),
);

export const App = () => {
  return <RouterProvider router={router} />;
};

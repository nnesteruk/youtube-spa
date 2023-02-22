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
import { Search } from './components/Search';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element=<Login /> />
      <Route path="/registration" element=<Registration /> />
      <Route
        path="/search"
        element={
          <RequireAuth>
            <Search />
          </RequireAuth>
        }
      />
    </Route>,
  ),
);

export const App = () => {
  return <RouterProvider router={router} />;
};

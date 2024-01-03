import './App.scss';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Product from './components/Product/Product';
import User from './components/User/User';
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from './routes/PrivateRoute';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectIsLoggedIn } from './redux/slices/auth';
import publicRoutes from './routes/PublicRoute';
import OnlyLayout from './Layouts/OnlyLayout';
import DefaultLayout from './Layouts/DefaultLayout';
import privateRoutes from './routes/PrivateRoute';
import Main from './Layouts/Main';
import { getUserInfo } from './utils/helpers';

function App() {
  const currentUser = useSelector(selectCurrentUser)
  const users = getUserInfo();
  return (
    <div className="app-container">
      {/* {isLoggedIn &&
      <Navbar />
      }
      <Routes>
        <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
            <Route path="/" element={"home"}/> 
            <Route path="/products" element={<Product />} />
            <Route path="/users" element={<User />} />
        </Route>   
        <Route path="/login" element={<Login />}/>
      </Routes> */}
      <Routes>
      {publicRoutes.map((route, index) => {
          const Layout = route.layout ?  DefaultLayout : OnlyLayout;
          const Page = route.component;
          return (
            <Route
              path={route.path}
              key={index}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        {privateRoutes.map((routes, indexs) => {
          const Layout = routes.layout ? DefaultLayout : OnlyLayout ;
          const Page = routes.component;
          return (
            <Route
              path={routes.path}
              key={indexs}
              element={
                currentUser||users ? (
                  <Layout>
                    <Page />
                  </Layout>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          );
        })}
        <Route path="*" element={"NotFoundPage"} />
      </Routes>

    </div>
  );
}

export default App;

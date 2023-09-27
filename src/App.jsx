import "@/assets/font-awesome/css/all.min.css";
import "@/styles/app.scss";
import { Fragment, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { setUsers } from "./features/user/userSlice";

//Pages
import { ConfigProvider } from "antd";
import { ThemeProvider as ThemeStyled } from 'styled-components'
import { ROUTERS } from "./constants/router";
import DashLayout from "./layouts/DashLayout";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useLazyGetUserInfoQuery } from "./features/user/userApiSlice";
import ErrorPage from "./components/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import { variableStyle } from "./constants/variableStyle";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isRefreshTokenExpired = useSelector(
    (state) => state.auth.isRefreshTokenExpired
  );
  const accessToken = Cookies.get("accessToken");
  let userInfo = useSelector((state) => state.users.user) || null;

  const [trigger] = useLazyGetUserInfoQuery();

  useEffect(() => {
    if (accessToken && !isRefreshTokenExpired) {
      const getUserInfo = async () => {
        const res = await trigger().unwrap();

        if (res?.code === "0" || res.status_code) {
          dispatch(setUsers({ ...res.data }));
          return res.data;
        }

        return null;
      };

      userInfo = getUserInfo();
    } else {
      navigate("/auth/signin");
    }
  }, []);

  return (
    <>
      <ThemeStyled theme={variableStyle}>
        <Routes>
          {userInfo && Object.keys(userInfo).length && (
            <Route element={<DashLayout />}>
              {ROUTERS.map((route) => {
                if (route.children) {
                  return (
                    <Fragment key={route.id}>
                      {route.children.map((child) => {
                        if (child.children) { //router display in sidebar
                          return (
                            <Fragment key={child.id}>
                              {child.children.map((subChild) => {
                                return (
                                  <Route
                                    key={subChild.id}
                                    path={subChild.path}
                                    element={
                                      <ProtectedRoute
                                        requirePermission={subChild.permission}
                                        userPermission={userInfo?.permissions}
                                      >
                                        {subChild.component}
                                      </ProtectedRoute>
                                    }
                                  />
                                );
                              })}
                            </Fragment>
                          );
                        }

                        return (
                          <Fragment key={child.id}>
                            <Route
                              key={child.id}
                              path={child.path}
                              element={
                                <ProtectedRoute
                                  requirePermission={child.permission}
                                  userPermission={userInfo?.permissions}
                                >
                                  {child.component}
                                </ProtectedRoute>
                              }
                            />
                            {child.childRouter?.map((subChild) => { //router no display in sidebar
                              return (
                                <Route
                                  key={subChild.id}
                                  path={subChild.path}
                                  element={
                                    <ProtectedRoute
                                      requirePermission={subChild.permission}
                                      userPermission={userInfo?.permissions}
                                    >
                                      {subChild.component}
                                    </ProtectedRoute>
                                  }
                                />
                              );
                            })}
                          </Fragment>
                        );
                      })}
                    </Fragment>
                  );
                } else {
                  return (
                    <Route
                      key={route.id}
                      path={route.path}
                      element={route.component}
                    />
                  );
                }
              })}
              <Route
                path="*"
                element={
                  <ErrorPage
                    code={404}
                    title="Page not found"
                    description="Sorry, we couldn’t find the page you’re looking for."
                  />
                }
              />
            </Route>
          )}

          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
        </Routes>
      </ThemeStyled>
    </>
  );
};

export default App;

import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./pages/404Page";

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map((route, index) => {
            const Component = lazy(route.component);
            const element = <Component />;

            // If the route has middleware and requires protection, apply ProtectedRoute
            const RouteComponent = route.middleware.includes("auth") ? (
              <ProtectedRoute element={element} />
            ) : (
              element
            );

            return <Route key={index} path={route.path} element={RouteComponent} />;
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
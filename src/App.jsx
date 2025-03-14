import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { routes } from "./routes";
import { middlewares } from "./middleware/types.middleware";
import MiddlewareWrapper from "./middleware/wrapper.middleware";
import NotFound from "./pages/404Page";
import "./App.css";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Router>
      {/* React Router Setup */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map(({ path, element, middleware, layout }, index) => (
            <Route
              key={index}
              path={path}
              element={
                <MiddlewareWrapper
                  middleware={middleware.map((name) => middlewares[name])}
                >
                  {layout ? <Layout>{element} </Layout> : element}
                </MiddlewareWrapper>
              }
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;

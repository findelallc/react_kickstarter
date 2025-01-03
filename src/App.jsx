import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { middlewares } from "./middleware";
import MiddlewareWrapper from "./MiddlewareWrapper";
import NotFound from "./pages/404Page";

const App = () => {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, element, middleware }, index) => (
          <Route
            key={index}
            path={path}
            element={
              <MiddlewareWrapper middleware={middleware.map((name) => middlewares[name])}>
                {element}
              </MiddlewareWrapper>
            }
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
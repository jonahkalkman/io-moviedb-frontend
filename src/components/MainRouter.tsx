import { FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../routes/Home";
import Favorites from "../routes/Favorites";
import Detail from "../routes/Detail";
import Edit from "../routes/Edit";
import NotFound from "../routes/NotFound";

const MainRouter: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/detail/:movieId" element={<Detail />} />
      <Route path="/edit/:movieId" element={<Edit />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRouter;

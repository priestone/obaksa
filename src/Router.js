import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Quiz from "./pages/quiz/Quiz";

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/list" element={<List></List>}></Route>
        <Route path="/quiz" element={<Quiz></Quiz>}></Route>
      </Routes>
    </HashRouter>
  );
};

export default Router;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Demo from "./routes/Demo";
import Home from "./routes/Home";
import Join from "./routes/Join";
import Login from "./routes/Login";
import Mypage from "./routes/Mypage";
import MypageEdit from "./routes/MypageEdit";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/mypagemodify" element={<MypageEdit />} />
          <Route exact path="/mypage" element={<Mypage />} />
          <Route exact path="/join" element={<Join />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/demo" element={<Demo />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

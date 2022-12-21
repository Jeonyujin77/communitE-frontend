import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Demo from "./routes/Demo";
import DetailPage from "./routes/detail";
import Home from "./routes/Home";
import Join from "./routes/Join";
import Login from "./routes/Login";
import WritePage from "./routes/Write";
import Mypage from "./routes/Mypage";
import MypageEdit from "./routes/MypageEdit";
import Layout from "./components/layout/Layout";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginCheck } from "./redux/modules/userSlice";

function App() {
  const dispatch = useDispatch();

  // 앱 로드 시 로그인유무 체크
  useEffect(() => {
    dispatch(loginCheck());
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/mypagemodify" element={<MypageEdit />} />
          <Route exact path="/mypage" element={<Mypage />} />
          <Route exact path="/join" element={<Join />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/demo" element={<Demo />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/post/:id" element={<DetailPage />} />
          <Route exact path="/write" element={<WritePage />} />
          <Route exact path="/edit/:id" element={<WritePage />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

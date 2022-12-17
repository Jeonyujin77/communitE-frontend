import { BrowserRouter, Route, Routes } from "react-router-dom";
import Demo from "./routes/Demo";
import DetailPage from "./routes/detail";
import Home from "./routes/Home";
import Login from "./routes/Login";
import WritePage from "./routes/Write";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/demo" element={<Demo />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/post/:id" element={<DetailPage />} />
          <Route exact path="/write" element={<WritePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

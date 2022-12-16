import { BrowserRouter, Route, Routes } from "react-router-dom";
import Demo from "./routes/Demo";
import Home from "./routes/Home";
import Join from "./routes/Join";
import Login from "./routes/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
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

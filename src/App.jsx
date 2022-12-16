import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Demo from "./routes/Demo";
import Home from "./routes/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/demo" element={<Demo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

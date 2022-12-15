import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import Blogs from "./pages/Blogs";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/blogs" element={<Blogs />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

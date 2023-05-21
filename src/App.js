import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";

function App() {
  return (
    <Router>
      {/* <div>
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
      </div> */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/menu" element={<Menu />} />
      </Routes>
    </Router>
  );
}

export default App;
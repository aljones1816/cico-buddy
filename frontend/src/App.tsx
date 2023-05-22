import { BrowserRouter, Routes, Route } from "react-router-dom";

// import pages and components
import Calories from "./pages/Calories";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Calories />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

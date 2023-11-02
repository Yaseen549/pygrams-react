import "./App.css";
import Header from "./Partials/Header";
import HomePage from "./Pages/HomePage";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import ProgramPage from "./Pages/ProgramPage";

function App() {
  return (
    <div>
      
      <Header />
      <BrowserRouter>
        <Routes>
          {/* <Route path="/books/:bookId" element={<BookDetails />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route
            path="/:programpage"
            element={<ProgramPage programPath={window.location.pathname} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

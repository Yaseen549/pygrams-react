import "./App.css";
// import HomePage from "./Pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import ProgramPage from "./Pages/ProgramPage";
import Main from "./Pages/Main";
import FunctionPage from "./Pages/FunctionPage";
import Contribute from "Pages/Contribute";
// import Header from "Partials/Header";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/books/:bookId" element={<BookDetails />} /> */}
          <Route path="/" element={<Main />} />
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/function/:functionName" element={<FunctionPage />} />

          {/* <Route
            path="/:programpage"
            element={<ProgramPage programPath={window.location.pathname} />}
          /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

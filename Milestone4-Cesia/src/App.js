import './App.css';
import StreamingQuiz from './StreamingQuiz';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StreamingQuiz />}></Route>
        <Route path="/StreamingQuiz" element={<StreamingQuiz />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
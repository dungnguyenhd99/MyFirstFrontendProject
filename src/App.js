import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />}>
      <Route index element={<Home />}></Route>
    </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

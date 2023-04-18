import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Pages/Home';
import Layout from './components/Layout/Layout';
import AboutMe from './components/Pages/AboutMe';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<AboutMe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
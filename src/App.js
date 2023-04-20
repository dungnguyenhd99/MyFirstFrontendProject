import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Pages/Home';
import Layout from './components/Layout/Layout';
import AboutMe from './components/Pages/AboutMe';
import SignIn from './components/Pages/SignIn';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signin" element={<SignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Pages/Home';
import Layout from './components/Layout/Layout';
import SignIn from './components/Pages/SignIn';
import '../src/styles/css/App.css'
import SendSuccess from './components/Pages/SendSuccess';
import Profile from './components/Pages/Profile';
import Communinty from './components/Pages/Community';
import AboutMe from './components/Pages/AboutMe';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="community" element={<Communinty />} />
          <Route path="send-success" element={<SendSuccess />} />
          <Route path="profile" element={<Profile />} />
          <Route path="creator" element={<AboutMe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
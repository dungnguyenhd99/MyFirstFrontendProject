import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './components/Pages/Home';
import Layout from './components/Layout/Layout';
import SignIn from './components/Pages/SignIn';
import '../src/styles/css/App.css'
import SendSuccess from './components/Pages/SendSuccess';
import Profile from './components/Pages/Profile';
import Communinty from './components/Pages/Community';
import AboutMe from './components/Pages/AboutMe';
import News from './components/Pages/News';

const RedirectToProject = ({ targetId }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/'); // Điều hướng về Home
    setTimeout(() => {
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' }); // Cuộn đến phần tử mục tiêu
      }
    }, 100); // Thời gian chờ để đảm bảo Home được render
  }, [navigate, targetId]);

  return null; // Không render gì cả
};

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
          <Route path="news" element={<News />} />
          <Route
            path="project"
            element={<RedirectToProject targetId="#myproject" />}
          /> {/* Điều hướng đến #myproject */}
          <Route
            path="project-mobile"
            element={<RedirectToProject targetId="#myprojectmobile" />}
          /> {/* Điều hướng đến #myprojectmobile */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Pages/Home';
import Layout from './components/Layout/Layout';
import SignIn from './components/Pages/SignIn';
import '../src/styles/css/App.css'
import SendSuccess from './components/Pages/SendSuccess';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="send-success" element={<SendSuccess />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
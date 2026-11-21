import Home from './Pages/Home.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './Pages/Login.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Register from './Pages/Register.jsx';
import NewPost from './Pages/NewPost.jsx';

function Layout() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path="/post" element={<NewPost />} />
                </Route>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>

            <Footer />
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
}

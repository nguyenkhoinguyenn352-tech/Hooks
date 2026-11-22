import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './Home.jsx';
import Profile from './Profile.jsx';
import Single from './Single.jsx';
import Login from './views/Login.jsx';
import Logout from './views/Logout.jsx';
import Upload from './Upload.jsx';
import { UserProvider } from './contexts/UserContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const App = () => {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <UserProvider>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/upload"
                            element={
                                <ProtectedRoute>
                                    <Upload />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/single" element={<Single />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/logout" element={<Logout />} />
                    </Route>
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
};

export default App;
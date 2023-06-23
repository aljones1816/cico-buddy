import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import pages and components
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { useAuth } from "./api/hooks/useAuthContext";
function App() {
    const { user } = useAuth();
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: user ? _jsx(Home, {}) : _jsx(Navigate, { to: "/login" }) }), _jsx(Route, { path: "/signup", element: !user ? _jsx(Signup, {}) : _jsx(Navigate, { to: "/" }) }), _jsx(Route, { path: "/login", element: !user ? _jsx(Login, {}) : _jsx(Navigate, { to: "/" }) }), _jsx(Route, { path: "/profile", element: user ? _jsx(Profile, {}) : _jsx(Navigate, { to: "/login" }) })] }) }));
}
export default App;

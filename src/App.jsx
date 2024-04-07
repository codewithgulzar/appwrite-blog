import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index";

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authService
            .getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(
                        login({
                            userData: userData,
                        })
                    );
                } else {
                    dispatch(logout());
                }
            })
            .catch((error) => {
                console.log("App :: useEffect :: error", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return !loading ? (
        <div className="min-h-screen flex flex-wrap bg-gray-400 content-between">
            <div className="w-full block">
                <Header />
                <main>{/* <Outlet /> */}</main>
                <Footer />
            </div>
        </div>
    ) : null;
}

export default App;

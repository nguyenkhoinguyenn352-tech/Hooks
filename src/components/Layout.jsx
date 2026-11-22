import { Link, Outlet } from "react-router-dom";
import { useUserContext } from "../Hooks/contextHooks";

const Layout = () => {
    const { user } = useUserContext();

    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b border-gray-300 pb-3 mb-6">
                <nav>
                    <ul className="flex flex-wrap items-center gap-4 *:rounded-md *:bg-slate-800 *:text-white *:px-3 *:py-1.5 *:text-sm *:font-medium">
                        <li>
                            <Link to="/" className="hover:underline">
                                Home
                            </Link>
                        </li>
                        {user ? (
                            <>
                                <li>
                                    <Link to="/profile" className="hover:underline">
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/upload" className="hover:underline">
                                        Upload
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/logout" className="hover:underline">
                                        Logout
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to="/login" className="hover:underline">
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </header>

            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
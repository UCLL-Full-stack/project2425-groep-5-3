import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

    useEffect(() => {
        setLoggedInUser(sessionStorage.getItem("loggedInUser"));
    }, []);

    const handleClick = () => {
        sessionStorage.removeItem("loggedInUser");
        setLoggedInUser(null);
    }

    return (
        <header className="p-4 mb-4 bg-dark bg-gradient rounded shadow-sm">
            <a className="fs-3 d-flex justify-content-center text-white fw-bold mb-3 text-decoration-none">
                Event Planner
            </a>

            <nav className="nav justify-content-center">
                <Link href="/" className="nav-link fs-5 text-white px-3 py-2">
                    Home
                </Link>
                <Link href="/events" className="nav-link fs-5 text-white px-3 py-2">
                    Events
                </Link>

                {!loggedInUser && (
                    <Link href="/login" className="nav-link fs-5 text-white px-3 py-2">
                        Login
                    </Link>
                )}

                {loggedInUser && (
                    <a
                        href="#"
                        className="nav-link fs-5 text-white px-3 py-2"
                        onClick={handleClick}
                    >
                        Logout
                    </a>
                )}

                {loggedInUser && (
                    <div className="nav-link fs-5 text-white px-3 py-2">
                        Welcome, {loggedInUser}!
                    </div>
                )}
            </nav>
        </header>

    );
};

export default Header;

import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <div className="">
                    <a href="/" onClick={() => Auth.logout()}>
                        Logout
                    </a>
                </div>
            );
        } else {
            return (
                <ul className="">
                    <li className="">
                        <Link to="/signup">
                            Signup
                        </Link>
                    </li>
                    <li className="">
                        <Link to="/login">
                            Login
                        </Link>
                    </li>
                </ul>
            );
        }
    }

    return (
        <header className="flex-row px-1">
            <h1>
                <Link to="/">
                    Pokemon Trading Post
                </Link>
            </h1>

            <nav>
                {showNavigation()}
            </nav>
        </header>
    );
}

export default Nav;

import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
// import Cart from "../Cart";
import './style.css'

function Nav() {

    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <ul className="navbar-nav">
                    <li className="nav-item bg-dark">
                        <a className="nav-link btn btn-danger text-dark" href="/" onClick={() => Auth.logout()}>Logout</a>
                    </li>
                    {/* <Cart /> */}
                </ul>
            );
        } else {
            return (
                <ul className="navbar-nav">
                    <li className="nav-item bg-dark">
                        <Link className="nav-link btn btn-info text-dark" to="/signup">Signup</Link>
                    </li>
                    <li className="nav-item bg-dark">
                        <Link className="nav-link btn btn-info text-dark" to="/login">Login</Link>
                    </li>
                </ul>
            );
        }
    }

    return (
        <header className="">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">Pokemon Trading Post</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse bg-dark" id="navbarNav">
                    {showNavigation()}
                </div>
            </nav>
        </header>
    );
}

export default Nav;

import { Link } from "react-router-dom";

const Navbar = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand fs-3" to="/">NAGWA</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item mx-2 grow-ng">
                <Link className="nav-link fw-bold" to="/">Home</Link>
              </li>
              <li className="nav-item mx-2 grow-ng">
                <Link className="nav-link fw-bold" to="/leaderboard">LeaderBoard</Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link btn btn-primary rounded-ng btn-ng border-ng text-white fw-bold" to="/create">Create New Word</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
}
 
export default Navbar;
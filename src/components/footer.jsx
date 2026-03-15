import React from 'react';
import { Link } from 'react-router-dom';
import { MdForum, MdOutlineLeaderboard } from 'react-icons/md';
import { IoMdLogIn, IoMdLogOut } from 'react-icons/io';

export default function Footer({ authUser, logOut }) {
  return (
    <footer>
      <div className="nav-bottom">
        <nav>
          <Link to="/" className="nav-item">
            <MdForum size={24} />
            <span>Threads</span>
          </Link>

          <Link to="/leaderboards" className="nav-item">
            <MdOutlineLeaderboard size={24} />
            <span>Leaderboards</span>
          </Link>
          {authUser ? (
            <button onClick={logOut} className="nav-item">
              <IoMdLogOut size={24} />
              <span>Logout</span>
            </button>
          ) : (
            <Link to="/login" className="nav-item">
              <IoMdLogIn size={24} />
              <span>Login</span>
            </Link>
          )}
        </nav>
      </div>
    </footer>
  );
}
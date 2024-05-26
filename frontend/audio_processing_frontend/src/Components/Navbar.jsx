import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { MdKeyboardVoice } from "react-icons/md";

const Navbar = () => {
  return (
    <div>
      
        <nav className="navbar navbar-expand-lg bg-dark.bg-gradient">
            <div className="container-fluid">
                <Link className="navbar-brand text-white ms-3 fs-4 d-flex justify-content-center align-items-center gap-2" style={{marginRight: "10rem"}} to="/"><MdKeyboardVoice />OSSS</Link>
                <button className="navbar-toggler bg-success" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse navList" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <Link className="nav-link active text-white fs-5 fw-medium me-5" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link active text-white fs-5 fw-medium me-5" aria-current="page" to="/about">About</Link>
                    </li>
                </ul>
                </div>
            </div>
        </nav>

    </div>
  )
}

export default Navbar

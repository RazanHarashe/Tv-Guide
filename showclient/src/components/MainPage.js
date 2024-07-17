import React from 'react';
import { Link } from 'react-router-dom';
import './css/MainPage.css';
const MainPage = () => {
    return (
        <div className="main-container">
            <header className="header">
                <h1>TV Guide and Review System</h1>
                <nav>
                    <Link to="/login" className="btn">Login</Link>
                    <Link to="/register" className="btn">Register</Link>
                </nav>
            </header>
            <section className="photo-gallery">
                <img src="/img/harry.jpg" alt="harry potter show" />
                <img src="/img/stranger.jpg" alt="stranger thing show" />
                <img src="/img/friends.jpg" alt="friends show" />
                <img src="/img/scream.jpg" alt="scream show" />
                <img src="/img/breacking.jpg" alt="breacking bad show" />
                <img src="/img/dead.jpg" alt="walking dead show" />
                <img src="/img/wednesday.jpg" alt="wednesday show" />
                <img src="/img/hill-house.jpg" alt="hill house show" />
                <img src="/img/emily.jpg" alt="emily in paris show" />
                <img src="/img/game.jpg" alt="game of thrones show" />
            </section>
        </div>
    );
};

export default MainPage;

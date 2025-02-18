import React from 'react';
import { Link } from 'react-router-dom';
import './homePage.css';

const HomePage = () => {
    return (
        <div className="homepage">
            <header className="header">
                <nav className="navbar">
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
                <h1>Welcome to the Home Page</h1>
            </header>
            <main className="main-content">
                <section className="featured-content">
                    <h2>Featured Content</h2>
                    <p>Check out our latest features and updates.</p>
                </section>
                <section className="contact-form">
                    <h2>Contact Us</h2>
                    <form>
                        <label>
                            Name:
                            <input type="text" name="name" />
                        </label>
                        <label>
                            Email:
                            <input type="email" name="email" />
                        </label>
                        <label>
                            Message:
                            <textarea name="message"></textarea>
                        </label>
                        <button type="submit">Submit</button>
                        <Link to="/login">Login</Link>
                    </form>

                </section>
            </main>
            <footer className="footer">
                <p>&copy; 2023 Your Company</p>
            </footer>
        </div>
    );
};


export default HomePage;

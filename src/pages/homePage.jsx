import React from 'react';

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
                    </form>
                </section>
            </main>
            <footer className="footer">
                <p>&copy; 2023 Your Company</p>
            </footer>

            <style jsx>{`
.homepage {
    font-family: Arial, sans-serif;
    color: #333;
}

.header {
    background-color: #f8f9fa;
    padding: 20px;
    text-align: center;
}

.navbar ul {
    list-style-type: none;
    padding: 0;
}

.navbar li {
    display: inline;
    margin: 0 10px;
}

.navbar a {
    text-decoration: none;
    color: #007bff;
}

.navbar a:hover {
    text-decoration: underline;
}

.main-content {
    padding: 20px;
}

.featured-content, .contact-form {
    margin-bottom: 20px;
}

.contact-form label {
    display: block;
    margin-bottom: 10px;
}

.contact-form input, .contact-form textarea {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.contact-form button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.contact-form button:hover {
    background-color: #0056b3;
}

.footer {
    background-color: #f8f9fa;
    text-align: center;
    padding: 10px;
    position: fixed;
    width: 100%;
    bottom: 0;
}
`}</style>
        </div>
    );
};


export default HomePage;

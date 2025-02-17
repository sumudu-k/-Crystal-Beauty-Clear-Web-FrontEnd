import React from 'react';

export default function LoginPage() {
    return (
        <div>
            <h2>Login</h2>
            <form>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit">Login</button>
            </form>
            <style jsx>{`
                div {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                h2 {
                    margin-bottom: 20px;
                }

                form {
                    display: flex;
                    flex-direction: column;
                    width: 300px;
                }

                div > div {
                    margin-bottom: 15px;
                }

                label {
                    margin-bottom: 5px;
                }

                input {
                    padding: 10px;
                    font-size: 16px;
                }

                button {
                    padding: 10px;
                    font-size: 16px;
                    background-color: #007BFF;
                    color: white;
                    border: none;
                    cursor: pointer;
                }

                button:hover {
                    background-color: #0056b3;
                }
            `}</style>

        </div>
    )
}



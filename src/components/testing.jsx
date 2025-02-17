import { useState } from 'react';
import './testing.css';

export default function Testing() {

    const [count, setCount] = useState(45);
    const [name, setName] = useState("Students");

    function increment() {
        setCount(count + 1);
    }

    function decrement() {
        setCount(count - 1);
    }

    function changeName(nameValue) {
        setName(nameValue);
    }

    return (
        <div className='background'>
            <button className='val' onClick={decrement}>-</button>
            <span>{count}</span>
            <button className='val' onClick={increment} >+</button>
            <h1>{name}</h1>

            <div className='button-panel'>
                <button onClick={() => changeName("Students")} >Students</button>
                <button onClick={() => changeName("Teachers")} >Teachers</button>
                <button onClick={() => changeName("Principles")}>Principles</button>
            </div>

        </div >
    )
}


import { useState } from 'react';
import './testing.css';

export default function Testing() {

    const [count, setCount] = useState(45);

    function increment() {
        setCount(count + 1);
    }

    function decrement() {
        setCount(count - 1);
    }


    return (
        <div className='background'>
            <button onClick={decrement}>-</button>
            <span>{count}</span>
            <button onClick={increment} >+</button>
        </div>
    )
}


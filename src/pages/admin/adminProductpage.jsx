import axios from 'axios';
import { useState } from 'react';
export default function AdminProductPage() {

    const [product, setProduct] = useState(
        [
            {
                "_id": "67ac78d2aefb8f3035aa0022",
                "productId": "BP1001",
                "productName": "Glow Radiance Face Serum",
                "altNames": [
                    "Hydrating Face Serum",
                    "Vitamin C Serum"
                ],
                "images": [
                    "https://example.com/images/glow-radiance-front.jpg",
                    "https://example.com/images/glow-radiance-side.jpg"
                ],
                "price": 29.99,
                "lastPrice": 20.99,
                "stock": 50,
                "description": "A lightweight, fast-absorbing face serum enriched with Vitamin C and Hyaluronic Acid to boost skin radiance, hydration, and even skin tone",
                "__v": 0
            },
            {
                "_id": "67aeba3fcaa9b54f2dcf042a",
                "productId": "BP1002",
                "productName": "Lush Hydration Night Cream",
                "altNames": [
                    "Deep Moisture Night Cream",
                    "Rejuvenating Night Repair"
                ],
                "images": [
                    "https://example.com/images/lush-hydration-front.jpg",
                    "https://example.com/images/lush-hydration-side.jpg"
                ],
                "price": 34.99,
                "lastPrice": 27.99,
                "stock": 40,
                "description": "A rich, nourishing night cream formulated with hyaluronic acid and essential oils to deeply hydrate and rejuvenate your skin overnight.",
                "__v": 0
            },
            {
                "_id": "67aeba6ecaa9b54f2dcf042c",
                "productId": "BP1003",
                "productName": "PureGlow Herbal Face Wash",
                "altNames": [
                    "Gentle Herbal Cleanser",
                    "Organic Face Wash"
                ],
                "images": [
                    "https://example.com/images/pureglow-facewash-front.jpg",
                    "https://example.com/images/pureglow-facewash-side.jpg"
                ],
                "price": 19.99,
                "lastPrice": 14.99,
                "stock": 75,
                "description": "A refreshing herbal face wash infused with natural extracts like green tea and aloe vera to cleanse, hydrate, and revitalize your skin.",
                "__v": 0
            }
        ]
    );
    console.log(product);


    axios.get('http://localhost:5000/api/products').then((res) => {
        console.log(res);
    })


    return (
        <div>
            <h1>Admin Product Page</h1>
        </div>
    )
}
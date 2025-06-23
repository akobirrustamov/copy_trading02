import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const MyComponent = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const timestamp = Date.now();
                const method = 'GET';
                const path = 'https://api.bitget.com/api/v2/copy/mix-broker/query-traders';
                const queryString = 'traderId=b9bc4d7089b33a56a091&productType=USDT-FUTURES'; // Include the query string
                const secretKey = '049d7313de4e54322b1a18bab9755bb0bb1b343d3260a06b4d1ec521c3cd3dc8'; // Replace with your actual API secret

                // Generate signature
                const signature = createSignature(timestamp, method, path, queryString, secretKey);

                // Set request headers
                const headers = {
                    'ACCESS-KEY': 'bg_dbaa125c05861fb636113fd731b80a46',
                    'ACCESS-SIGN': signature,
                    'ACCESS-PASSPHRASE': 'akow8434',
                    'ACCESS-TIMESTAMP': timestamp,
                    'Content-Type': 'application/json',
                };

                // Make the HTTP GET request
                const response = await axios.get(path + queryString, { headers });

                // Set the response data
                setData(response.data);
            } catch (error) {
                console.error('Error:', error);
                setError(error);
            }
        };

        fetchData();
    }, []);

    const createSignature = (
        timestamp,
        method,
        path,
        queryString,
        secretKey
    ) => {
        const data = timestamp + method.toUpperCase() + path + queryString;
        const signature = CryptoJS.HmacSHA256(data, secretKey).toString(CryptoJS.enc.Hex);
        return signature;
    };

    return (
        <div className={'text-white'}>
            <h1>Bitget API Example</h1>
            {error && <p>Error: {error.message}</p>}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
            {!data && !error && <p>Loading...</p>}
        </div>
    );
};

export default MyComponent;

import React, { useState, useEffect } from 'react';

const TelegramImage = () => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const channelID = 'bsbsi39idjdjxj';
        const imgID = '468';
        const botToken = '6607013384:AAG3pF4q2e9G4aYtGk3Mf3iWHNHW8rvOQGY';

        const fetchImageUrl = async () => {
            try {
                const response = await fetch(`https://api.telegram.org/bot${botToken}/getFile?file_id=AgACAgIAAxkBAAEYNQZlpqXq1m53jwYszihrSTjBeWIYcgAC99MxG9KfGUnJJxnwMEdozAEAAwIAA3gAAzQE`);
                const data = await response.json();
                console.log(data)
                if (data.ok) {
                    const file_path = data.result.file_path;
                    const fullImageUrl = `https://api.telegram.org/file/bot${botToken}/${file_path}`;
                    setImageUrl(fullImageUrl);
                } else {
                    console.error('Error fetching image URL from Telegram API');
                }
            } catch (error) {
                console.error('Error fetching image URL:', error);
            }
        };

        fetchImageUrl();
    }, []);

    return (
        <div>
            {imageUrl && <img src={imageUrl} alt="Telegram Image" />}
            {!imageUrl && <p>Loading...</p>}
        </div>
    );
};

export default TelegramImage;

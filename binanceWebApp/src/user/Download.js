import React, { useEffect, useState } from 'react';

const Download = () => {
    const [imgUrl, setImgUrl] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch('https://i.ibb.co/YRD7PhR/29622418feb8.jpg');
                const blob = await response.blob();
                const objectURL = URL.createObjectURL(blob);
                setImgUrl(objectURL);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    }, []);

    const handleDownload = () => {
        // Trigger the download when the user clicks the link
        const link = document.createElement('a');
        link.href = imgUrl;
        link.download = 'downloaded_image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="image-container">
            <h2 className="text-white">sdc</h2>
            {imgUrl && (
                <a className="text-white" href={imgUrl} download onClick={handleDownload}>
                    <img src={imgUrl} width={25} alt="Download Image" />
                </a>
            )}
        </div>
    );
};

export default Download;

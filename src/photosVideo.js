import React, { useState } from 'react';



const PhotosVideo = () => {
    const [media, setMedia] = useState([]);
    const [mediaFile, setMediaFile] = useState(null);
    const [mediaType, setMediaType] = useState('image'); // Default type is image
    const [error, setError] = useState(''); // For error messages

    // Simulating admin login state; change to true to test as admin
    const isAdmin = false; // Change this to true to simulate an admin login

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file type
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
            const validVideoTypes = ['video/mp4', 'video/webm'];

            if (mediaType === 'image' && !validImageTypes.includes(file.type)) {
                setError('Please upload a valid image file (JPEG, PNG, GIF).');
                setMediaFile(null);
                return;
            } else if (mediaType === 'video' && !validVideoTypes.includes(file.type)) {
                setError('Please upload a valid video file (MP4, WEBM).');
                setMediaFile(null);
                return;
            }
            setError(''); // Clear error if file is valid
            setMediaFile(file);
        }
    };

    const handleTypeChange = (e) => {
        setMediaType(e.target.value);
        setMediaFile(null); // Reset the file input when type changes
    };

    const handleUpload = (e) => {
        e.preventDefault();
        if (mediaFile) {
            const newMedia = {
                file: URL.createObjectURL(mediaFile), // Create a URL for the uploaded file
                type: mediaType,
            };
            setMedia([...media, newMedia]);
            setMediaFile(null); // Reset the file input after upload
        }
    };

    return (
        <div className="photos-video-container">
            <h2>Upload Photos and Videos</h2>
            {/* Check if the user is an admin */}
            {isAdmin ? (
                <form onSubmit={handleUpload} className="upload-form">
                    {error && <p className="error-message">{error}</p>}
                    <div>
                        <label>Media Type:</label>
                        <select value={mediaType} onChange={handleTypeChange}>
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                        </select>
                    </div>
                    <div>
                        <label>{mediaType === 'image' ? 'Upload Image' : 'Upload Video'}:</label>
                        <input
                            type="file"
                            accept={mediaType === 'image' ? 'image/*' : 'video/*'}
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                    {mediaFile && (
                        <div className="file-preview">
                            {mediaType === 'image' ? (
                                <img src={URL.createObjectURL(mediaFile)} alt="Preview" className="preview-image" />
                            ) : (
                                <video controls className="preview-video">
                                    <source src={URL.createObjectURL(mediaFile)} type={mediaFile.type} />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>
                    )}
                    <button type="submit" className="upload-button">Upload</button>
                </form>
            ) : (
                <p>You must be an admin to upload media.</p>
            )}

            <h2>Uploaded Media</h2>
            <div className="media-list">
                {media.map((item, index) => (
                    <div key={index} className="media">
                        {item.type === 'image' ? (
                            <img src={item.file} alt={`Uploaded Media ${index}`} className="media-image" />
                        ) : (
                            <video controls className="media-video">
                                <source src={item.file} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotosVideo;

// SocialMediaLinks.js
import React from 'react';
import './styles.css'; // Import your CSS styles

const SocialMediaLinks = () => {
    return (
        <div className="social-media-container">
            <div className="contact-info">
                <span>Contact us on: +234(0)8032474556</span>
                <span>Email: <a href="mailto:support@franciscafoundation.org">support@franciscafoundation.org</a></span>
            </div>
            <div className="social-media-links">
                <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" />
                </a>
                <a href="https://www.instagram.com/yourpage" target="_blank" rel="noopener noreferrer">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" />
                </a>
                <a href="https://www.youtube.com/yourchannel" target="_blank" rel="noopener noreferrer">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png" alt="YouTube" />
                </a>
            </div>
        </div>
    );
};

export default SocialMediaLinks;

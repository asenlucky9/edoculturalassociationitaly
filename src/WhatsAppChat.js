// WhatsAppChat.js
import React from 'react';
import './styles.css'; // Import your CSS styles

function WhatsAppChat() {
    const phoneNumber = '1234567890'; // Replace with the actual phone number

    return (
        <a
            href={`https://wa.me/${phoneNumber}`}
            className="whatsapp-chat"
            target="_blank"
            rel="noopener noreferrer"
        >
            <img 
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                alt="Chat on WhatsApp" 
                className="whatsapp-icon" 
            />
        </a>
    );
}

export default WhatsAppChat;

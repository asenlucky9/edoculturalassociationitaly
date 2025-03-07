import React, { useState } from 'react';

const Contact = () => {
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission (e.g., send message to an email or API)
        alert('Your message has been sent!');
        setMessage(''); // Clear the message input after submission
    };

    return (
        <div>
            <h2>Contact Us</h2>
            <p>If you have any questions or would like to get in touch, feel free to contact us through any of the methods below.</p>
            
            <h3>Phone</h3>
            <p>You can reach us at: <a href="tel:+392427539776">+392427539776</a></p>

            <h3>Email</h3>
            <p>You can send us an email at: <a href="mailto:info@edoculturalassociation.it">info@edoculturalassociation.it</a></p>

            <h3>Facebook</h3>
            <p>Connect with us on Facebook: <a href="https://www.facebook.com/edoculturalassociation" target="_blank" rel="noopener noreferrer">Edo Cultural Association Facebook Page</a></p>

            <h3>Secretariat Address</h3>
            <p>Via Brecia 3, Udine, 33100 Italy</p>

            {/* Embed Google Maps */}
            <h3>Location</h3>
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.3331260844057!2d13.234962415346294!3d46.06550797910913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4777a9c0c56c6d5f%3A0x60e15e7c57da6930!2sVia%20Brecia%203%2C%2033100%20Udine%2C%20Italy!5e0!3m2!1sen!2sus!4v1698202879879!5m2!1sen!2sus" 
                width="600" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                title="Secretariat Location"
            ></iframe>

            <h3>Send Us a Message</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" required />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" required />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea 
                        id="message" 
                        rows="4" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        required
                    />
                </div>
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
};

export default Contact;

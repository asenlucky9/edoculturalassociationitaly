import React, { useState } from 'react';
import './MembershipRegister.css'; // Import the CSS file

const MembershipRegister = () => {
    // Initialize state for form data and messages
    const [formData, setFormData] = useState({
        surname: '',
        name: '',
        otherName: '',
        homeAddress: '',
        dob: '',
        townCity: '',
        localGovt: '',
        passportId: '',
        codiceFiscale: '',
        phone: '',
        nextOfKinName: '',
        nextOfKinPhone: '',
        nextOfKinAddress: '',
        nextOfKinCity: '',
        nextOfKinCountry: '',
        isMarried: '',
        partnerName: '',
        childrenCount: '',
        childrenNames: '',
        parentsStatus: '',
        association: '',
        criminalRecord: '',
        reason: '',
        agreement: false,
        passportPhoto: null,
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle file input change
    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            passportPhoto: e.target.files[0], // Save the file
        }));
    };

    // Handle checkbox changes
    const handleCheckboxChange = () => {
        setFormData((prev) => ({
            ...prev,
            agreement: !prev.agreement,
        }));
    };

    // Validate form data
    const validateFormData = () => {
        if (!formData.agreement) {
            setErrorMessage('You must agree to the terms and conditions.');
            return false;
        }
        // Add any additional validation checks as needed
        return true;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateFormData()) return; // Validate before proceeding

        const formDataToSubmit = new FormData();
        for (const key in formData) {
            formDataToSubmit.append(key, formData[key]);
        }

        try {
            const response = await fetch('/api/membership-register', {
                method: 'POST',
                body: formDataToSubmit,
            });

            if (!response.ok) {
                const errorResponse = await response.json(); // Parse the response body
                throw new Error(errorResponse.message || 'Failed to submit the form. Please check your input.');
            }

            // Reset form data after successful submission
            setFormData({
                surname: '',
                name: '',
                otherName: '',
                homeAddress: '',
                dob: '',
                townCity: '',
                localGovt: '',
                passportId: '',
                codiceFiscale: '',
                phone: '',
                nextOfKinName: '',
                nextOfKinPhone: '',
                nextOfKinAddress: '',
                nextOfKinCity: '',
                nextOfKinCountry: '',
                isMarried: '',
                partnerName: '',
                childrenCount: '',
                childrenNames: '',
                parentsStatus: '',
                association: '',
                criminalRecord: '',
                reason: '',
                agreement: false,
                passportPhoto: null,
            });

            setSuccessMessage('Membership registration successful!');
            setErrorMessage('');
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage(error.message);
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <h2>Membership Registration Form</h2>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                {/* Form fields */}
                <div>
                    <label>SURNAME:</label>
                    <input
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>NAME:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>OTHER NAME:</label>
                    <input
                        type="text"
                        name="otherName"
                        value={formData.otherName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>HOME ADDRESS:</label>
                    <input
                        type="text"
                        name="homeAddress"
                        value={formData.homeAddress}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>DATE OF BIRTH:</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>TOWN/CITY OF BIRTH:</label>
                    <input
                        type="text"
                        name="townCity"
                        value={formData.townCity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>LOCAL GOVT OF ORIGIN FROM EDO STATE:</label>
                    <input
                        type="text"
                        name="localGovt"
                        value={formData.localGovt}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>PASSPORT/IDENTITY NUMBER:</label>
                    <input
                        type="text"
                        name="passportId"
                        value={formData.passportId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>CODICE FISCALE:</label>
                    <input
                        type="text"
                        name="codiceFiscale"
                        value={formData.codiceFiscale}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>PHONE/WHATSAPP NUMBER:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>NEXT OF KIN NAME:</label>
                    <input
                        type="text"
                        name="nextOfKinName"
                        value={formData.nextOfKinName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>NEXT OF KIN PHONE NUMBER:</label>
                    <input
                        type="text"
                        name="nextOfKinPhone"
                        value={formData.nextOfKinPhone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>NEXT OF KIN ADDRESS:</label>
                    <input
                        type="text"
                        name="nextOfKinAddress"
                        value={formData.nextOfKinAddress}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>NEXT OF KIN CITY:</label>
                    <input
                        type="text"
                        name="nextOfKinCity"
                        value={formData.nextOfKinCity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>NEXT OF KIN COUNTRY:</label>
                    <select
                        name="nextOfKinCountry"
                        value={formData.nextOfKinCountry}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Country...</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Italy">Italy</option>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                        <option value="Ghana">Ghana</option>
                        {/* Add more countries as needed */}
                    </select>
                </div>
                <div>
                    <label>ARE YOU MARRIED:</label>
                    <select name="isMarried" value={formData.isMarried} onChange={handleChange} required>
                        <option value="">Select...</option>
                        <option value="yes">YES</option>
                        <option value="no">NO</option>
                    </select>
                </div>
                {formData.isMarried === 'yes' && (
                    <div>
                        <label>NAME OF PARTNER:</label>
                        <input
                            type="text"
                            name="partnerName"
                            value={formData.partnerName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}
                <div>
                    <label>DID YOU HAVE CHILDREN? (How many?):</label>
                    <input
                        type="number"
                        name="childrenCount"
                        value={formData.childrenCount}
                        onChange={handleChange}
                    />
                </div>
                {formData.childrenCount > 0 && (
                    <div>
                        <label>LIST THEIR NAMES:</label>
                        <input
                            type="text"
                            name="childrenNames"
                            value={formData.childrenNames}
                            onChange={handleChange}
                        />
                    </div>
                )}
                <div>
                    <label>ARE YOUR PARENTS ALIVE? (Yes/No):</label>
                    <select name="parentsStatus" value={formData.parentsStatus} onChange={handleChange} required>
                        <option value="">Select...</option>
                        <option value="yes">YES</option>
                        <option value="no">NO</option>
                    </select>
                </div>
                <div>
                    <label>DO YOU BELONG TO ANY ASSOCIATION/CLUB?</label>
                    <input
                        type="text"
                        name="association"
                        value={formData.association}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>HAVE YOU EVER BEEN CONVICTED OF A CRIME? (Yes/No):</label>
                    <select name="criminalRecord" value={formData.criminalRecord} onChange={handleChange} required>
                        <option value="">Select...</option>
                        <option value="yes">YES</option>
                        <option value="no">NO</option>
                    </select>
                </div>
                <div>
                    <label>REASON FOR ENROLLING:</label>
                    <textarea
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="agreement"
                            checked={formData.agreement}
                            onChange={handleCheckboxChange}
                        />
                        I hereby confirm that the above information is true to the best of my knowledge and I agree to abide by the rules and regulations of the Edo Cultural Association.
                    </label>
                </div>
                <div>
                    <label>UPLOAD PASSPORT PHOTO:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default MembershipRegister;

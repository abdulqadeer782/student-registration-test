import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react'

const RegistrationForm = ({ errors }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState('');
    const [document, setDocument] = useState('')
    const [subjects, setSubjects] = useState([]);

    const handleImageChange = (e) => {
        const newImages = e.target.files[0];
        setImage(newImages);
    };

    const handleDocumentChange = (e) => {
        const newDoc = e.target.files[0]
        setDocument(newDoc)
    }

    const handleAddSubject = () => {
        setSubjects([...subjects, '']);
    };

    const handleRemoveSubject = (index) => {
        const newSubjects = subjects.filter((_, i) => i !== index);
        setSubjects(newSubjects);
    };

    const handleSubjectChange = (index, value) => {
        const newSubjects = [...subjects];
        newSubjects[index] = value;
        setSubjects(newSubjects);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            name,
            email,
            phone,
            image,
            document,
            subjects,
        }

        router.post('/student', formData)
    };

    return (
        <div>
            <form onSubmit={handleSubmit} method='POST'>
                <h2>Student Registration Form</h2>
                <div>
                    <label>Name:</label>
                    <input
                        name='name'
                        type="text"
                        placeholder='Enter name!'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <div className='error-inputs'>{errors.name}</div>}
                </div>

                <div>
                    <label>Email:</label>
                    <input
                        name='email'
                        type="email"
                        placeholder='Enter email!'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <div className='error-inputs'>{errors.email}</div>}
                </div>

                <div>
                    <label>Phone #:</label>
                    <input
                        name='phone'
                        type="text"
                        placeholder='Enter phone number!'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    {errors.phone && <div className='error-inputs'>{errors.phone}</div>}
                </div>

                <div>
                    <label>Images:</label>
                    <input
                        name='image'
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {errors.image && <div className='error-inputs'>{errors.image}</div>}
                </div>

                <div>
                    <label>Document:</label>
                    <input
                        name='document'
                        type="file"
                        onChange={handleDocumentChange}
                    />
                    {errors.document && <div className='error-inputs'>{errors.document}</div>}
                </div>
                <div>
                    <label>Subjects:</label>
                    <button type="button" onClick={handleAddSubject}>
                        Add Subject
                    </button>

                    {subjects.map((subject, index) => (
                        <div key={index} className="subject-container">
                            <input
                                name={`subject${index + 1}`}
                                type="text"
                                value={subject}
                                placeholder={`Enter Subject ${index + 1}`}
                                onChange={(e) => handleSubjectChange(index, e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="remove-btn"
                                onClick={() => handleRemoveSubject(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default RegistrationForm;

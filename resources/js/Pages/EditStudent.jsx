import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react'

const EditStudent = ({ student, id, errors }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        if (student) {
            setName(student.name)
            setEmail(student.email)
            setPhone(student.phone)

            setSubjects(student.subject.split(','))
        }
    }, [student])

    useEffect(() => {
        console.log('fffffff', subjects)
    }, [subjects])


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
            subjects,
        }

        router.patch(`/student/${id}`, formData)
    };



    return (
        <div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <h2>Update Student {student.name}</h2>
                <div>
                    <label>Name:</label>
                    <input
                        name='name'
                        type="text"
                        placeholder='Enter name!'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Email:</label>
                    <input
                        name='email'
                        type="email"
                        placeholder='Enter email!'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Phone #:</label>
                    <input
                        name='phone'
                        type="text"
                        placeholder='Enter phone number!'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>

                <label>Current Image:</label>
                <div>
                    {student.image && <img src={`/storage/${student.image}`} alt="Student Image" />}
                </div>


                <label>Current Document:</label>
                <div>
                    {student.document && <a href={`/storage/${student.document}`} >View Doc</a>}
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

                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditStudent;

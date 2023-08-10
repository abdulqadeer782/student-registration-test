import { Link, router } from '@inertiajs/react'
import React from 'react'

function ViewStudent({ students }) {
    return (
        <div className="view-container">
            <div className='view-head'>
                <h2>Students</h2>
                <Link href={'/student/create'}>Register Student</Link>

            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Image</th>
                        <th>Document</th>
                        <th>Subjects</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((std, index) => (
                        <tr key={index}>
                            <td align='center'>{std.id}</td>
                            <td align='center'>{std.name}</td>
                            <td align='center'>{std.email}</td>
                            <td align='center'>{std.phone}</td>
                            <td align='center'>
                                <img src={`storage/${std.image}`} alt={`Student Image`} />
                            </td>
                            <td align='center'>
                                <a href={`/storage/${std.document}`} >View Doc</a>
                            </td>
                            <td className='subject_container' align='center'>
                                {std.subject ? std.subject.split(',').map((sbj, index) => (
                                    <React.Fragment key={index}>
                                        <div className="chip">{sbj}</div>
                                    </React.Fragment>
                                )) : "N/A"}
                            </td>
                            <td align='center'>
                                <div className='actions'>
                                    <button>
                                        <Link style={{ color: '#fff', textDecoration: 'none' }} href={`/student/${std.id}/edit`}>Edit</Link>
                                    </button>
                                    <button
                                        className='bg-danger'
                                        onClick={() => router.delete(`/student/${std.id}`)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ViewStudent

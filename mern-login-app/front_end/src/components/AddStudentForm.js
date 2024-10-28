// // client/src/components/AddStudentForm.js
// import React, { useState } from 'react';

// function AddStudentForm({ addStudent }) {
//     const [rollno, setRollno] = useState('');
//     const [name, setName] = useState('');
//     const [className, setClassName] = useState('');
//     const [parentEmail, setParentEmail] = useState('');
//     const [attendancePercentage, setAttendancePercentage] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const student = {
//             rollno,
//             name,
//             class: className,
//             parent_email: parentEmail,
//             attendance: {
//                 percentage: Number(attendancePercentage)
//             }
//         };
//         addStudent(student);
//         setRollno('');
//         setName('');
//         setClassName('');
//         setParentEmail('');
//         setAttendancePercentage('');
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 value={rollno}
//                 placeholder="Admission Number"
//                 onChange={(e) => setRollno(e.target.value)}
//                 required
//             />
//             <input
//                 type="text"
//                 value={name}
//                 placeholder="Student Name"
//                 onChange={(e) => setName(e.target.value)}
//                 required
//             />
//             <input
//                 type="text"
//                 value={className}
//                 placeholder="Class"
//                 onChange={(e) => setClassName(e.target.value)}
//                 required
//             />
//             <input
//                 type="email"
//                 value={parentEmail}
//                 placeholder="Parent Email"
//                 onChange={(e) => setParentEmail(e.target.value)}
//                 required
//             />
//             <input
//                 type="number"
//                 value={attendancePercentage}
//                 placeholder="Attendance Percentage"
//                 onChange={(e) => setAttendancePercentage(e.target.value)}
//                 required
//             />
//             <button type="submit">Add Student</button>
//         </form>
//     );
// }

// export default AddStudentForm;
// AddStudentForm.js
import React, { useState } from 'react';

function AddStudentForm({ addStudent }) {
    const [studentData, setStudentData] = useState({
        rollno: '',
        name: '',
        class: '',
        parent_name: '',
        parent_email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentData({ ...studentData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addStudent(studentData);
        setStudentData({
            rollno: '',
            name: '',
            class: '',
            parent_name: '',
            parent_email: ''
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="rollno"
                placeholder="Roll No"
                value={studentData.rollno}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={studentData.name}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="class"
                placeholder="Class"
                value={studentData.class}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="parent_name"
                placeholder="Parent Name"
                value={studentData.parent_name}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="parent_email"
                placeholder="Parent Email"
                value={studentData.parent_email}
                onChange={handleChange}
                required
            />
            <button type="submit">Add Student</button>
        </form>
    );
}

export default AddStudentForm;

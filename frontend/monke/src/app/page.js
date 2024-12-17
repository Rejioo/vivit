//
// 'use client'
// import{globals} from './globals.css'
// import { useState } from 'react'
// import { addEmployeeApi } from './api/employeeApi'
// import Link from 'next/link'
//
//
// export default function EmployeeForm() {
//   const initialState={
//     name: '',
//     employee_id:'',
//     email: '',
//     phone: '',
//     department: '',
//     joinDate: '',
//     role:''
//   }
//   const [formData, setFormData] = useState(initialState)
//
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       const result = await addEmployeeApi(formData)
//       console.log('Employee added:', result)
//       // Reset form or show success message
//       setFormData(initialState)
//     } catch (error) {
//       console.error('Error:', error)
//     }
//   }
//
//   // const handleChange = (e) => {
//   //   setFormData({
//   //     ...formData,
//   //     [e.target.name]: e.target.value
//   //   })
//   // }
//
//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }))
//   }
//
//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <h1 className="text-2xl font-bold mb-6">Employee Registration</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//          <Link href="/admin">Dashboard</Link>
//
//       {/* Name */}
//
//         <div>
//           <label className="block mb-1">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />
//         </div>
//
//
//       {/*employee_id*/}
//         <div>
//           <label className="block mb-1">employee_id</label>
//           <input
//             type="number"
//             name="employee_id"
//             value={formData.employee_id}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />
//         </div>
//
//
//       {/*email*/}
//         <div>
//           <label className="block mb-1">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />
//         </div>
//         {/* phone */}
//         <div>
//           <label className="block mb-1">Phone</label>
//           <input
//             type="number"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />
//         </div>
//
//         {/* dept        */}
//         <div>
//           <label className="block mb-1">Department</label>
//           <select
//             name="department"
//             value={formData.department}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           >
//             <option value="">Select Department</option>
//             <option value="ece">ece</option>
//             <option value="cse">cse</option>
//             <option value="it">it</option>
//           </select>
//         </div>
//
//
//         {/* dateof join */}
//         <div>
//           <label className="block mb-1">Join Date</label>
//           <input
//             type="date"
//             name="date_of_joining"
//             value={formData.date_of_joining}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />
//         </div>
//
//         {/* roles        */}
//         <div>
//           <label className="block mb-1">role</label>
//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           >
//             <option value="">Select role</option>
//             <option value="engine oil">engine oil</option>
//             <option value="kadavuley">kadavuley</option>
//             <option value="helicopter">helicopter</option>
//           </select>
//         </div>
//
//
//
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   )
// }
'use client'
import { globals } from './globals.css'
import { useState } from 'react'
import { addEmployeeApi } from './api/employeeApi'
import Link from 'next/link'

export default function EmployeeForm() {
  const initialState = {
    name: '',
    employee_id: '',
    email: '',
    phone: '',
    department: '',
    date_of_joining: '',
    role: ''
  }

  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Validation rules
  const validateForm = () => {
    const newErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters long'
    }

    // Employee ID validation
    if (!formData.employee_id) {
      newErrors.employee_id = 'Employee ID is required'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/ // Assumes 10-digit phone number, modify as needed
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number'
    }

    // Department validation
    if (!formData.department) {
      newErrors.department = 'Please select a department'
    }

    // Join date validation
    if (!formData.date_of_joining) {
      newErrors.date_of_joining = 'Join date is required'
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = 'Please select a role'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!validateForm()) {
      setIsSubmitting(false)
      return
    }

    try {
      // Check if employee ID is unique
      const isEmployeeIdUnique = await checkEmployeeIdUnique(formData.employee_id)
      if (!isEmployeeIdUnique) {
        setErrors(prev => ({
          ...prev,
          employee_id: 'This Employee ID is already in use'
        }))
        setIsSubmitting(false)
        return
      }

      const result = await addEmployeeApi(formData)
      console.log('Employee added:', result)
      setFormData(initialState)
      // You could add a success message here
    } catch (error) {
      console.error('Error:', error)
      // Handle specific error cases here
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // Function to check if employee ID is unique (implement API call)
  const checkEmployeeIdUnique = async (id) => {
    try {
      // Implement your API call here
      // Return true if ID is unique, false if it already exists
      return true
    } catch (error) {
      console.error('Error checking employee ID:', error)
      return false
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Employee Registration</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Link href="/admin">Dashboard</Link>

        {/* Name */}
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Employee ID */}
        <div>
          <label className="block mb-1">Employee ID</label>
          <input
            type="number"
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${errors.employee_id ? 'border-red-500' : ''}`}
          />
          {errors.employee_id && <p className="text-red-500 text-sm mt-1">{errors.employee_id}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${errors.phone ? 'border-red-500' : ''}`}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Department */}
        <div>
          <label className="block mb-1">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${errors.department ? 'border-red-500' : ''}`}
          >
            <option value="">Select Department</option>
            <option value="ece">ECE</option>
            <option value="cse">CSE</option>
            <option value="it">IT</option>
          </select>
          {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
        </div>

        {/* Join Date */}
        <div>
          <label className="block mb-1">Join Date</label>
          <input
            type="date"
            name="date_of_joining"
            value={formData.date_of_joining}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${errors.date_of_joining ? 'border-red-500' : ''}`}
          />
          {errors.date_of_joining && <p className="text-red-500 text-sm mt-1">{errors.date_of_joining}</p>}
        </div>

        {/* Role */}
        <div>
          <label className="block mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${errors.role ? 'border-red-500' : ''}`}
          >
            <option value="">Select Role</option>
            <option value="engine oil">Engine Oil</option>
            <option value="kadavuley">Kadavuley</option>
            <option value="helicopter">Helicopter</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-500 text-white p-2 rounded 
            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

'use client'

import { useState } from 'react'

interface ReservationFormProps {
  selectedTable?: number | null
}

export default function ReservationForm({ selectedTable }: ReservationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const emailData = {
        to: formData.email,
        subject: 'Reservation Confirmation - Fine Dining',
        reservation: {
          ...formData,
          tableId: selectedTable,
          confirmationNumber: Math.random().toString(36).substring(2, 8).toUpperCase()
        }
      }

      // Send email through API route
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      })

      if (!response.ok) {
        throw new Error('Failed to send confirmation email')
      }

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        date: '',
        time: '',
        guests: '2',
        specialRequests: ''
      })
    } catch (error) {
      setSubmitStatus('error')
      console.error('Reservation failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Update label classes to be darker
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
          Number of Guests
        </label>
        <select
          id="guests"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
            <option key={num} value={num}>
              {num} {num === 1 ? 'Guest' : 'Guests'}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-2">
          Special Requests
        </label>
        <textarea
          id="specialRequests"
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
          placeholder="Any dietary restrictions or special occasions?"
        />
      </div>

      {submitStatus === 'success' && (
        <div className="p-6 bg-green-50 text-green-700 rounded-lg space-y-2">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <h3 className="font-semibold">Reservation Confirmed!</h3>
          </div>
          <p>Thank you for choosing Fine Dining.</p>
          <p className="text-sm">Please check your email for reservation details and instructions.</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          Sorry, there was an error submitting your reservation. Please try again.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-yellow-400 text-black py-4 px-6 rounded-lg text-lg font-semibold 
          ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-300'} 
          transition-all transform hover:scale-[1.02]`}
      >
        {isSubmitting ? 'Submitting...' : 'Confirm Reservation'}
      </button>
    </form>
  )
}

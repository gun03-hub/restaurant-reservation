'use client'

import { useState } from 'react'
import ReservationForm from '../components/ReservationForm'
import TableSelector from '../components/TableSelector'
import { BsCalendarCheck, BsClock, BsPeople } from 'react-icons/bs'

export default function ReservationPage() {
  const [selectedTable, setSelectedTable] = useState<number | null>(null)

  const handleTableSelect = (tableId: number) => {
    setSelectedTable(tableId)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900">
              Make a Reservation
            </h1>
            
            {/* Availability Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                <BsCalendarCheck className="text-2xl text-yellow-500" />
                <div>
                  <h3 className="font-medium text-gray-900">Next Available</h3>
                  <p className="text-sm text-gray-600">Today, 7:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                <BsClock className="text-2xl text-yellow-500" />
                <div>
                  <h3 className="font-medium text-gray-900">Opening Hours</h3>
                  <p className="text-sm text-gray-600">5:00 PM - 11:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                <BsPeople className="text-2xl text-yellow-500" />
                <div>
                  <h3 className="font-medium text-gray-900">Group Booking</h3>
                  <p className="text-sm text-gray-600">Available for 8+ guests</p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Select Your Table</h2>
              <TableSelector onTableSelect={handleTableSelect} />
              {selectedTable && (
                <p className="mt-4 text-sm text-green-600">
                  Table {selectedTable} selected
                </p>
              )}
            </div>

            <ReservationForm selectedTable={selectedTable} />
          </div>
        </div>
      </div>
    </div>
  )
}
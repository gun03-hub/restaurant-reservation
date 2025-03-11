'use client'

import { useState } from 'react'

interface TableSelectorProps {
  onTableSelect: (tableId: number) => void
}

interface Table {
  id: number
  seats: number
  isAvailable: boolean
}

const tables: Table[] = [
  { id: 1, seats: 2, isAvailable: true },
  { id: 2, seats: 4, isAvailable: true },
  { id: 3, seats: 6, isAvailable: false },
  { id: 4, seats: 2, isAvailable: false },
  { id: 5, seats: 8, isAvailable: true },
  { id: 6, seats: 6, isAvailable: true },
]

export default function TableSelector({ onTableSelect }: TableSelectorProps) {
  const [selectedTable, setSelectedTable] = useState<number | null>(null)

  const handleTableClick = (tableId: number) => {
    if (tables.find(t => t.id === tableId)?.isAvailable) {
      setSelectedTable(tableId)
      onTableSelect(tableId)
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tables.map(table => (
          <div
            key={table.id}
            onClick={() => handleTableClick(table.id)}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
              selectedTable === table.id
                ? 'border-yellow-400 bg-yellow-50'
                : table.isAvailable
                ? 'border-gray-200 hover:border-yellow-400'
                : 'border-red-200 bg-red-50 cursor-not-allowed'
            }`}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Table {table.id}
            </h3>
            <p className="text-gray-800 font-medium mb-2">
              {table.seats} seats
            </p>
            <span
              className={`text-sm font-medium px-3 py-1 rounded-full ${
                table.isAvailable
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {table.isAvailable ? 'Available' : 'Booked'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
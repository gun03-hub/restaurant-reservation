import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
                            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">Fine Dining</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
            <Link href="/reservation" className="text-gray-700 hover:text-gray-900">Reserve</Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
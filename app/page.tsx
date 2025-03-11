import Link from 'next/link'
import Image from 'next/image'
import HeroSlideshow from './components/HeroSlideshow'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[80vh] bg-black">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/70 z-10" />
        <HeroSlideshow />
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-center text-white drop-shadow-lg">
            Fine Dining <span className="text-yellow-400">Excellence</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl text-white drop-shadow-lg font-medium">
            Experience culinary mastery in an atmosphere of elegance
          </p>
          <Link 
            href="/reservation" 
            className="bg-yellow-400 text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-xl"
          >
            Book Your Table
          </Link>
        </div>
      </div>

      {/* Featured Dishes Carousel */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">Signature Dishes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['dish1.jpg', 'dish2.jpg', 'dish3.jpg'].map((img, index) => (
              <div key={index} className="relative h-80 group overflow-hidden rounded-2xl">
                <Image
                  src={`/${img}`}
                  alt={`Signature dish ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reservation CTA */}
      <div className="relative py-20">
        <div className="absolute inset-0">
          <Image
            src="/interior.jpeg"
            alt="Restaurant interior"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Reserve Your Experience</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join us for an unforgettable dining experience. Every reservation includes our signature welcome drink.
            </p>
            <Link 
              href="/reservation" 
              className="inline-block bg-yellow-400 text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-300 transition-all transform hover:scale-105"
            >
              Make a Reservation
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <Image
                  src="/menu.jpg"
                  alt="Our Menu"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Curated Menu</h3>
              <p className="text-gray-600">Seasonal ingredients crafted into extraordinary dishes by our master chefs.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <Image
                  src="/events.jpg"
                  alt="Special Events"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Private Events</h3>
              <p className="text-gray-600">Create memorable celebrations with customized menus and dedicated service.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <Image
                  src="/wine.jpg"
                  alt="Wine Selection"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Wine Pairing</h3>
              <p className="text-gray-600">Expert sommeliers to guide you through our extensive wine collection.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
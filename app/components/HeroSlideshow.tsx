'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const images = [
  '/restaurant-hero.jpeg',
  '/restaurant-hero2.jpg',
  '/restaurant-hero3.jpg',
]

export default function HeroSlideshow() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {images.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={img}
            alt={`Restaurant ambiance ${index + 1}`}
            fill
            className="object-cover blur-[2px]"
            priority={index === 0}
          />
        </div>
      ))}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentImage ? 'bg-yellow-400 w-4' : 'bg-white/50'
            }`}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </>
  )
}
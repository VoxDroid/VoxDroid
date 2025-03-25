"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface ImageGalleryProps {
  images: string[]
  alt: string
}

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const openModal = (index: number) => {
    setCurrentIndex(index)
    setIsModalOpen(true)
    document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = "auto" // Re-enable scrolling
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") nextImage()
    if (e.key === "ArrowLeft") prevImage()
    if (e.key === "Escape") closeModal()
  }

  return (
    <div>
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative h-40 rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={() => openModal(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${alt} thumbnail ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 hover:scale-110"
            />
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button
            className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 transition-colors"
            onClick={closeModal}
            aria-label="Close gallery"
          >
            <X className="h-8 w-8" />
          </button>

          <button
            className="absolute left-4 p-2 text-white hover:text-gray-300 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <div className="relative h-[80vh] w-[80vw] max-w-5xl">
            <Image
              src={images[currentIndex] || "/placeholder.svg"}
              alt={`${alt} image ${currentIndex + 1}`}
              layout="fill"
              objectFit="contain"
              className="transition-opacity duration-300"
            />
          </div>

          <button
            className="absolute right-4 p-2 text-white hover:text-gray-300 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          <div className="absolute bottom-4 text-white text-center w-full">
            <p>
              {currentIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}


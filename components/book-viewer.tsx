"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import type { BookPage } from "@/lib/types"

interface BookViewerProps {
  pages: BookPage[]
}

export function BookViewer({ pages }: BookViewerProps) {
  const [currentPage, setCurrentPage] = useState(0)

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious()
      } else if (e.key === "ArrowRight") {
        goToNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentPage])

  const goToNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const goToPrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  const leftPage = currentPage % 2 === 0 ? pages[currentPage] : null
  const rightPage = currentPage % 2 === 0 ? pages[currentPage + 1] : pages[currentPage]

  return (
    <div className="relative mx-auto max-w-6xl">
      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        disabled={currentPage === 0}
        className="absolute left-0 top-1/2 z-10 -translate-x-12 -translate-y-1/2 rounded-full border border-[color:var(--border-color)] bg-[color:var(--card)] p-3 text-[color:var(--text)] shadow-lg transition-all hover:border-[color:var(--primary-color)] hover:bg-[color:var(--primary-color)]/10 disabled:opacity-30 disabled:hover:border-[color:var(--border-color)] disabled:hover:bg-[color:var(--card)]"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={goToNext}
        disabled={currentPage >= pages.length - 1}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-12 rounded-full border border-[color:var(--border-color)] bg-[color:var(--card)] p-3 text-[color:var(--text)] shadow-lg transition-all hover:border-[color:var(--primary-color)] hover:bg-[color:var(--primary-color)]/10 disabled:opacity-30 disabled:hover:border-[color:var(--border-color)] disabled:hover:bg-[color:var(--card)]"
        aria-label="Next page"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Book Container */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-[color:var(--border-color)] bg-[color:var(--card)] shadow-2xl">
        <div className="grid md:grid-cols-2">
          {/* Left Page */}
          {leftPage && (
            <div className="border-r border-[color:var(--border-color)] p-8 md:p-12">
              <BookPageContent page={leftPage} />
            </div>
          )}

          {/* Right Page */}
          {rightPage && (
            <div className={`p-8 md:p-12 ${!leftPage ? "md:col-span-2" : ""}`}>
              <BookPageContent page={rightPage} />
            </div>
          )}
        </div>

        {/* Page Number Indicator */}
        <div className="border-t border-[color:var(--border-color)] bg-[color:var(--bg)]/50 px-6 py-3 text-center">
          <span className="text-sm text-[color:var(--muted)]">
            Page {currentPage + 1} of {pages.length}
          </span>
        </div>
      </div>

      {/* Touch/Swipe Instructions */}
      <div className="mt-4 text-center">
        <p className="text-sm text-[color:var(--muted)]">Use arrow keys or click the arrows to navigate</p>
      </div>
    </div>
  )
}

function BookPageContent({ page }: { page: BookPage }) {
  return (
    <div className="flex h-full min-h-[400px] flex-col gap-6">
      {page.title && <h2 className="text-2xl font-bold text-[color:var(--text)] text-balance">{page.title}</h2>}

      {page.body && <p className="flex-1 text-[color:var(--muted)] leading-relaxed text-pretty">{page.body}</p>}

      {page.image && (
        <div className="relative aspect-video overflow-hidden rounded-xl border border-[color:var(--border-color)]">
          <Image
            src={page.image || "/placeholder.svg"}
            alt={page.title || "Book illustration"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}
    </div>
  )
}

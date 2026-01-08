'use client'

import Link from 'next/link'
import Head from 'next/head'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'
import { useState, useMemo, useEffect } from 'react'

interface GlossaryTerm {
  term: string
  slug: string
  shortDefinition: string
  category?: string
  domains?: string[]
  tags?: string[]
  relatedArticle?: string
}

export default function GlossaryPage() {
  const [terms, setTerms] = useState<GlossaryTerm[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLetter, setSelectedLetter] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load terms on client side
  useEffect(() => {
    const loadTerms = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch('/api/glossary')
        if (response.ok) {
          const data = await response.json()
          setTerms(data)
        } else {
          setError('Failed to load glossary terms')
        }
      } catch (error) {
        console.error('Failed to load glossary terms:', error)
        setError('Failed to load glossary terms')
      } finally {
        setIsLoading(false)
      }
    }
    loadTerms()
  }, [])


  // Get available letters
  const availableLetters = useMemo(() => {
    const letters = new Set<string>()
    terms.forEach(term => {
      const char = term.term.charAt(0).toUpperCase()
      if (/[A-Z]/.test(char)) {
        letters.add(char)
      } else {
        letters.add('#')
      }
    })
    return Array.from(letters).sort()
  }, [terms])

  const alphabet = ['#', ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))]

  // Filter terms
  const filteredTerms = useMemo(() => {
    return terms.filter(term => {
      const termLetter = term.term.charAt(0).toUpperCase()
      const normalizedLetter = /[A-Z]/.test(termLetter) ? termLetter : '#'

      const matchesSearch = searchQuery === '' ||
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.shortDefinition.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesLetter = selectedLetter === 'all' ||
        normalizedLetter === selectedLetter

      return matchesSearch && matchesLetter
    }).sort((a, b) => a.term.localeCompare(b.term))
  }, [terms, searchQuery, selectedLetter])

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedLetter('all')
  }

  const hasActiveFilters = searchQuery !== '' || selectedLetter !== 'all'

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Bitcoin Glossary | Swiss Bitcoin Institute</title>
        <meta name="description" content="Comprehensive glossary of Bitcoin terms, concepts, and technical definitions." />
      </Head>

      {/* Header Section */}
      <section className="bg-white border-b border-gray-200 pt-16 pb-12">
        <div className="swiss-grid">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Glossary</h1>
            <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
              Decoded concepts and terminology from the Bitcoin ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Search Section */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="swiss-grid py-6">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Top Row: Search and Clear */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:max-w-xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search glossary terms..."
                  className="pl-10 h-12 text-base border-gray-300 focus:border-[#00abfb] focus:ring-[#00abfb] rounded-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {hasActiveFilters && (
                <Button 
                  variant="outline" 
                  onClick={handleClearFilters}
                  className="shrink-0 text-swiss-red border-swiss-red/20 hover:bg-swiss-red/5 hover:text-swiss-red"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              )}
            </div>


            {/* Alphabet Filter */}
            <div className="pt-2 overflow-x-auto">
              <div className="flex items-center gap-1 min-w-max">
                <button
                  onClick={() => setSelectedLetter('all')}
                  className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors ${
                    selectedLetter === 'all'
                      ? 'swiss-blue-gradient-text bg-swiss-blue/10'
                      : 'text-gray-400 hover:text-gray-900'
                  }`}
                >
                  All
                </button>
                {alphabet.map(letter => {
                  const isAvailable = availableLetters.includes(letter)
                  return (
                    <button
                      key={letter}
                      onClick={() => isAvailable && setSelectedLetter(letter)}
                      disabled={!isAvailable}
                      className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors ${
                        selectedLetter === letter
                          ? 'swiss-blue-gradient-text bg-swiss-blue/10 font-bold'
                          : isAvailable
                            ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            : 'text-gray-300 cursor-default'
                      }`}
                    >
                      {letter}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="swiss-section py-12">
        <div className="swiss-grid">
          <div className="max-w-7xl mx-auto">
            
            {isLoading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00abfb] mx-auto mb-4"></div>
                <p className="text-gray-500">Loading definitions...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-6">⚠️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Error loading terms</h3>
                <p className="text-gray-600 mb-6">{error}</p>
                <Button onClick={() => window.location.reload()}>Try again</Button>
              </div>
            ) : filteredTerms.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No terms found</h3>
                <p className="text-gray-500 max-w-sm mx-auto mb-6">
                  We couldn't find any terms matching your current filters.
                </p>
                <Button variant="outline" onClick={handleClearFilters}>Clear all filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTerms.map((term) => (
                  <Link 
                    key={term.slug} 
                    href={`/glossary/${term.slug}`}
                    className="group block h-full"
                  >
                    <article className="card-glossary card-gradient-hover h-full flex flex-col">
                      <h2 className="text-xl font-bold text-gray-900 leading-tight mb-3 w-full">
                        {term.term}
                      </h2>
                      
                      {term.relatedArticle && (
                        <div className="mb-3">
                          <Badge variant="outline" className="text-xs">
                            SBI-{term.relatedArticle.padStart(3, '0')}
                          </Badge>
                        </div>
                      )}
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-4 flex-grow">
                        {term.shortDefinition}
                      </p>
                      
                      <div className="link-research text-sm mt-auto">
                        Read full definition →
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
            
            {/* Results Count Footer */}
            {!isLoading && filteredTerms.length > 0 && (
              <div className="mt-12 text-center text-sm text-gray-400">
                Showing {filteredTerms.length} terms
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
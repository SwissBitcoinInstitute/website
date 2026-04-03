"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  Calculator, 
  Calendar, 
  CreditCard, 
  Settings, 
  Smile, 
  User,
  Search,
  FileText,
  BookOpen,
  Layout,
  GraduationCap
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"

interface SearchItem {
  id: string
  title: string
  url: string
  type: 'page' | 'article' | 'glossary' | 'course'
  description?: string
}

export function SiteSearch({ onSelect }: { onSelect?: () => void }) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [items, setItems] = React.useState<SearchItem[]>([])
  const router = useRouter()
  const listRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Load search index on mount
  React.useEffect(() => {
    if (items.length === 0) {
      const loadItems = async () => {
        try {
          const response = await fetch('/api/search')
          if (!response.ok) throw new Error('Failed to fetch search index')
          const data = await response.json()
          
          // Map API response to component format
          const mappedItems: SearchItem[] = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            url: item.url,
            type: item.category.toLowerCase() as 'page' | 'article' | 'glossary' | 'course',
            description: item.description
          }))
          
          setItems(mappedItems)
        } catch (error) {
          console.error("Failed to load search items", error)
          // Fallback to empty array if API fails
          setItems([])
        }
      }
      
      loadItems()
    }
  }, [open, items.length])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    setSearch("") // Reset search on close/select
    command()
    onSelect?.()
  }, [onSelect])

  // Reset scroll to top when search query changes
  React.useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = 0
    }
  }, [search])

  const filteredArticles = React.useMemo(() => {
    if (!search) return items.filter(i => i.type === 'article')
    const lowSearch = search.toLowerCase()
    return items.filter(i => 
      i.type === 'article' && (
        i.title.toLowerCase().includes(lowSearch) || 
        i.description?.toLowerCase().includes(lowSearch)
      )
    )
  }, [items, search])

  const filteredGlossary = React.useMemo(() => {
    if (!search) return items.filter(i => i.type === 'glossary')
    const lowSearch = search.toLowerCase()
    return items.filter(i => 
      i.type === 'glossary' && (
        i.title.toLowerCase().includes(lowSearch) || 
        i.description?.toLowerCase().includes(lowSearch)
      )
    )
  }, [items, search])

  const filteredPages = React.useMemo(() => {
    if (!search) return items.filter(i => i.type === 'page')
    const lowSearch = search.toLowerCase()
    return items.filter(i => 
      i.type === 'page' && (
        i.title.toLowerCase().includes(lowSearch)
      )
    )
  }, [items, search])

  const hasResults = filteredArticles.length > 0 || filteredPages.length > 0 || filteredGlossary.length > 0

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-500 hover:text-[#00abfb] transition-colors"
        onClick={() => setOpen(true)}
        title="Search site (⌘K or Ctrl+K)"
      >
        <Search className="h-5 w-5" />
        <span className="sr-only">Search site</span>
      </Button>
      
      <CommandDialog 
        open={open} 
        onOpenChange={(isOpen) => {
          setOpen(isOpen)
          if (!isOpen) setSearch("") // Reset search when dialog closes
        }}
        commandProps={{ shouldFilter: false }}
      >
        <CommandInput 
          placeholder="Search articles and glossary..." 
          value={search}
          onValueChange={setSearch}
        />
        <CommandList ref={listRef}>
          {search && !hasResults && (
            <div className="py-6 text-center text-sm">No results found for "{search}"</div>
          )}
          
          {filteredArticles.length > 0 && (
            <CommandGroup heading="Articles">
              {filteredArticles.map(item => (
                <CommandItem
                  key={item.id}
                  value={`${item.title} ${item.description || ''}`}
                  onSelect={() => runCommand(() => router.push(item.url))}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  <div className="flex flex-col">
                    <span>{item.title}</span>
                    {item.description && (
                      <span className="text-xs text-gray-500 line-clamp-1">{item.description}</span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {filteredPages.length > 0 && (
            <CommandGroup heading="Pages">
              {filteredPages.map(item => (
                <CommandItem
                  key={item.id}
                  value={item.title}
                  onSelect={() => runCommand(() => router.push(item.url))}
                >
                  <Layout className="mr-2 h-4 w-4" />
                  <div className="flex flex-col">
                    <span>{item.title}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {filteredGlossary.length > 0 && (
            <CommandGroup heading="Glossary">
              {filteredGlossary.map(item => (
                <CommandItem
                  key={item.id}
                  value={`${item.title} ${item.description || ''}`}
                  onSelect={() => runCommand(() => router.push(item.url))}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  <div className="flex flex-col">
                    <span>{item.title}</span>
                    {item.description && (
                      <span className="text-xs text-gray-500 line-clamp-1">{item.description}</span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          
          {hasResults && <CommandSeparator />}
          
          <CommandGroup heading="Quick Actions">
            <CommandItem onSelect={() => runCommand(() => router.push('/inquiry?service=research&discovery=true#service-selection'))}>
              <User className="mr-2 h-4 w-4" />
              <span>Get Started</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/contact'))}>
              <Smile className="mr-2 h-4 w-4" />
              <span>Contact Us</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}


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
  const [items, setItems] = React.useState<SearchItem[]>([])
  const router = useRouter()

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

  // Load search index
  React.useEffect(() => {
    if (open && items.length === 0) {
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
    command()
    onSelect?.()
  }, [onSelect])

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
      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search pages, articles, glossary..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          {items.filter(i => i.type === 'page').length > 0 && (
            <CommandGroup heading="Pages">
              {items.filter(i => i.type === 'page').map(item => (
                <CommandItem
                  key={item.id}
                  value={`${item.title} ${item.description || ''}`}
                  onSelect={() => runCommand(() => router.push(item.url))}
                >
                  <Layout className="mr-2 h-4 w-4" />
                  <div className="flex flex-col">
                    <span>{item.title}</span>
                    {item.description && (
                      <span className="text-xs text-gray-500">{item.description}</span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {items.filter(i => i.type === 'article').length > 0 && (
            <CommandGroup heading="Articles">
              {items.filter(i => i.type === 'article').map(item => (
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

          {items.filter(i => i.type === 'glossary').length > 0 && (
            <CommandGroup heading="Glossary">
              {items.filter(i => i.type === 'glossary').map(item => (
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
          
          <CommandSeparator />
          
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


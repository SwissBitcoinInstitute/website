'use client'

import { useState } from 'react'
import { BookOpen, ChevronDown } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'

const topics = [
  'Issues with the fiat monetary order',
  'Why Bitcoin',
  'Deep-dive in Bitcoin\'s properties and uniqueness',
  'Mining, Energy & Climate',
  'Finance & Economics',
  'Geopolitics & Geoeconomics',
  'Policy & Strategy',
  'Technology & Innovation',
  'Civil Society & Human Rights',
]

export default function TopicsColumn() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="text-center">
      <div className="flex justify-center mb-4">
        <div className="text-swiss-blue">
          <BookOpen className="w-5 h-5" />
        </div>
      </div>
      <div className="text-sm text-gray-500 mb-2 font-medium">Topics</div>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-center gap-1 text-gray-900 hover:text-gray-700 transition-colors group mx-auto">
          <span className="font-semibold">View topics</span>
          <ChevronDown className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )} />
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down mt-4">
          <ul className="space-y-2 text-left">
            {topics.map((topic, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start">
                <span className="mr-2">•</span>
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

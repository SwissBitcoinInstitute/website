'use client'

import { useState } from 'react'
import { CheckCircle2, ChevronDown } from 'lucide-react'
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

export default function TopicsCovered() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <li className="flex items-start space-x-3">
      <CheckCircle2 className="w-5 h-5 text-swiss-blue flex-shrink-0 mt-0.5" />
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="flex-1">
        <CollapsibleTrigger className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors group">
          <span>Topics covered</span>
          <ChevronDown className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )} />
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down mt-3 pl-0">
          <ul className="space-y-2 ml-7 pb-2">
            {topics.map((topic, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start">
                <span className="mr-2">•</span>
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </li>
  )
}

import { MapPin, Clock, Users, FileText, Calendar, Target } from 'lucide-react'

export interface CourseDetail {
  icon: React.ReactNode
  label: string
  value: string
}

export const masterclassDetails: CourseDetail[] = [
  { icon: <MapPin className="w-5 h-5" />, label: 'Format', value: 'Live course in Zurich' },
  { icon: <Clock className="w-5 h-5" />, label: 'Duration', value: '2 full or 4 half-days' },
  { icon: <Users className="w-5 h-5" />, label: 'Level', value: 'Senior executives' },
]

export const finSovDetails: CourseDetail[] = [
  { icon: <MapPin className="w-5 h-5" />, label: 'Format', value: 'Live course in Zurich' },
  { icon: <Clock className="w-5 h-5" />, label: 'Duration', value: 'One Saturday morning' },
  { icon: <Users className="w-5 h-5" />, label: 'Level', value: 'Professionals without Bitcoin Experience' },
]

export const pbbDetails: CourseDetail[] = [
  { icon: <MapPin className="w-5 h-5" />, label: 'Format', value: 'On request' },
  { icon: <Clock className="w-5 h-5" />, label: 'Duration', value: 'On request' },
  { icon: <Users className="w-5 h-5" />, label: 'Level', value: 'On request' },
]

export const quarterlyDetails: CourseDetail[] = [
  { icon: <FileText className="w-5 h-5" />, label: 'Format', value: 'On inquiry' },
  { icon: <Calendar className="w-5 h-5" />, label: 'Frequency', value: 'Quarterly' },
  { icon: <Target className="w-5 h-5" />, label: 'Audience', value: 'Client-specific' },
]

export const briefsDetails: CourseDetail[] = [
  { icon: <FileText className="w-5 h-5" />, label: 'Format', value: 'Long-form Blog posts' },
  { icon: <Calendar className="w-5 h-5" />, label: 'Frequency', value: 'Each domain once a quarter' },
  { icon: <Target className="w-5 h-5" />, label: 'Audience', value: 'Decision Makers' },
]

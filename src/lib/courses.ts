export interface CourseOffering {
  id: string;                    // e.g., "bfe-feb-2026"
  timeDescription: string;       // e.g., "4 afternoons (14-17h)"
  dates: string[];               // e.g., ["12th February", "19th February", ...]
}

export const bitcoinForExecutivesCourses: CourseOffering[] = [
  // course dates Bitcoin Executive Masterclasses
  {
    id: "bxm1-feb27",
    timeDescription: "2x Friday (09:00-16:30)",
    dates: ["19 Feb 2027", "26 Feb 2027"]
  },
  {
    id: "bxm2-mar27",
    timeDescription: "2x Friday (09:00-16:30)",
    dates: ["05 Mar 2027", "12 Mar 2027"]
  },
];

// orientation webinar slots for the Bitcoin Executive Masterclass
export const executiveWebinarSlots: string[] = [
  "05 Nov 2026 10:00",
  "11 Nov 2026 14:00",
];

// course dates Financial Sovereignty Masterclasses
export const FinSovCourses: CourseOffering[] = [
    {
    id: "Coming",
    timeDescription: "2027 course dates to be announced soon.",
    dates: ["DD MMM 2027"]
  },
//  {
//    id: "fsm-MMM27",
//    timeDescription: "Saturday morning (09:00-12:30)",
//    dates: ["DD MMM 2027"]
//  },
];

// course dates for Private Bitcoin Briefings (custom)
export const privateBitcoinBriefingCourses: CourseOffering[] = [
  {
    id: "pbb-custom",
    timeDescription: "On client demand",
    dates: ["Suggest suitable dates below"]
  }
];

// Helper to format for form submission
export function formatCourseDate(course: CourseOffering): string {
  return `${course.timeDescription}: ${course.dates.join(", ")}`;
}

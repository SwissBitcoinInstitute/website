export interface CourseOffering {
  id: string;                    // e.g., "bfe-feb-2026"
  timeDescription: string;       // e.g., "4 afternoons (14-17h)"
  dates: string[];               // e.g., ["12th February", "19th February", ...]
}

export const bitcoinForExecutivesCourses: CourseOffering[] = [
  // course dates Bitcoin Executive Masterclasses, bxm2=2days, bxm4=4halfdays
  {
    id: "bxm2-jun26",
    timeDescription: "2x Friday (09:00-16:30)",
    dates: ["26 June 2026", "10 July 2026"]
  }, 
  {
    id: "bxm4-aug26",
    timeDescription: "4x Saturday morning (09:00-12:00)",
    dates: ["22 Aug 2026", "29 Aug 2026", "05 Sep 2026", "12 Sep 2026"]
  }, 
  {
    id: "bxm2-sep26",
    timeDescription: "2x Friday (09:00-16:30)",
    dates: ["04 Sep 2026", "25 Sep 2026"]
  }, 
    {
    id: "bxm4-nov26",
    timeDescription: "4x Saturday morning (09:00-12:00)",
    dates: ["31 Oct 2026", "07 Nov 2026", "21 Nov 2026", "28 Nov 2026"]
  }, 
  {
    id: "bxm2-nov26",
    timeDescription: "2x Friday (09:00-16:30)",
    dates: ["06 Nov 2026", "20 Nov 2026"]
  }, 
];

// course dates Financial Sovereignty Masterclasses
export const FinSovCourses: CourseOffering[] = [
  {
    id: "fsm1-sep26",
    timeDescription: "Saturday morning (09:00-12:30)",
    dates: ["26 Sep 2026"]
  },
  {
    id: "fsm1-nov26",
    timeDescription: "Saturday morning (09:00-12:30)",
    dates: ["14 Nov 2026"]
  },
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

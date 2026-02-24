export interface CourseOffering {
  id: string;                    // e.g., "bfe-feb-2026"
  timeDescription: string;       // e.g., "4 afternoons (14-17h)"
  dates: string[];               // e.g., ["12th February", "19th February", ...]
}

export const bitcoinForExecutivesCourses: CourseOffering[] = [
  // course dates for Bitcoin Executive Masterclasses
  {
    // 2 consecutive days, Thu+Fri
    id: "bxm-apr26-thufri",
    timeDescription: "Thu+Fri (09:00-16:30)",
    dates: ["16 April 2026", "17 April 2026"]
  },
  {
    // 2 Fridays, 2 weeks apart
    id: "bxm-may26-fri2weeks",
    timeDescription: "2x Friday (09:00-16:30)",
    dates: ["29 May 2026", "12 June 2026"]
  }, 
  {
    // 4 Saturday mornings
    id: "bxm-jun26-satmornings",
    timeDescription: "4x Saturday mornings (09:00-12:00)",
    dates: ["06 June 2026", "13 June 2026", "20 June 2026", "27 June 2026"]
  }, 
  {
    // 2 Fridays, 2 weeks apart
    id: "bxm-jun26-fri2weeks",
    timeDescription: "2x Friday (09:00-12:00)",
    dates: ["26 June 2026", "10 July 2026"]
  }, 
];

// course dates for Financial Sovereignty Masterclasses
export const FinSovCourses: CourseOffering[] = [
  {
    id: "finsov-mar26-fri",
    timeDescription: "Friday afternoon (13:30-17:00)",
    dates: ["20 March 2026"]
  },
   {
    id: "finsov-may26-sat",
    timeDescription: "Saturday morning (09:00-12:30)",
    dates: ["23 May 2026"]
  },
    {
    id: "finsov-jul26-sat",
    timeDescription: "Saturday morning (09:00-12:30)",
    dates: ["11 July 2026"]
  }, 
];

// Helper to format for form submission
export function formatCourseDate(course: CourseOffering): string {
  return `${course.timeDescription}: ${course.dates.join(", ")}`;
}

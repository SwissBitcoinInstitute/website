export interface CourseOffering {
  id: string;                    // e.g., "bfe-feb-2026"
  timeDescription: string;       // e.g., "4 afternoons (14-17h)"
  dates: string[];               // e.g., ["12th February", "19th February", ...]
}

export const bitcoinForExecutivesCourses: CourseOffering[] = [
  {
    id: "b4x-mar-2026",
    timeDescription: "Two days (09:00-16:30)",
    dates: ["12 March 2026", "13 March 2026"]
  }
];

// added by MD 10.01.42
export const FinSovCourses: CourseOffering[] = [
  {
    id: "fs1-mar-2026",
    timeDescription: "Half a day (13:30-17:30)",
    dates: ["20 March 2026"]
  }
];

// Helper to format for form submission
export function formatCourseDate(course: CourseOffering): string {
  return `${course.timeDescription}: ${course.dates.join(", ")}`;
}

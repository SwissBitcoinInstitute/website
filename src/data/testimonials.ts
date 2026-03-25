export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string; // path to image in public folder, e.g. /testimonials/person1.jpg
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Adrian Förster",
    role: "CEO",
    company: "Save the Children Switzerland",
    image: "/testimonials/Adrian_Foerster.png",
    text: "Marcus’ vision for bitcoin goes way beyond introducing a new technology.",
  },
  {
    id: "2",
    name: "Leah Malla Rackovksy",
    role: "Co-Founder",
    company: "Azamra Capital LLC",
    image: "/testimonials/Leah_Malla_Rackovksy.png",
    text: "Marcus combines profound expertise with the rare ability to distill complex issues into clear, accessible insights. Our delegation of senior executives extends their sincere gratitude for your time and contribution.",
  }
];

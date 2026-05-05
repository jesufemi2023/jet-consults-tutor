export type TestimonialType = 'text' | 'video';

export interface Testimonial {
  id: string;
  type: TestimonialType;
  name: string;
  grade: string;
  subject: string;
  improvement: string;
  characterFocus: string;
  quote?: string;
  videoUrl?: string;
  videoPoster?: string;
}

export function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export function isYouTubeShort(url: string): boolean {
  return url?.includes('shorts/') || false;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    type: 'text',
    name: "Aiden M.",
    grade: "Grade 11",
    subject: "Physics & Calculus",
    improvement: "C+ to A",
    quote: "Jet Consults Academy didn't just help me solve equations; they taught me the discipline to approach every problem with a plan. I'm now leading my school's robotics club.",
    characterFocus: "Self-Discipline & Leadership"
  },
  {
    id: "2",
    type: 'video',
    name: "Elizabeth's Mother",
    grade: "Grade 11",
    subject: "Mathematics",
    improvement: "Foundational Gap Closed",
    videoUrl: "https://www.youtube.com/shorts/CG7AeHG7MPs",
    videoPoster: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    characterFocus: "Academic Confidence, Godly character"
  },
  {
    id: "3",
    type: 'text',
    name: "Daniel K.",
    grade: "Grade 12",
    subject: "Computer Science",
    improvement: "State Coding Winner",
    quote: "Beyond coding, my mentor taught me the importance of using tech for community impact. We built an app for a local food bank together.",
    characterFocus: "Social Responsibility"
  },
  {
    id: "4",
    type: 'video',
    name: "Fayotomi's Mother.",
    grade: "Grade 10",
    subject: "Chemistry, Physics, Mathematics, Coding",
    improvement: "B to A+",
    videoUrl: "https://www.youtube.com/shorts/ewqOsjcmeEc",
    videoPoster: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    characterFocus: "Hard Work, Persistence, Academy excellence, Godly morale"
  }
];

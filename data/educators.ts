export interface Educator {
  id: string;
  name: string;
  role: string;
  subject: string;
  degree: string;
  experience: string;
  bio: string;
  image: string;
  specialties: string[];
  cvUrl?: string;
  cv?: {
    about: string;
    education: { degree: string; institution: string; year: string }[];
    experience: { role: string; company: string; duration: string; description: string }[];
    certifications?: string[];
    certificateUrl?: string;
    certificateNote?: string;
  };
}

export const educators: Educator[] = [
  {
    id: "1",
    name: "Jesufemi Temitope",
    role: "Founder & Lead Mentor",
    subject: "STEM, Coding & Character Development",
    degree: "BSc Computer Engineering",
    experience: "13+ Years Exp.",
    bio: "Dedicated to providing holistic mentorship and academic excellence. I focus on building strong foundations, simplifying complex theories in STEM and programming, and molding the next generation of responsible leaders.",
    image: "https://res.cloudinary.com/djs7wpey6/image/upload/v1777901340/WhatsApp_Image_2026-05-02_at_6.23.06_PM_ggtu5k.jpg",
    specialties: ["Mathematics", "Physics",  "Chemistry", "Coding", "Mentorship"],
    cv: {
      about: "I am a dedicated STEM Educator and Computer Engineer with over 13 years of proven experience in transforming students’ academic trajectories and personal growth. My core focus is delivering high-impact education in Mathematics, Physics, and programming, while intentionally building discipline, confidence, and strong character in every learner. I hold a B.Sc. in Computer Engineering (Second Class Upper) from Obafemi Awolowo University (2013), and since then, I have dedicated my career to transforming both students and businesses through technology, innovation, and structured mentorship.",
      education: [
        { degree: "B.Sc. in Computer Engineering (Second Class Upper)", institution: "Obafemi Awolowo University", year: "2013" }
      ],
      experience: [
        { 
          role: "Founder, Lead Mentor & Developer", 
          company: "Jet Consults", 
          duration: "2020 - Present", 
          description: "Built a platform focused on academic excellence, tech skills, and leadership development. Led curriculum development, coding bootcamps, and personalized tutoring programs for high school students. Trained students in Python, JavaScript, AI, and modern software development. Designed and deployed AI applications and mobile solutions. Managed deployment pipelines and real-world client integrations. Helped students transition from beginners to industry-ready professionals." 
        },
        { 
          role: "Teacher (N-Power Program)", 
          company: "Mada Community High School", 
          duration: "2017 - 2019", 
          description: "Taught in a remote underserved community in Northern Nigeria. Transformed students with weak foundations into top-performing learners. Produced measurable impact — many students moved from struggling to excelling in STEM subjects." 
        },
        { 
          role: "Business Solution Consultant (Intern)", 
          company: "Oryx Computer Systems Ltd", 
          duration: "2011 - 2012", 
          description: "Contributed to ERP system development and implementation. Supported database management and optimization. Gained hands-on experience in enterprise-level software solutions." 
        }
      ],
      certifications: [
        "Certified Educational Mentor", 
        "Advanced Programming Instructor"
      ],
      certificateUrl: "https://res.cloudinary.com/djs7wpey6/image/upload/v1777903070/certificate_ft0z8s.jpg",
      certificateNote: "Note: The name on the certificate reads 'Ogungbe Temitope Solomon'. I have since changed my name to Jesufemi Temitope Solomon."
    }
  }
];

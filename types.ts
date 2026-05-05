
export enum Subject {
  MATHS = 'Mathematics',
  PHYSICS = 'Physics',
  CHEMISTRY = 'Chemistry',
  CODING = 'Coding/Computer Science',
  BIOLOGY = 'Biology',
  ENGLISH = 'English Prep',
  LITERACY = 'Early Literacy (Reading & Writing)'
}

export enum GradeLevel {
  AGE_4_8 = 'Age 4-8 (Early Literacy)',
  GRADE_3 = 'Grade 3',
  GRADE_4 = 'Grade 4',
  GRADE_5 = 'Grade 5',
  GRADE_6 = 'Grade 6',
  GRADE_7 = 'Grade 7',
  GRADE_8 = 'Grade 8',
  GRADE_9 = 'Grade 9',
  GRADE_10 = 'Grade 10',
  GRADE_11 = 'Grade 11',
  GRADE_12 = 'Grade 12'
}

export interface Student {
  id: string;
  name: string;
  grade: GradeLevel;
  schoolName: string;
  strugglingSubjects: Subject[];
}

export interface ConsultationRequest {
  parentName: string;
  email: string;
  studentName: string;
  schoolName: string;
  grade: string;
  subject: Subject;
  description: string;
  location: string;
}

export interface TutoringPlan {
  summary: string;
  recommendations: string[];
  estimatedDuration: string;
  monthlyFee: string;
}

export interface BookingSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface DailyAvailability {
  date: string;
  dayName: string;
  slots: BookingSlot[];
}

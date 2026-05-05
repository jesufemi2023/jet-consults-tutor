import emailjs from '@emailjs/browser';

export const sendRegistrationEmail = async (data: {
  studentName: string;
  grade: string;
  schoolName: string;
  subjects: string[];
  totalFee: number;
}) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_REGISTER;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'consultsjet@gmail.com';

  if (!serviceId || !templateId || !publicKey) {
    console.warn("EmailJS credentials are not configured in environment variables.");
    return false;
  }

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        to_email: adminEmail,
        student_name: data.studentName,
        grade: data.grade,
        school_name: data.schoolName,
        subjects: data.subjects.join(', '),
        total_fee: data.totalFee,
        reply_to: adminEmail,
      },
      publicKey
    );
    return true;
  } catch (error) {
    console.error("Failed to send registration email:", error);
    return false;
  }
};

export const sendBookingEmail = async (data: {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
}) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_BOOKING;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'consultsjet@gmail.com';

  if (!serviceId || !templateId || !publicKey) {
    console.warn("EmailJS credentials are not configured in environment variables.");
    return false;
  }

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        to_email: adminEmail,
        parent_name: data.name,
        parent_email: data.email,
        parent_phone: data.phone,
        booking_date: data.date,
        booking_time: data.time,
        reply_to: data.email,
      },
      publicKey
    );
    return true;
  } catch (error) {
    console.error("Failed to send booking email:", error);
    return false;
  }
};

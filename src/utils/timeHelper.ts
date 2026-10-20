/**
 * Helper to compute whether Dr. Sarna's clinic is currently open
 * based on Indian Standard Time (IST, UTC+5:30).
 */

export interface ClinicStatus {
  isOpen: boolean;
  message: string;
  subMessage: string;
  nextShift: string;
  isSunday: boolean;
}

export function getClinicStatus(): ClinicStatus {
  // Get current time in Indian Standard Time (UTC + 5:30)
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const istTime = new Date(utc + 3600000 * 5.5);

  const day = istTime.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
  const hours = istTime.getHours();
  const minutes = istTime.getMinutes();
  const currentMinutes = hours * 60 + minutes;

  // Shift minutes
  // Morning: 9:00 AM (540) to 1:30 PM (810)
  const morningStart = 9 * 60;
  const morningEnd = 13 * 60 + 30;

  // Evening: 5:00 PM (1020) to 9:00 PM (1260)
  const eveningStart = 17 * 60;
  const eveningEnd = 21 * 60;

  // Sunday morning: 10:00 AM (600) to 1:00 PM (780)
  const sunMorningStart = 10 * 60;
  const sunMorningEnd = 13 * 60;

  if (day === 0) {
    // Sunday
    if (currentMinutes >= sunMorningStart && currentMinutes <= sunMorningEnd) {
      return {
        isOpen: true,
        message: "Clinic Open Now",
        subMessage: "Sunday Morning Session (Closes at 1:00 PM)",
        nextShift: "Evening closed on Sunday",
        isSunday: true
      };
    } else if (currentMinutes < sunMorningStart) {
      return {
        isOpen: false,
        message: "Opens Today at 10:00 AM",
        subMessage: "Sunday Consultation: 10:00 AM – 01:00 PM",
        nextShift: "Today 10:00 AM – 01:00 PM",
        isSunday: true
      };
    } else {
      return {
        isOpen: false,
        message: "Closed for the day",
        subMessage: "Reopens Monday at 09:00 AM",
        nextShift: "Monday 09:00 AM – 01:30 PM",
        isSunday: true
      };
    }
  } else {
    // Monday to Saturday
    if (currentMinutes >= morningStart && currentMinutes <= morningEnd) {
      return {
        isOpen: true,
        message: "Clinic Open Now",
        subMessage: "Morning Session (Closes at 1:30 PM)",
        nextShift: "Evening Session: 05:00 PM – 09:00 PM",
        isSunday: false
      };
    } else if (currentMinutes > morningEnd && currentMinutes < eveningStart) {
      return {
        isOpen: false,
        message: "Afternoon Break",
        subMessage: "Evening Session opens at 05:00 PM",
        nextShift: "Today 05:00 PM – 09:00 PM",
        isSunday: false
      };
    } else if (currentMinutes >= eveningStart && currentMinutes <= eveningEnd) {
      return {
        isOpen: true,
        message: "Clinic Open Now",
        subMessage: "Evening Session (Closes at 9:00 PM)",
        nextShift: "Morning Session tomorrow at 09:00 AM",
        isSunday: false
      };
    } else if (currentMinutes < morningStart) {
      return {
        isOpen: false,
        message: "Opens Today at 09:00 AM",
        subMessage: "Morning Session: 09:00 AM – 01:30 PM",
        nextShift: "Today 09:00 AM – 01:30 PM",
        isSunday: false
      };
    } else {
      const isSat = day === 6;
      return {
        isOpen: false,
        message: "Closed for the day",
        subMessage: isSat ? "Reopens Sunday at 10:00 AM" : "Reopens Tomorrow at 09:00 AM",
        nextShift: isSat ? "Sunday 10:00 AM – 01:00 PM" : "Tomorrow 09:00 AM – 01:30 PM",
        isSunday: false
      };
    }
  }
}

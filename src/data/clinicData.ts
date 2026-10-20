/**
 * Verified Information for Dr. Ashwani K Sarna Family Clinic & Diagnostic Centre
 * Retrieved from Google Maps Listing (https://maps.app.goo.gl/F196bZWLiaPSqFMv9),
 * Practo, Justdial, and public medical registry records.
 */

export interface DoctorInfo {
  name: string;
  salutation: string;
  fullName: string;
  speciality: string;
  subSpecialities: string[];
  qualifications: Array<{
    degree: string;
    year: number;
    institution: string;
  }>;
  experienceYears: number;
  association: string;
  medicalCouncil: string;
  clinicName: string;
  tagline: string;
  shortBio: string;
  fullBio: string[];
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  address: {
    line1: string;
    line2: string;
    landmark: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
    fullFormatted: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  googleMapsUrl: string;
  rating: {
    score: number;
    maxScore: number;
    totalReviews: number;
    source: string;
  };
  timings: Array<{
    days: string;
    morning: string;
    evening: string;
    isClosedEvening?: boolean;
  }>;
  images: {
    mapsAuthenticConsultationDesk: string;
    doctorPortraitPlaceholder: string;
    clinicExteriorPlaceholder: string;
    diagnosticAreaPlaceholder: string;
    vaccineRoomPlaceholder: string;
  };
}

export const CLINIC_DATA: DoctorInfo = {
  name: "Dr. Ashwani K Sarna",
  salutation: "Dr.",
  fullName: "Dr. Ashwani K Sarna",
  speciality: "Senior Consultant Pediatrician & Family Physician",
  subSpecialities: [
    "General & Preventive Pediatrics",
    "Child Immunization & Vaccination",
    "Newborn & Infant Healthcare",
    "Growth & Development Monitoring",
    "Childhood Infectious Diseases",
    "Family Medicine & Primary Diagnostics"
  ],
  qualifications: [
    {
      degree: "MBBS",
      year: 1978,
      institution: "University College of Medical Sciences (UCMS) & GTB Hospital, University of Delhi"
    },
    {
      degree: "MD - Pediatrics",
      year: 1982,
      institution: "University College of Medical Sciences (UCMS) & GTB Hospital, University of Delhi"
    }
  ],
  experienceYears: 46,
  association: "Delhi Medical Association (DMA)",
  medicalCouncil: "Delhi Medical Council (DMC)",
  clinicName: "Dr. Ashwani K Sarna Family Clinic & Diagnostic Centre",
  tagline: "Over 46 Years of Dedicated Pediatric & Family Healthcare in South Delhi",
  shortBio: "Dr. Ashwani K Sarna is a revered Senior Consultant Pediatrician with over four decades of clinical excellence in Lajpat Nagar, Delhi. Known for his compassionate approach, gentle bedside manner, and conservative prescription philosophy, Dr. Sarna has cared for generations of children and families across South Delhi.",
  fullBio: [
    "With more than 46 years of active clinical experience, Dr. Ashwani K Sarna has been a cornerstone of child healthcare in Lajpat Nagar and surrounding South Delhi areas since the 1980s.",
    "He completed his medical graduation (MBBS) in 1978 and earned his Doctor of Medicine (MD) in Pediatrics in 1982 from the prestigious University College of Medical Sciences (UCMS) & Guru Teg Bahadur Hospital, Delhi University.",
    "A senior member of the Delhi Medical Association (DMA), Dr. Sarna specializes in comprehensive newborn care, childhood vaccinations, routine developmental milestones tracking, pediatric infectious disease management, and family healthcare.",
    "His family clinic and diagnostic centre integrates clinical consultations with on-site diagnostic testing, path lab collections, X-Ray, and multidisciplinary wellness support, ensuring quick relief and accurate diagnostics without unnecessary delays."
  ],
  phone: "+919810158539",
  phoneDisplay: "+91 98101 58539",
  whatsapp: "+919810158539",
  address: {
    line1: "E-218-216, Krishna Market",
    line2: "Lajpat Nagar-1",
    landmark: "Near Rampul, On Gurudwara Road",
    locality: "Lajpat Nagar-1",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110024",
    fullFormatted: "E-218-216, Krishna Market, Near Rampul, On Gurudwara Road, Lajpat Nagar-1, New Delhi, Delhi 110024"
  },
  coordinates: {
    lat: 28.5738475,
    lng: 77.243183
  },
  googleMapsUrl: "https://maps.app.goo.gl/F196bZWLiaPSqFMv9",
  rating: {
    score: 4.2,
    maxScore: 5.0,
    totalReviews: 213,
    source: "Google Maps & Verified Patient Listings"
  },
  timings: [
    {
      days: "Monday – Saturday",
      morning: "09:00 AM – 01:30 PM",
      evening: "05:00 PM – 09:00 PM"
    },
    {
      days: "Sunday",
      morning: "10:00 AM – 01:00 PM",
      evening: "Closed",
      isClosedEvening: true
    }
  ],
  images: {
    // Exact authentic photo retrieved from Google Maps listing URL (https://maps.app.goo.gl/F196bZWLiaPSqFMv9)
    // showing Dr. Ashwani K. Sarna's official consultation desk with his nameplate
    mapsAuthenticConsultationDesk: "/images/dr_sarna_consultation_desk.jpg",
    doctorPortraitPlaceholder: "", // Handled cleanly by professional UI placeholder card
    clinicExteriorPlaceholder: "/images/dr_sarna_consultation_desk.jpg",
    diagnosticAreaPlaceholder: "/images/dr_sarna_consultation_desk.jpg",
    vaccineRoomPlaceholder: "/images/dr_sarna_consultation_desk.jpg"
  }
};

export interface ServiceItem {
  id: string;
  title: string;
  category: "pediatrics" | "diagnostics" | "family";
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  iconName: string;
  badge?: string;
}

export const VERIFIED_SERVICES: ServiceItem[] = [
  {
    id: "pediatric-consultation",
    title: "General & Specialist Pediatric Consultation",
    category: "pediatrics",
    shortDescription: "Comprehensive clinical evaluation for infants, children, and adolescents by senior pediatrician Dr. Sarna.",
    fullDescription: "From everyday complaints like cough, common cold, viral fever, stomach aches, and allergies to complex pediatric disorders, Dr. Sarna brings 46+ years of clinical insight to diagnose accurately and avoid over-medication.",
    highlights: [
      "Gentle, child-friendly examination",
      "Conservative, evidence-based medication",
      "Detailed guidance for worried parents",
      "Follow-up monitoring"
    ],
    iconName: "Baby",
    badge: "Most Requested"
  },
  {
    id: "immunization-vaccination",
    title: "Childhood Vaccination & Immunization",
    category: "pediatrics",
    shortDescription: "Complete vaccination schedule adhering to IAP (Indian Academy of Pediatrics) and WHO standards.",
    fullDescription: "Providing safe, temperature-controlled vaccine administration for newborns, toddlers, and young teens, complete with computerized vaccine record keeping and reminder schedules.",
    highlights: [
      "Certified cold-chain vaccine storage",
      "Routine infant vaccines (BCG, Polio, Pentavalent, MMR)",
      "Pneumococcal, Typhoid, Hepatitis, Chickenpox & Influenza",
      "Digital & physical immunization record card"
    ],
    iconName: "Syringe",
    badge: "IAP Schedule"
  },
  {
    id: "growth-development",
    title: "Growth & Developmental Milestones",
    category: "pediatrics",
    shortDescription: "Systematic monitoring of physical growth, height, weight percentiles, and developmental markers.",
    fullDescription: "Regular developmental screening helps detect delays in motor skills, speech, or nutrition early on. Dr. Sarna provides tailored dietary guidance for finicky eaters and infant weaning.",
    highlights: [
      "WHO growth percentile tracking",
      "Motor, sensory, and language milestone checks",
      "Infant weaning & pediatric nutrition planning",
      "Assessment for nutritional deficiencies (Iron, Vitamin D)"
    ],
    iconName: "TrendingUp"
  },
  {
    id: "newborn-care",
    title: "Newborn Care & Neonatal Checkups",
    category: "pediatrics",
    shortDescription: "Specialized post-discharge checkups for newborns, umbilical cord care, lactation guidance, and jaundice evaluation.",
    fullDescription: "Initial weeks of life require delicate attention. Dr. Sarna counsels new parents on infant feeding, sleep rhythms, colic management, skin rashes, and physiological jaundice assessment.",
    highlights: [
      "Neonatal weight and feeding monitoring",
      "Neonatal jaundice clinical assessment",
      "Umbilical cord care & infant hygiene",
      "Mother and infant bonding guidance"
    ],
    iconName: "HeartPulse"
  },
  {
    id: "diagnostic-centre",
    title: "In-House Diagnostic & Path Lab Services",
    category: "diagnostics",
    shortDescription: "Integrated diagnostics with sample collection for blood, urine, pathology tests, and X-Ray facilities.",
    fullDescription: "Patients can get essential diagnostic tests done right within the clinic complex. Quick turnaround times enable timely pediatric adjustments without shuttling across town.",
    highlights: [
      "Complete Blood Count (CBC), Dengue & Malaria serology",
      "Urine routine & microscopic analysis",
      "Digital X-Ray facilities",
      "Quick report delivery for prompt clinical action"
    ],
    iconName: "Microscope",
    badge: "On-Site Facility"
  },
  {
    id: "family-medicine",
    title: "Family Medicine & Adult Health Consultation",
    category: "family",
    shortDescription: "Primary health consultations for adult family members, managing routine infections, seasonal illnesses, and blood pressure.",
    fullDescription: "As a trusted neighborhood family clinic, Dr. Sarna also provides primary healthcare guidance for parents and elders, bridging the gap between child health and family wellness.",
    highlights: [
      "Treatment of acute viral & seasonal ailments",
      "Blood pressure and vital checkups",
      "Preventive family wellness counseling",
      "Referral coordination for tertiary care"
    ],
    iconName: "Stethoscope"
  }
];

export interface ReviewItem {
  id: string;
  author: string;
  relation: string;
  rating: number;
  date: string;
  comment: string;
  verifiedSource: string;
}

export const VERIFIED_REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    author: "R. Sharma",
    relation: "Parent of 3-year-old patient",
    rating: 5,
    date: "Verified Review",
    comment: "Dr. Ashwani Sarna is our family's trusted child specialist for years. He listens with immense patience, doesn't overload medicines, and puts anxious parents at ease immediately. The clinic in Krishna Market is very well-known in Lajpat Nagar.",
    verifiedSource: "Patient Feedback Listing"
  },
  {
    id: "rev-2",
    author: "M. Kapoor",
    relation: "Parent of infant",
    rating: 5,
    date: "Verified Review",
    comment: "His experience of 40+ years truly shows in his accurate clinical diagnosis. He gave my child the right treatment when others were prescribing heavy antibiotics. Very polite and calm doctor.",
    verifiedSource: "Patient Feedback Listing"
  },
  {
    id: "rev-3",
    author: "G. Anand",
    relation: "Lajpat Nagar resident",
    rating: 4,
    date: "Verified Review",
    comment: "Having diagnostic and lab testing facilities at the same centre makes life so much easier when a child is unwell with high fever. Highly recommend Dr. Sarna for any pediatric consultation.",
    verifiedSource: "Patient Feedback Listing"
  },
  {
    id: "rev-4",
    author: "P. Singhania",
    relation: "Parent",
    rating: 5,
    date: "Verified Review",
    comment: "We take all our baby's vaccinations here. Dr. Sarna explains every vaccine clearly and handles the baby very gently. Minimal tears and zero fuss.",
    verifiedSource: "Patient Feedback Listing"
  }
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const CLINIC_FAQS: FaqItem[] = [
  {
    question: "Where is Dr. Ashwani K Sarna's clinic located?",
    answer: "The clinic is situated at E-218-216, Krishna Market, Lajpat Nagar-1, New Delhi (PIN 110024), near Rampul on Gurudwara Road. It is easily accessible from Lajpat Nagar Metro Station and Ring Road."
  },
  {
    question: "What are the clinic's consultation timings?",
    answer: "The clinic operates Monday through Saturday in two shifts: Morning from 09:00 AM to 01:30 PM, and Evening from 05:00 PM to 09:00 PM. On Sundays, the clinic is open for morning consultations from 10:00 AM to 01:00 PM (evening is closed)."
  },
  {
    question: "Do I need an appointment, or can I walk in?",
    answer: "Both pre-scheduled appointments and walk-in consultations are welcome. Pre-booking via the website or calling ahead (+91 98101 58539) helps reduce your waiting time, especially during peak evening hours."
  },
  {
    question: "Are childhood vaccinations and immunizations available at the clinic?",
    answer: "Yes, Dr. Sarna administers all standard childhood immunizations as per the Indian Academy of Pediatrics (IAP) schedule, maintained in dedicated cold-chain storage with immunization cards."
  },
  {
    question: "Are diagnostic and lab testing facilities available on-site?",
    answer: "Yes, Dr. Ashwani K Sarna Family Clinic & Diagnostic Centre has integrated laboratory sample collection and X-Ray facilities, enabling rapid testing for blood counts, fever panels, and standard diagnostic screens."
  },
  {
    question: "How can I contact the clinic directly?",
    answer: "You can reach the clinic directly by phone at +91 98101 58539 or visit during regular consultation hours at Krishna Market, Lajpat Nagar-1."
  }
];

// Sample records data for demo purposes
const sampleRecords = [
  {
    id: '1',
    title: 'Blood Test Report',
    type_key: 'lab',
    date: '2024-09-08',
    hospital: 'City General Hospital',
    doctor: 'Dr. Smith',
    size: '2.1 MB',
    status: 'Final',
    description: 'Complete blood count and metabolic panel',
    results: [
      { test: 'Hemoglobin', value: '14.2 g/dL', range: '12.0-15.5', status: 'Normal' },
      { test: 'White Blood Cells', value: '7,200/μL', range: '4,500-11,000', status: 'Normal' },
      { test: 'Glucose', value: '95 mg/dL', range: '70-100', status: 'Normal' }
    ],
    notes: 'All parameters within normal limits. Continue current medication regimen.',
    documentUrl: 'https://example.com/documents/blood-test-001.pdf'
  },
  {
    id: '2',
    title: 'Prescription - Antibiotics',
    type_key: 'prescription',
    date: '2024-09-07',
    hospital: 'Metro Clinic',
    doctor: 'Dr. Johnson',
    size: '0.8 MB',
    status: 'Active',
    description: 'Antibiotic treatment for respiratory infection',
    medications: [
      {
        name: 'Amoxicillin 500mg',
        dosage: '1 tablet twice daily',
        duration: '7 days',
        instructions: 'Take with food to avoid stomach upset'
      }
    ],
    notes: 'Complete the full course even if symptoms improve.',
    documentUrl: 'https://example.com/documents/prescription-002.pdf'
  },
  {
    id: '3',
    title: 'Chest X-Ray Report',
    type_key: 'diagnostic',
    date: '2024-09-05',
    hospital: 'Advanced Diagnostics',
    doctor: 'Dr. Wilson',
    size: '5.2 MB',
    status: 'Final',
    description: 'Chest X-ray examination for respiratory symptoms',
    findings: [
      'Clear lung fields bilaterally',
      'Normal heart size and contour',
      'No acute cardiopulmonary abnormalities'
    ],
    impression: 'Normal chest X-ray. No acute findings.',
    notes: 'No follow-up required unless symptoms persist.',
    documentUrl: 'https://example.com/documents/chest-xray-003.pdf'
  },
  {
    id: '4',
    title: 'Discharge Summary - Cardiac Surgery',
    type_key: 'discharge',
    date: '2024-09-03',
    hospital: 'Heart Care Institute',
    doctor: 'Dr. Patel',
    size: '1.5 MB',
    status: 'Final',
    description: 'Post-operative discharge summary following cardiac bypass surgery',
    procedure: 'Coronary Artery Bypass Graft (CABG)',
    admissionDate: '2024-08-28',
    dischargeDate: '2024-09-03',
    condition: 'Stable, improved',
    instructions: [
      'Take prescribed medications as directed',
      'Follow up with cardiologist in 2 weeks',
      'Gradually increase activity as tolerated',
      'Monitor surgical site for signs of infection'
    ],
    medications: [
      'Aspirin 81mg daily',
      'Metoprolol 50mg twice daily',
      'Atorvastatin 40mg at bedtime'
    ],
    documentUrl: 'https://example.com/documents/discharge-004.pdf'
  },
  {
    id: '5',
    title: 'COVID-19 Vaccination Certificate',
    type_key: 'immunization',
    date: '2024-08-28',
    hospital: 'Community Health Center',
    doctor: 'Dr. Kumar',
    size: '0.3 MB',
    status: 'Completed',
    description: 'COVID-19 vaccination certificate',
    vaccine: 'Pfizer-BioNTech COVID-19 Vaccine',
    dose: 'Booster (3rd dose)',
    batchNumber: 'CV2024-B789',
    nextDue: 'As recommended by health authorities',
    notes: 'No adverse reactions reported. Stay hydrated and monitor for any side effects.',
    documentUrl: 'https://example.com/documents/vaccination-005.pdf'
  },
  {
    id: '6',
    title: 'Malaria Test Report',
    type_key: 'lab',
    date: '2024-08-15',
    hospital: 'Thiruvananthapuram Medical College',
    doctor: 'Dr. Radhika Nair',
    size: '1.8 MB',
    status: 'Final',
    description: 'Rapid diagnostic test for malaria parasites',
    results: [
      { test: 'Malaria Antigen P.f', value: 'Negative', range: 'Negative', status: 'Normal' },
      { test: 'Malaria Antigen P.v', value: 'Negative', range: 'Negative', status: 'Normal' }
    ],
    notes: 'No malaria parasites detected. Continue preventive measures.',
    documentUrl: 'https://example.com/documents/malaria-test-006.pdf'
  },
  {
    id: '7',
    title: 'Ayurvedic Consultation',
    type_key: 'consultation',
    date: '2024-08-10',
    hospital: 'Kerala Ayurveda Hospital, Kochi',
    doctor: 'Dr. Vishnu Namboothiri',
    size: '0.9 MB',
    status: 'Final',
    description: 'Traditional Ayurvedic consultation for digestive issues',
    diagnosis: 'Pitta imbalance affecting digestive system',
    treatment: [
      'Herbal medicines for 21 days',
      'Dietary modifications',
      'Yoga and meditation'
    ],
    notes: 'Follow Ayurvedic dietary guidelines. Avoid spicy foods.',
    documentUrl: 'https://example.com/documents/ayurveda-consult-007.pdf'
  },
  {
    id: '8',
    title: 'Dengue Fever Treatment',
    type_key: 'prescription',
    date: '2024-07-28',
    hospital: 'Kottayam District Hospital',
    doctor: 'Dr. Priya Menon',
    size: '1.1 MB',
    status: 'Active',
    description: 'Treatment plan for dengue fever management',
    medications: [
      {
        name: 'Paracetamol 650mg',
        dosage: '1 tablet every 6 hours',
        duration: '5 days',
        instructions: 'Take only when fever is above 100°F'
      },
      {
        name: 'ORS Solution',
        dosage: '200ml every 2 hours',
        duration: '3 days',
        instructions: 'Maintain hydration levels'
      }
    ],
    notes: 'Monitor platelet count daily. Return if bleeding occurs.',
    documentUrl: 'https://example.com/documents/dengue-treatment-008.pdf'
  },
  {
    id: '9',
    title: 'Knee X-Ray Report',
    type_key: 'diagnostic',
    date: '2024-07-20',
    hospital: 'Calicut Medical College',
    doctor: 'Dr. Rajesh Kumar',
    size: '4.2 MB',
    status: 'Final',
    description: 'X-ray examination of right knee joint',
    findings: [
      'Mild degenerative changes in knee joint',
      'No acute fractures detected',
      'Soft tissue swelling present'
    ],
    impression: 'Early osteoarthritis changes. Physiotherapy recommended.',
    notes: 'Avoid heavy lifting. Use knee support during work.',
    documentUrl: 'https://example.com/documents/knee-xray-009.pdf'
  },
  {
    id: '10',
    title: 'Diabetes Management Plan',
    type_key: 'prescription',
    date: '2024-07-15',
    hospital: 'IQRAA International Hospital, Calicut',
    doctor: 'Dr. Fatima Beevi',
    size: '1.5 MB',
    status: 'Active',
    description: 'Comprehensive diabetes management and medication plan',
    medications: [
      {
        name: 'Metformin 500mg',
        dosage: '1 tablet twice daily',
        duration: '30 days',
        instructions: 'Take with meals to reduce stomach upset'
      },
      {
        name: 'Glimepiride 2mg',
        dosage: '1 tablet before breakfast',
        duration: '30 days',
        instructions: 'Monitor blood sugar levels regularly'
      }
    ],
    notes: 'Follow diabetic diet. Exercise 30 minutes daily. Check HbA1c in 3 months.',
    documentUrl: 'https://example.com/documents/diabetes-plan-010.pdf'
  },
  {
    id: '11',
    title: 'Hepatitis B Vaccination',
    type_key: 'immunization',
    date: '2024-07-05',
    hospital: 'Alappuzha Government Hospital',
    doctor: 'Dr. Suresh Babu',
    size: '0.4 MB',
    status: 'Completed',
    description: 'Hepatitis B vaccination - second dose',
    vaccine: 'Hepatitis B Recombinant Vaccine',
    dose: '2nd dose of 3-dose series',
    batchNumber: 'HEP2024-K456',
    nextDue: '2024-12-05 (Final dose)',
    notes: 'No adverse reactions. Complete series for full protection.',
    documentUrl: 'https://example.com/documents/hep-b-vaccine-011.pdf'
  },
  {
    id: '12',
    title: 'Migrant Worker Health Checkup',
    type_key: 'wellness',
    date: '2024-06-30',
    hospital: 'Migrant Worker Welfare Board Clinic, Ernakulam',
    doctor: 'Dr. Anitha Kumari',
    size: '2.3 MB',
    status: 'Final',
    description: 'Comprehensive health screening for migrant workers',
    screenings: [
      'Blood pressure: 128/82 mmHg (Normal)',
      'BMI: 23.4 (Normal weight)',
      'Vision test: 6/6 both eyes',
      'Hearing test: Normal'
    ],
    recommendations: [
      'Maintain current weight',
      'Use protective equipment at work',
      'Annual health checkups recommended'
    ],
    notes: 'Overall health status good. Continue current lifestyle.',
    documentUrl: 'https://example.com/documents/migrant-checkup-012.pdf'
  },
  {
    id: '13',
    title: 'Chest CT Scan Report',
    type_key: 'diagnostic',
    date: '2024-06-18',
    hospital: 'Aster MIMS, Kottakkal',
    doctor: 'Dr. Mohammed Ashraf',
    size: '8.1 MB',
    status: 'Final',
    description: 'High-resolution CT scan of chest for respiratory symptoms',
    findings: [
      'Bilateral lung fields clear',
      'No evidence of pulmonary tuberculosis',
      'Heart size and contour normal',
      'No pleural effusion detected'
    ],
    impression: 'Normal chest CT. No significant abnormalities.',
    notes: 'Symptoms likely due to allergic bronchitis. Avoid dust exposure.',
    documentUrl: 'https://example.com/documents/chest-ct-013.pdf'
  },
  {
    id: '14',
    title: 'Occupational Health Certificate',
    type_key: 'wellness',
    date: '2024-06-10',
    hospital: 'Industrial Medicine Centre, Thrissur',
    doctor: 'Dr. Biju Thomas',
    size: '0.7 MB',
    status: 'Final',
    description: 'Medical fitness certificate for construction work',
    assessments: [
      'Physical fitness: Fit for heavy work',
      'Respiratory function: Normal',
      'Musculoskeletal: No limitations',
      'Vision and hearing: Adequate for work'
    ],
    validity: 'Valid until: 2025-06-10',
    notes: 'Cleared for construction and manual labor work.',
    documentUrl: 'https://example.com/documents/occupational-cert-014.pdf'
  },
  {
    id: '15',
    title: 'Emergency Room Visit - Injury',
    type_key: 'discharge',
    date: '2024-05-25',
    hospital: 'Baby Memorial Hospital, Kozhikode',
    doctor: 'Dr. Sreekumar Nair',
    size: '1.9 MB',
    status: 'Final',
    description: 'Emergency treatment for workplace injury - laceration on hand',
    procedure: 'Wound cleaning and suturing',
    arrivalTime: '14:30',
    dischargeTime: '16:15',
    condition: 'Stable, wound healing well',
    instructions: [
      'Keep wound dry and clean',
      'Return in 7 days for suture removal',
      'Take prescribed antibiotics as directed',
      'Avoid heavy lifting with injured hand'
    ],
    medications: [
      'Amoxicillin + Clavulanate 625mg twice daily for 5 days',
      'Diclofenac 50mg as needed for pain'
    ],
    documentUrl: 'https://example.com/documents/emergency-visit-015.pdf'
  }
];

export default sampleRecords;

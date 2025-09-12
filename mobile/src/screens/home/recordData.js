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
  }
];

export default sampleRecords;

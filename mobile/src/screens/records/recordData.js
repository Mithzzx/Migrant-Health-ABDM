// Sample records data for demo purposes
const sampleRecords = [
  {
    id: '1',
    title: 'Blood Test Report',
    title_key: 'bloodTestReport',
    description: 'Complete blood count and metabolic panel',
    description_key: 'bloodTestDescription',
    type_key: 'lab',
    date: '2024-09-08',
    hospital: 'City General Hospital',
    doctor: 'Dr. Smith',
    size: '2.1 MB',
    status: 'Final',
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
    title_key: 'prescriptionAntibiotics',
    description: 'Antibiotic treatment for respiratory infection',
    description_key: 'antibioticsDescription',
    type_key: 'prescription',
    date: '2024-09-07',
    hospital: 'Metro Clinic',
    doctor: 'Dr. Johnson',
    size: '0.8 MB',
    status: 'Active',
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
    title_key: 'chestXRayReport',
    description: 'Chest X-ray examination for respiratory symptoms',
    description_key: 'chestXRayDescription',
    type_key: 'diagnostic',
    date: '2024-09-05',
    hospital: 'Advanced Diagnostics',
    doctor: 'Dr. Wilson',
    size: '5.2 MB',
    status: 'Final',
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
    title_key: 'dischargeSummaryCardiacSurgery',
    description: 'Post-operative discharge summary following cardiac bypass surgery',
    description_key: 'cardiacSurgeryDescription',
    type_key: 'discharge',
    date: '2024-09-03',
    hospital: 'Heart Care Institute',
    doctor: 'Dr. Patel',
    size: '1.5 MB',
    status: 'Final',
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
    title_key: 'covid19VaccinationCertificate',
    description: 'COVID-19 vaccination certificate',
    description_key: 'covidVaccineDescription',
    type_key: 'immunization',
    date: '2024-08-28',
    hospital: 'Community Health Center',
    doctor: 'Dr. Kumar',
    size: '0.3 MB',
    status: 'Completed',
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
    title_key: 'malariaTestReport',
    description: 'Rapid diagnostic test for malaria parasites',
    description_key: 'malariaTestDescription',
    type_key: 'lab',
    date: '2024-08-15',
    hospital: 'Thiruvananthapuram Medical College',
    doctor: 'Dr. Radhika Nair',
    size: '1.8 MB',
    status: 'Final',
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
    title_key: 'ayurvedicConsultation',
    description: 'Traditional Ayurvedic consultation for digestive issues',
    description_key: 'ayurvedicConsultationDescription',
    type_key: 'consultation',
    date: '2024-08-10',
    hospital: 'Kerala Ayurveda Hospital, Kochi',
    doctor: 'Dr. Vishnu Namboothiri',
    size: '0.9 MB',
    status: 'Final',
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
    title_key: 'dengueFeverTreatment',
    description: 'Treatment plan for dengue fever management',
    description_key: 'dengueTreatmentDescription',
    type_key: 'prescription',
    date: '2024-07-28',
    hospital: 'Kottayam District Hospital',
    doctor: 'Dr. Priya Menon',
    size: '1.1 MB',
    status: 'Active',
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
    title_key: 'kneeXRayReport',
    description: 'X-ray examination of right knee joint',
    description_key: 'kneeXRayDescription',
    type_key: 'diagnostic',
    date: '2024-07-20',
    hospital: 'Calicut Medical College',
    doctor: 'Dr. Rajesh Kumar',
    size: '4.2 MB',
    status: 'Final',
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
    title_key: 'diabetesManagementPlan',
    description: 'Comprehensive diabetes management and medication plan',
    description_key: 'diabetesPlanDescription',
    type_key: 'prescription',
    date: '2024-07-15',
    hospital: 'IQRAA International Hospital, Calicut',
    doctor: 'Dr. Fatima Beevi',
    size: '1.5 MB',
    status: 'Active',
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
    title_key: 'hepatitisBVaccination',
    description: 'Hepatitis B vaccination - second dose',
    description_key: 'hepBDescription',
    type_key: 'immunization',
    date: '2024-07-05',
    hospital: 'Alappuzha Government Hospital',
    doctor: 'Dr. Suresh Babu',
    size: '0.4 MB',
    status: 'Completed',
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
    title_key: 'migrantWorkerHealthCheckup',
    description: 'Comprehensive health screening for migrant workers',
    description_key: 'migrantCheckupDescription',
    type_key: 'wellness',
    date: '2024-06-30',
    hospital: 'Migrant Worker Welfare Board Clinic, Ernakulam',
    doctor: 'Dr. Anitha Kumari',
    size: '2.3 MB',
    status: 'Final',
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
    title_key: 'chestCTScanReport',
    description: 'High-resolution CT scan of chest for respiratory symptoms',
    description_key: 'chestCTDescription',
    type_key: 'diagnostic',
    date: '2024-06-18',
    hospital: 'Aster MIMS, Kottakkal',
    doctor: 'Dr. Mohammed Ashraf',
    size: '8.1 MB',
    status: 'Final',
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
    title_key: 'occupationalHealthCertificate',
    description: 'Medical fitness certificate for construction work',
    description_key: 'occupationalCertDescription',
    type_key: 'wellness',
    date: '2024-06-10',
    hospital: 'Industrial Medicine Centre, Thrissur',
    doctor: 'Dr. Biju Thomas',
    size: '0.7 MB',
    status: 'Final',
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
    title_key: 'emergencyRoomVisitInjury',
    description: 'Emergency treatment for workplace injury - laceration on hand',
    description_key: 'erInjuryDescription',
    type_key: 'discharge',
    date: '2024-05-25',
    hospital: 'Baby Memorial Hospital, Kozhikode',
    doctor: 'Dr. Sreekumar Nair',
    size: '1.9 MB',
    status: 'Final',
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
  },
  {
    id: '16',
    title: 'Ayushman Bharat Coverage Card',
    title_key: 'ayushmanBharatCoverageCard',
    description: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY) insurance coverage card for comprehensive health benefits up to ₹5 lakhs per family per year.',
    description_key: 'pmjayDescription',
    type_key: 'others',
    date: '2024-01-15',
    hospital: 'PMJAY Empaneled Hospital',
    doctor: 'Insurance Verification Team',
    size: '1.8 MB',
    status: 'Active',
    policyDetails: {
      policyNumber: 'PMJAY-KL-2024-789456',
      familyId: 'FAM-AB-123456789',
      coverageAmount: '₹5,00,000 per family per year',
      validFrom: '2024-01-15',
      validUntil: '2025-01-14',
      beneficiaries: 4,
      status: 'Active'
    },
    benefits: [
      'Hospitalization expenses coverage',
      'Pre and post hospitalization expenses',
      'Daycare procedures coverage',
      'Emergency treatments across India',
      'Portable across all states',
      'Cashless treatment at empaneled hospitals'
    ],
    notes: 'Valid across all Indian states. Show this card for cashless treatment at any PM-JAY empaneled hospital.',
    documentUrl: 'https://example.com/documents/pmjay-card-016.pdf'
  },
  {
    id: '17',
    title: 'ESI Medical Coverage',
    title_key: 'esiMedicalCoverage',
    description: 'Employee State Insurance (ESI) medical benefits coverage for organized sector workers and their dependents.',
    description_key: 'esiDescription',
    type_key: 'others',
    date: '2024-03-10',
    hospital: 'ESI Dispensary, Ernakulam',
    doctor: 'ESI Medical Officer',
    size: '1.2 MB',
    status: 'Active',
    policyDetails: {
      policyNumber: 'ESI-2024-KL-567890',
      ipNumber: '1234567890',
      coverageType: 'Self + Family',
      validFrom: '2024-03-10',
      validUntil: '2025-03-09',
      contributionRate: '3.25% of wages',
      status: 'Active'
    },
    benefits: [
      'Medical care for self and dependents',
      'Cash benefits during sickness',
      'Maternity benefits',
      'Disability benefits',
      'Dependent benefits',
      'Treatment at ESI hospitals and dispensaries'
    ],
    notes: 'Present ESI card at any ESI facility for medical treatment. Coverage includes family members.',
    documentUrl: 'https://example.com/documents/esi-coverage-017.pdf'
  },
  {
    id: '18',
    title: 'State Health Insurance Claim',
    title_key: 'stateHealthInsuranceClaim',
    description: 'Insurance claim processed for emergency appendectomy surgery under Kerala State Health Insurance Scheme.',
    description_key: 'stateInsuranceClaimDescription',
    type_key: 'others',
    date: '2024-08-22',
    hospital: 'Kerala Institute of Medical Sciences',
    doctor: 'Dr. Radhika Nair, Claims Department',
    size: '2.5 MB',
    status: 'Approved',
    claimDetails: {
      claimNumber: 'KSHIS-2024-CLM-445566',
      claimAmount: '₹85,000',
      approvedAmount: '₹82,500',
      deductible: '₹2,500',
      dateOfService: '2024-08-20',
      dateProcessed: '2024-08-22',
      status: 'Approved and Paid'
    },
    services: [
      'Emergency room consultation',
      'Appendectomy surgery',
      'General anesthesia',
      '2-day hospital stay',
      'Post-operative medications',
      'Follow-up consultation'
    ],
    notes: 'Claim successfully processed and amount credited to hospital. Patient discharge summary attached.',
    documentUrl: 'https://example.com/documents/insurance-claim-018.pdf'
  },
  {
    id: '19',
    title: 'RSBY Portability Certificate',
    title_key: 'rsbyPortabilityCertificate',
    description: 'Rashtriya Swasthya Bima Yojana (RSBY) portability certificate enabling healthcare access across different states for migrant workers.',
    description_key: 'rsbyDescription',
    type_key: 'others',
    date: '2024-05-15',
    hospital: 'District Hospital, Thrissur',
    doctor: 'RSBY Nodal Officer',
    size: '1.1 MB',
    status: 'Valid',
    portabilityDetails: {
      certificateNumber: 'RSBY-PORT-2024-112233',
      originalState: 'Kerala',
      migrationState: 'Tamil Nadu',
      validFrom: '2024-05-15',
      validUntil: '2024-11-14',
      familyMembers: 5,
      coverageAmount: '₹30,000 per family per year'
    },
    coverage: [
      'Hospitalization in migrated state',
      'Emergency medical care',
      'Surgery and procedures',
      'Diagnostic tests',
      'Transportation allowance',
      'Follow-up care'
    ],
    notes: 'This certificate allows the family to access RSBY benefits while working in Tamil Nadu. Valid for 6 months.',
    documentUrl: 'https://example.com/documents/rsby-portability-019.pdf'
  },
  {
    id: '20',
    title: 'Private Health Insurance Policy',
    title_key: 'privateHealthInsurancePolicy',
    description: 'Comprehensive private health insurance policy providing enhanced coverage for family healthcare needs.',
    description_key: 'privateInsuranceDescription',
    type_key: 'others',
    date: '2024-04-01',
    hospital: 'Star Health Insurance',
    doctor: 'Policy Services Team',
    size: '3.2 MB',
    status: 'Active',
    policyDetails: {
      policyNumber: 'STAR-FAM-2024-998877',
      planName: 'Star Family Health Optima',
      sumInsured: '₹10,00,000',
      premium: '₹24,500 per year',
      validFrom: '2024-04-01',
      validUntil: '2025-03-31',
      familySize: 4,
      roomRent: 'Private room upto ₹7,500/day'
    },
    coverage: [
      'Hospitalization expenses',
      'Pre and post hospitalization',
      'Ambulance charges',
      'Daycare procedures',
      'Health check-ups',
      'Alternative treatments (AYUSH)',
      'Critical illness cover',
      'Maternity benefits'
    ],
    notes: 'Premium paid annually. Covers entire family with no co-payment. Network of 10,000+ hospitals across India.',
    documentUrl: 'https://example.com/documents/private-insurance-020.pdf'
  }
];

export default sampleRecords;

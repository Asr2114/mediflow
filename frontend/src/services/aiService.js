// AI Service for MediFlow Health Assistant
// This provides intelligent symptom analysis and health guidance

// Quick action buttons for initial interaction
export const QUICK_ACTIONS = [
  { label: '🩺 Check Symptoms', type: 'message', message: 'I want to check my symptoms', variant: 'primary' },
  { label: '📅 Book Appointment', type: 'navigate', path: '/doctors', variant: 'default' },
  { label: '💊 Medication Info', type: 'message', message: 'I need information about medications' },
  { label: '🏥 Find Specialist', type: 'message', message: 'Help me find the right specialist' }
]

// Comprehensive symptom database with associated conditions
const SYMPTOM_DATABASE = {
  // Head & Neurological
  headache: {
    keywords: ['headache', 'head pain', 'head ache', 'migraine', 'head hurts', 'head pounding'],
    severity: 'moderate',
    specialists: ['Neurologist', 'General physician'],
    questions: ['How long have you had this headache?', 'Is it throbbing or constant?', 'Do you have sensitivity to light?'],
    conditions: ['Tension headache', 'Migraine', 'Cluster headache', 'Sinusitis'],
    urgentSymptoms: ['sudden severe headache', 'worst headache of life', 'headache with fever and stiff neck']
  },
  dizziness: {
    keywords: ['dizzy', 'dizziness', 'lightheaded', 'vertigo', 'room spinning', 'balance problems'],
    severity: 'moderate',
    specialists: ['Neurologist', 'ENT Specialist', 'General physician'],
    questions: ['Does the room seem to spin?', 'Do you feel faint?', 'Any hearing changes?'],
    conditions: ['Vertigo', 'Inner ear problems', 'Low blood pressure', 'Dehydration'],
    urgentSymptoms: ['dizziness with chest pain', 'sudden dizziness with weakness on one side']
  },

  // Respiratory
  cough: {
    keywords: ['cough', 'coughing', 'dry cough', 'wet cough', 'persistent cough'],
    severity: 'low',
    specialists: ['General physician', 'Pulmonologist'],
    questions: ['Is it a dry or productive cough?', 'How long have you had it?', 'Any blood in mucus?'],
    conditions: ['Common cold', 'Bronchitis', 'Allergies', 'Asthma'],
    urgentSymptoms: ['coughing blood', 'severe difficulty breathing', 'cough with high fever']
  },
  breathing: {
    keywords: ['breathing', 'shortness of breath', 'can\'t breathe', 'breathless', 'difficulty breathing', 'wheezing'],
    severity: 'high',
    specialists: ['Pulmonologist', 'General physician', 'Cardiologist'],
    questions: ['When does it occur?', 'Is it worse with activity?', 'Any chest pain?'],
    conditions: ['Asthma', 'COPD', 'Anxiety', 'Heart problems'],
    urgentSymptoms: ['severe difficulty breathing', 'blue lips or face', 'breathing problems with chest pain']
  },

  // Cardiovascular
  chest_pain: {
    keywords: ['chest pain', 'chest hurts', 'chest tightness', 'chest pressure', 'heart pain'],
    severity: 'high',
    specialists: ['Cardiologist', 'General physician'],
    questions: ['Where exactly is the pain?', 'Does it spread to arm or jaw?', 'Any shortness of breath?'],
    conditions: ['Angina', 'Heart attack', 'GERD', 'Muscle strain'],
    urgentSymptoms: ['crushing chest pain', 'chest pain with arm/jaw pain', 'chest pain with sweating']
  },
  heart: {
    keywords: ['heart racing', 'palpitations', 'heart pounding', 'irregular heartbeat', 'fast heartbeat'],
    severity: 'moderate',
    specialists: ['Cardiologist', 'General physician'],
    questions: ['How often does this happen?', 'Any dizziness with it?', 'Caffeine or stress?'],
    conditions: ['Arrhythmia', 'Anxiety', 'Caffeine sensitivity', 'Thyroid issues'],
    urgentSymptoms: ['palpitations with fainting', 'prolonged rapid heartbeat', 'palpitations with chest pain']
  },

  // Gastrointestinal
  stomach: {
    keywords: ['stomach pain', 'stomach ache', 'abdominal pain', 'belly pain', 'tummy ache', 'stomach hurts'],
    severity: 'moderate',
    specialists: ['Gastroenterologist', 'General physician'],
    questions: ['Where is the pain located?', 'Is it constant or comes and goes?', 'Any nausea or vomiting?'],
    conditions: ['Gastritis', 'Food poisoning', 'Appendicitis', 'IBS'],
    urgentSymptoms: ['severe abdominal pain', 'blood in stool', 'abdominal pain with fever']
  },
  nausea: {
    keywords: ['nausea', 'nauseous', 'feel sick', 'want to vomit', 'queasy', 'throwing up', 'vomiting'],
    severity: 'low',
    specialists: ['Gastroenterologist', 'General physician'],
    questions: ['Any recent food you ate?', 'Are you pregnant?', 'Any dizziness?'],
    conditions: ['Food poisoning', 'Gastroenteritis', 'Pregnancy', 'Motion sickness'],
    urgentSymptoms: ['blood in vomit', 'severe dehydration', 'vomiting for more than 24 hours']
  },

  // Musculoskeletal
  back_pain: {
    keywords: ['back pain', 'back ache', 'back hurts', 'lower back pain', 'upper back pain', 'spine pain'],
    severity: 'moderate',
    specialists: ['Orthopedic', 'General physician', 'Neurologist'],
    questions: ['Where exactly is the pain?', 'Did it start suddenly?', 'Any numbness in legs?'],
    conditions: ['Muscle strain', 'Herniated disc', 'Sciatica', 'Poor posture'],
    urgentSymptoms: ['back pain with loss of bladder control', 'severe back pain after injury', 'back pain with leg weakness']
  },
  joint: {
    keywords: ['joint pain', 'knee pain', 'ankle pain', 'wrist pain', 'elbow pain', 'shoulder pain', 'joint swelling'],
    severity: 'moderate',
    specialists: ['Orthopedic', 'Rheumatologist', 'General physician'],
    questions: ['Which joint is affected?', 'Any swelling or redness?', 'Recent injury?'],
    conditions: ['Arthritis', 'Injury', 'Gout', 'Tendinitis'],
    urgentSymptoms: ['joint pain with fever', 'severe swelling', 'inability to move joint']
  },

  // Skin
  skin: {
    keywords: ['rash', 'skin rash', 'itchy skin', 'skin irritation', 'hives', 'skin bumps', 'acne', 'eczema'],
    severity: 'low',
    specialists: ['Dermatologist', 'General physician'],
    questions: ['Where is the rash?', 'Is it itchy?', 'Any new products or foods?'],
    conditions: ['Allergic reaction', 'Eczema', 'Psoriasis', 'Contact dermatitis'],
    urgentSymptoms: ['rash with difficulty breathing', 'rapidly spreading rash', 'rash with high fever']
  },

  // Mental Health
  anxiety: {
    keywords: ['anxiety', 'anxious', 'panic', 'worried', 'nervous', 'panic attack', 'stressed'],
    severity: 'moderate',
    specialists: ['Psychiatrist', 'General physician'],
    questions: ['How often do you feel this way?', 'Any specific triggers?', 'Affecting your daily life?'],
    conditions: ['Generalized anxiety', 'Panic disorder', 'Stress', 'Social anxiety'],
    urgentSymptoms: ['thoughts of self-harm', 'severe panic attack', 'unable to function']
  },
  depression: {
    keywords: ['depressed', 'depression', 'sad', 'hopeless', 'no motivation', 'feeling down', 'no energy'],
    severity: 'moderate',
    specialists: ['Psychiatrist', 'General physician'],
    questions: ['How long have you felt this way?', 'Any changes in sleep?', 'Thoughts of self-harm?'],
    conditions: ['Depression', 'Seasonal affective disorder', 'Adjustment disorder'],
    urgentSymptoms: ['thoughts of suicide', 'self-harm', 'unable to care for yourself']
  },

  // Fever & General
  fever: {
    keywords: ['fever', 'high temperature', 'feeling hot', 'chills', 'body temperature'],
    severity: 'moderate',
    specialists: ['General physician'],
    questions: ['What is your temperature?', 'Any other symptoms?', 'How long have you had it?'],
    conditions: ['Viral infection', 'Bacterial infection', 'Flu', 'COVID-19'],
    urgentSymptoms: ['fever above 103°F', 'fever with rash', 'fever with severe headache and stiff neck']
  },
  fatigue: {
    keywords: ['tired', 'fatigue', 'exhausted', 'no energy', 'weakness', 'always tired'],
    severity: 'low',
    specialists: ['General physician'],
    questions: ['How long have you felt tired?', 'Sleep quality?', 'Any other symptoms?'],
    conditions: ['Anemia', 'Thyroid issues', 'Sleep disorder', 'Depression'],
    urgentSymptoms: ['sudden severe weakness', 'fatigue with chest pain', 'fatigue with shortness of breath']
  },

  // Eyes
  eye: {
    keywords: ['eye pain', 'blurry vision', 'red eye', 'eye irritation', 'vision problems', 'seeing spots'],
    severity: 'moderate',
    specialists: ['Ophthalmologist', 'General physician'],
    questions: ['Which eye is affected?', 'Any discharge?', 'Recent injury?'],
    conditions: ['Conjunctivitis', 'Eye strain', 'Dry eyes', 'Infection'],
    urgentSymptoms: ['sudden vision loss', 'severe eye pain', 'eye injury']
  },

  // ENT
  ear: {
    keywords: ['ear pain', 'ear ache', 'hearing loss', 'ringing in ears', 'ear infection'],
    severity: 'moderate',
    specialists: ['ENT Specialist', 'General physician'],
    questions: ['Which ear?', 'Any discharge?', 'Hearing affected?'],
    conditions: ['Ear infection', 'Wax buildup', 'Tinnitus'],
    urgentSymptoms: ['sudden hearing loss', 'severe ear pain with fever', 'blood from ear']
  },
  throat: {
    keywords: ['sore throat', 'throat pain', 'difficulty swallowing', 'throat hurts', 'strep'],
    severity: 'low',
    specialists: ['ENT Specialist', 'General physician'],
    questions: ['Any fever?', 'Difficulty swallowing?', 'White patches visible?'],
    conditions: ['Pharyngitis', 'Strep throat', 'Tonsillitis', 'Viral infection'],
    urgentSymptoms: ['severe difficulty swallowing', 'throat swelling', 'difficulty breathing']
  }
}

// Emergency keywords that require immediate attention
const EMERGENCY_KEYWORDS = [
  'heart attack', 'stroke', 'can\'t breathe', 'chest pain', 'unconscious',
  'severe bleeding', 'suicide', 'overdose', 'choking', 'seizure',
  'severe allergic', 'anaphylaxis', 'poisoning'
]

// Analyze user input for symptoms
function analyzeSymptoms(input) {
  const lowerInput = input.toLowerCase()
  const detectedSymptoms = []
  const conditions = new Set()
  const specialists = new Set()
  let maxSeverity = 'low'
  let isUrgent = false
  let urgentReason = null

  // Check for emergency keywords first
  for (const keyword of EMERGENCY_KEYWORDS) {
    if (lowerInput.includes(keyword)) {
      return {
        isEmergency: true,
        keyword: keyword
      }
    }
  }

  // Analyze symptoms
  for (const [symptomKey, symptomData] of Object.entries(SYMPTOM_DATABASE)) {
    for (const keyword of symptomData.keywords) {
      if (lowerInput.includes(keyword)) {
        detectedSymptoms.push({
          key: symptomKey,
          ...symptomData
        })

        // Add conditions
        symptomData.conditions.forEach(c => conditions.add(c))
        
        // Add specialists
        symptomData.specialists.forEach(s => specialists.add(s))

        // Check severity
        if (symptomData.severity === 'high') maxSeverity = 'high'
        else if (symptomData.severity === 'moderate' && maxSeverity !== 'high') maxSeverity = 'moderate'

        // Check for urgent symptoms
        for (const urgent of symptomData.urgentSymptoms) {
          if (lowerInput.includes(urgent)) {
            isUrgent = true
            urgentReason = urgent
          }
        }

        break // Only match once per symptom category
      }
    }
  }

  return {
    isEmergency: false,
    detectedSymptoms,
    conditions: Array.from(conditions),
    specialists: Array.from(specialists),
    severity: maxSeverity,
    isUrgent,
    urgentReason
  }
}

// Get follow-up questions based on symptoms
function getFollowUpQuestions(symptoms) {
  const questions = []
  for (const symptom of symptoms) {
    questions.push(...symptom.questions.slice(0, 2))
  }
  return [...new Set(questions)].slice(0, 3)
}

// Map specialists to doctor specialities in the database
function mapToSpeciality(specialist) {
  const mapping = {
    'General physician': 'General physician',
    'Neurologist': 'Neurologist',
    'Cardiologist': 'Cardiologist',
    'Pulmonologist': 'General physician',
    'Gastroenterologist': 'Gastroenterologist',
    'Dermatologist': 'Dermatologist',
    'Orthopedic': 'General physician',
    'Psychiatrist': 'General physician',
    'Ophthalmologist': 'General physician',
    'ENT Specialist': 'General physician',
    'Rheumatologist': 'General physician',
    'Gynecologist': 'Gynecologist',
    'Pediatrician': 'Pediatricians'
  }
  return mapping[specialist] || 'General physician'
}

// Get recommended doctors based on specialists
function getRecommendedDoctors(specialists, doctors) {
  if (!doctors || doctors.length === 0) return []
  
  const recommended = []
  for (const specialist of specialists) {
    const speciality = mapToSpeciality(specialist)
    const matchingDoctors = doctors.filter(
      d => d.speciality === speciality && d.available
    )
    recommended.push(...matchingDoctors.slice(0, 2))
  }
  
  return [...new Map(recommended.map(d => [d._id, d])).values()].slice(0, 3)
}

// Intent detection for non-symptom queries
function detectIntent(input) {
  const lowerInput = input.toLowerCase()
  
  if (lowerInput.match(/book|appointment|schedule|see a doctor/)) {
    return 'booking'
  }
  if (lowerInput.match(/medication|medicine|drug|prescription|pills/)) {
    return 'medication'
  }
  if (lowerInput.match(/find|specialist|doctor for|which doctor/)) {
    return 'find_specialist'
  }
  if (lowerInput.match(/hello|hi|hey|good morning|good evening/)) {
    return 'greeting'
  }
  if (lowerInput.match(/thank|thanks|bye|goodbye/)) {
    return 'farewell'
  }
  if (lowerInput.match(/help|what can you do|how do you work/)) {
    return 'help'
  }
  if (lowerInput.match(/covid|corona|vaccine/)) {
    return 'covid'
  }
  
  return 'symptom_check'
}

// Main AI response function
export async function getAIResponse(input, context, doctors) {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700))
  
  const intent = detectIntent(input)
  
  // Handle different intents
  switch (intent) {
    case 'greeting':
      return {
        message: "Hello! 👋 I'm here to help you with your health concerns. You can:\n\n• Describe your symptoms for analysis\n• Ask about medications\n• Find the right specialist\n• Book an appointment\n\nWhat would you like help with today?",
        actions: QUICK_ACTIONS
      }
    
    case 'farewell':
      return {
        message: "Take care! 💙 Remember, if your symptoms worsen or you have any concerns, don't hesitate to seek medical attention. Wishing you good health!",
        actions: [
          { label: '📅 Book Appointment', type: 'navigate', path: '/doctors', variant: 'primary' },
          { label: '🏠 Go Home', type: 'navigate', path: '/' }
        ]
      }
    
    case 'help':
      return {
        message: "I'm MediFlow AI, your personal health assistant! Here's how I can help:\n\n🩺 **Symptom Analysis**: Describe your symptoms and I'll provide guidance on possible conditions and recommend specialists.\n\n📅 **Appointment Booking**: I can help you find and book appointments with the right doctors.\n\n💊 **Health Information**: Ask me about general health topics, medications, or preventive care.\n\n⚠️ **Important**: I provide guidance only. Always consult a real doctor for medical decisions.",
        actions: QUICK_ACTIONS
      }
    
    case 'booking':
      return {
        message: "I'd be happy to help you book an appointment! 📅\n\nYou can browse our available doctors by speciality. Which type of specialist are you looking for?",
        actions: [
          { label: '👨‍⚕️ General Physician', type: 'book', speciality: 'General physician', variant: 'primary' },
          { label: '🧠 Neurologist', type: 'book', speciality: 'Neurologist' },
          { label: '❤️ Cardiologist', type: 'book', speciality: 'Cardiologist' },
          { label: '🦴 Dermatologist', type: 'book', speciality: 'Dermatologist' },
          { label: '📋 View All Doctors', type: 'navigate', path: '/doctors', variant: 'default' }
        ]
      }
    
    case 'medication':
      return {
        message: "I can provide general information about medications. However, please note:\n\n⚠️ **Important Disclaimer**: I cannot prescribe medications. Only a licensed doctor can prescribe medicine after proper examination.\n\nFor medication-related queries:\n• Consult your doctor about prescriptions\n• Ask a pharmacist about over-the-counter options\n• Never self-medicate with prescription drugs\n\nWould you like me to help you find a doctor instead?",
        actions: [
          { label: '👨‍⚕️ Find a Doctor', type: 'navigate', path: '/doctors', variant: 'primary' },
          { label: '🩺 Check Symptoms', type: 'message', message: 'I want to check my symptoms' }
        ]
      }
    
    case 'find_specialist':
      return {
        message: "I can help you find the right specialist! To give you the best recommendation, could you tell me:\n\n• What symptoms or health concerns do you have?\n• Is this for a routine check-up or a specific issue?\n\nOr you can directly browse by speciality:",
        actions: [
          { label: '👨‍⚕️ General Physician', type: 'book', speciality: 'General physician' },
          { label: '👶 Pediatrician', type: 'book', speciality: 'Pediatricians' },
          { label: '👩‍⚕️ Gynecologist', type: 'book', speciality: 'Gynecologist' },
          { label: '🧠 Neurologist', type: 'book', speciality: 'Neurologist' },
          { label: '🦴 Dermatologist', type: 'book', speciality: 'Dermatologist' },
          { label: '📋 All Specialists', type: 'navigate', path: '/doctors' }
        ]
      }
    
    case 'covid':
      return {
        message: "Regarding COVID-19:\n\n**Common Symptoms:**\n• Fever or chills\n• Cough\n• Shortness of breath\n• Loss of taste or smell\n• Fatigue\n\n**What to do:**\n• If you have symptoms, get tested\n• Isolate if positive\n• Monitor your symptoms\n• Seek emergency care if you have difficulty breathing\n\n**Prevention:**\n• Stay up to date with vaccinations\n• Wash hands frequently\n• Wear masks in crowded places",
        actions: [
          { label: '🩺 I Have Symptoms', type: 'message', message: 'I have COVID symptoms like fever and cough' },
          { label: '👨‍⚕️ See a Doctor', type: 'book', speciality: 'General physician', variant: 'primary' }
        ],
        warning: "If you have severe difficulty breathing, persistent chest pain, or confusion, seek emergency medical care immediately."
      }
    
    default:
      // Symptom analysis
      return analyzeAndRespond(input, context, doctors)
  }
}

// Detailed symptom analysis and response
function analyzeAndRespond(input, context, doctors) {
  const analysis = analyzeSymptoms(input)
  
  // Handle emergency
  if (analysis.isEmergency) {
    return {
      message: `🚨 **EMERGENCY DETECTED**\n\nBased on your description mentioning "${analysis.keyword}", this could be a medical emergency.\n\n**Please take immediate action:**\n1. Call emergency services (911) immediately\n2. Don't wait - time is critical\n3. If with someone, have them call while you monitor symptoms`,
      warning: "This appears to be a medical emergency. Please call 911 or go to the nearest emergency room immediately.",
      actions: [
        { label: '🚨 Call 911', type: 'emergency', variant: 'danger' },
        { label: '🏥 Find Nearest ER', type: 'message', message: 'Find emergency room near me' }
      ]
    }
  }
  
  // No symptoms detected
  if (analysis.detectedSymptoms.length === 0) {
    return {
      message: "I couldn't identify specific symptoms from your message. Could you please describe:\n\n• What symptoms are you experiencing?\n• Where do you feel discomfort?\n• How long have you had these symptoms?\n\nThe more details you provide, the better I can assist you.",
      actions: [
        { label: '🩺 Common Symptoms', type: 'message', message: 'I have headache and fever' },
        { label: '🤢 Stomach Issues', type: 'message', message: 'I have stomach pain and nausea' },
        { label: '😷 Cold/Flu', type: 'message', message: 'I have cough, cold, and sore throat' }
      ]
    }
  }
  
  // Build response for detected symptoms
  const symptomNames = analysis.detectedSymptoms.map(s => s.key.replace('_', ' ')).join(', ')
  const conditionsList = analysis.conditions.slice(0, 4).join(', ')
  const followUpQuestions = getFollowUpQuestions(analysis.detectedSymptoms)
  const recommendedDoctors = getRecommendedDoctors(analysis.specialists, doctors)
  
  let message = `Based on your symptoms (${symptomNames}), here's my analysis:\n\n`
  
  // Severity assessment
  if (analysis.severity === 'high' || analysis.isUrgent) {
    message += `⚠️ **Severity: HIGH**\nThese symptoms may require prompt medical attention.\n\n`
  } else if (analysis.severity === 'moderate') {
    message += `📊 **Severity: MODERATE**\nThese symptoms should be evaluated by a doctor.\n\n`
  } else {
    message += `📊 **Severity: MILD**\nThese symptoms are often manageable but monitor for changes.\n\n`
  }
  
  // Possible conditions
  message += `**Possible Conditions:**\n${analysis.conditions.slice(0, 4).map(c => `• ${c}`).join('\n')}\n\n`
  
  // Recommended specialists
  message += `**Recommended Specialists:**\n${analysis.specialists.slice(0, 3).map(s => `• ${s}`).join('\n')}\n\n`
  
  // Self-care tips for mild cases
  if (analysis.severity === 'low') {
    message += `**Self-Care Tips:**\n• Get adequate rest\n• Stay hydrated\n• Monitor your symptoms\n• Seek medical help if symptoms worsen\n\n`
  }
  
  // Follow-up questions
  if (followUpQuestions.length > 0) {
    message += `**To better assist you:**\n${followUpQuestions.map(q => `• ${q}`).join('\n')}`
  }
  
  // Build actions
  const actions = [
    { label: '📅 Book Appointment', type: 'navigate', path: '/doctors', variant: 'primary' }
  ]
  
  if (analysis.specialists.length > 0) {
    const primarySpecialist = analysis.specialists[0]
    const speciality = mapToSpeciality(primarySpecialist)
    actions.unshift({
      label: `👨‍⚕️ See ${primarySpecialist}`,
      type: 'book',
      speciality: speciality,
      variant: 'primary'
    })
  }
  
  actions.push({ label: '💬 More Details', type: 'message', message: 'I want to provide more details about my symptoms' })
  
  // Build response object
  const response = {
    message,
    actions,
    updatedContext: {
      symptoms: [...context.symptoms, ...analysis.detectedSymptoms.map(s => s.key)],
      severity: analysis.severity
    }
  }
  
  // Add warning for urgent cases
  if (analysis.isUrgent) {
    response.warning = `Your symptoms (${analysis.urgentReason}) may require immediate medical attention. Please consult a doctor as soon as possible or visit an emergency room if symptoms are severe.`
  }
  
  // Add recommended doctors
  if (recommendedDoctors.length > 0) {
    response.recommendations = recommendedDoctors
  }
  
  return response
}

export default {
  getAIResponse,
  QUICK_ACTIONS
}

/**
 * Advanced AI Service for MediFlow Health Assistant
 * Uses ML Engine for intelligent symptom analysis
 */

import { performMLAnalysis, analyzeSentiment, extractMedicalEntities } from './mlEngine'

// Quick action buttons for initial interaction
export const QUICK_ACTIONS = [
  { label: '🩺 Check Symptoms', type: 'message', message: 'I want to check my symptoms', variant: 'primary' },
  { label: '📅 Book Appointment', type: 'navigate', path: '/doctors', variant: 'default' },
  { label: '💊 Medication Info', type: 'message', message: 'I need information about medications' },
  { label: '🏥 Find Specialist', type: 'message', message: 'Help me find the right specialist' },
  { label: '🤖 AI Health Scan', type: 'message', message: 'Perform an AI health assessment', variant: 'primary' }
]

// Emergency keywords that require immediate attention
const EMERGENCY_KEYWORDS = [
  'heart attack', 'stroke', "can't breathe", 'chest pain radiating', 'unconscious',
  'severe bleeding', 'suicide', 'overdose', 'choking', 'seizure',
  'severe allergic', 'anaphylaxis', 'poisoning', 'not breathing'
]

// Comprehensive condition database with ML-enhanced matching
const CONDITION_DATABASE = {
  migraine: {
    name: 'Migraine',
    description: 'A type of headache characterized by severe throbbing pain, often with nausea and sensitivity to light.',
    specialists: ['Neurologist', 'General physician'],
    selfCare: [
      'Rest in a quiet, dark room',
      'Apply cold or warm compress to head/neck',
      'Stay hydrated',
      'Avoid triggers (stress, certain foods, bright lights)',
      'Consider over-the-counter pain relievers'
    ],
    urgentSigns: ['Sudden severe headache (worst ever)', 'Headache with fever and stiff neck', 'Vision changes or confusion']
  },
  cardiac: {
    name: 'Cardiac Condition',
    description: 'Heart-related symptoms that may indicate angina, arrhythmia, or other cardiac issues.',
    specialists: ['Cardiologist', 'General physician'],
    selfCare: [
      'Stop any physical activity immediately',
      'Sit or lie down and rest',
      'Loosen tight clothing',
      'Take prescribed heart medication if available',
      'Monitor symptoms closely'
    ],
    urgentSigns: ['Crushing chest pain', 'Pain spreading to arm, jaw, or back', 'Shortness of breath with chest pain', 'Cold sweats']
  },
  respiratory_infection: {
    name: 'Respiratory Infection',
    description: 'Infection affecting the respiratory system, could be viral (cold, flu, COVID) or bacterial.',
    specialists: ['General physician', 'Pulmonologist'],
    selfCare: [
      'Get plenty of rest',
      'Stay well hydrated',
      'Use honey for sore throat (adults only)',
      'Gargle with warm salt water',
      'Use a humidifier',
      'Take over-the-counter fever reducers if needed'
    ],
    urgentSigns: ['Difficulty breathing', 'High fever (>103°F)', 'Symptoms worsening after a week', 'Coughing up blood']
  },
  gastritis: {
    name: 'Gastritis/Stomach Issue',
    description: 'Inflammation of the stomach lining causing pain, nausea, and digestive discomfort.',
    specialists: ['Gastroenterologist', 'General physician'],
    selfCare: [
      'Eat smaller, more frequent meals',
      'Avoid spicy, acidic, and fatty foods',
      'Avoid alcohol and caffeine',
      'Don\'t lie down immediately after eating',
      'Consider antacids for temporary relief'
    ],
    urgentSigns: ['Blood in vomit', 'Black or tarry stools', 'Severe abdominal pain', 'Persistent vomiting']
  },
  anxiety_disorder: {
    name: 'Anxiety/Panic',
    description: 'Mental health condition characterized by excessive worry, fear, and physical symptoms like rapid heartbeat.',
    specialists: ['Psychiatrist', 'General physician'],
    selfCare: [
      'Practice deep breathing exercises',
      'Try grounding techniques (5-4-3-2-1 method)',
      'Regular physical exercise',
      'Limit caffeine and alcohol',
      'Maintain regular sleep schedule',
      'Consider meditation or mindfulness'
    ],
    urgentSigns: ['Thoughts of self-harm', 'Unable to function in daily life', 'Panic attacks becoming more frequent']
  },
  arthritis: {
    name: 'Arthritis/Joint Problem',
    description: 'Joint inflammation causing pain, stiffness, and swelling.',
    specialists: ['Rheumatologist', 'Orthopedic'],
    selfCare: [
      'Apply ice or heat to affected joints',
      'Gentle stretching and exercise',
      'Maintain healthy weight',
      'Use supportive devices if needed',
      'Over-the-counter anti-inflammatory medications'
    ],
    urgentSigns: ['Sudden severe joint swelling', 'Joint pain with fever', 'Inability to move joint']
  },
  skin_allergy: {
    name: 'Skin Allergy/Dermatitis',
    description: 'Allergic reaction affecting the skin, causing rash, itching, or hives.',
    specialists: ['Dermatologist', 'General physician'],
    selfCare: [
      'Identify and avoid the allergen',
      'Apply cool compress to affected area',
      'Use fragrance-free moisturizers',
      'Avoid scratching',
      'Consider over-the-counter antihistamines'
    ],
    urgentSigns: ['Rash with difficulty breathing', 'Rapidly spreading rash', 'Facial swelling', 'Rash with fever']
  },
  depression: {
    name: 'Depression',
    description: 'Mental health condition characterized by persistent sadness, loss of interest, and changes in energy.',
    specialists: ['Psychiatrist', 'General physician'],
    selfCare: [
      'Maintain regular sleep schedule',
      'Engage in physical activity',
      'Stay connected with supportive people',
      'Set small, achievable goals',
      'Practice self-compassion'
    ],
    urgentSigns: ['Thoughts of suicide or self-harm', 'Unable to care for yourself', 'Severe hopelessness']
  }
}

// Specialist mapping
const SPECIALIST_MAPPING = {
  'General physician': 'General physician',
  'Neurologist': 'Neurologist',
  'Cardiologist': 'Cardiologist',
  'Gastroenterologist': 'Gastroenterologist',
  'Dermatologist': 'Dermatologist',
  'Psychiatrist': 'General physician',
  'Pulmonologist': 'General physician',
  'Rheumatologist': 'General physician',
  'Orthopedic': 'General physician',
  'Gynecologist': 'Gynecologist',
  'Pediatrician': 'Pediatricians',
  'ENT': 'General physician'
}

// Intent detection with enhanced NLP
function detectIntent(input, mlAnalysis) {
  const lowerInput = input.toLowerCase()
  
  // Priority intents
  if (lowerInput.match(/book|appointment|schedule|see a doctor/)) return 'booking'
  if (lowerInput.match(/medication|medicine|drug|prescription|pills/)) return 'medication'
  if (lowerInput.match(/find|specialist|doctor for|which doctor/)) return 'find_specialist'
  if (lowerInput.match(/hello|hi|hey|good morning|good evening/)) return 'greeting'
  if (lowerInput.match(/thank|thanks|bye|goodbye/)) return 'farewell'
  if (lowerInput.match(/help|what can you do|how do you work/)) return 'help'
  if (lowerInput.match(/covid|corona|vaccine/)) return 'covid'
  if (lowerInput.match(/ai health scan|health assessment|analyze my health|full scan/)) return 'health_scan'
  
  // If symptoms detected, do symptom analysis
  if (mlAnalysis.symptomMatches.length > 0 || mlAnalysis.entities.symptoms.length > 0) {
    return 'symptom_analysis'
  }
  
  return 'general_query'
}

// Get recommended doctors
function getRecommendedDoctors(specialists, doctors) {
  if (!doctors || doctors.length === 0) return []
  
  const recommended = []
  for (const specialist of specialists) {
    const speciality = SPECIALIST_MAPPING[specialist] || 'General physician'
    const matchingDoctors = doctors.filter(d => d.speciality === speciality && d.available)
    recommended.push(...matchingDoctors.slice(0, 2))
  }
  
  return [...new Map(recommended.map(d => [d._id, d])).values()].slice(0, 3)
}

// Generate AI response based on ML analysis
function generateMLResponse(mlAnalysis, doctors, context) {
  const { sentiment, entities, symptomMatches, similarConditions, diagnoses, overallUrgency } = mlAnalysis
  
  // Check for emergency
  if (overallUrgency.action === 'emergency') {
    return generateEmergencyResponse(diagnoses[0])
  }
  
  // No symptoms detected
  if (symptomMatches.length === 0 && entities.symptoms.length === 0) {
    return generateNoSymptomsResponse()
  }
  
  // Build comprehensive response
  let message = ''
  let warning = null
  const actions = []
  const specialists = new Set()
  
  // Header based on urgency
  if (overallUrgency.level === 'critical' || overallUrgency.level === 'high') {
    message += `🚨 **Urgency Level: ${overallUrgency.level.toUpperCase()}**\n\n`
    warning = 'Based on my analysis, your symptoms may require prompt medical attention. Please consult a healthcare provider soon.'
  } else if (overallUrgency.level === 'moderate') {
    message += `⚠️ **Urgency Level: MODERATE**\n\n`
  } else {
    message += `✅ **Urgency Level: LOW**\n\n`
  }
  
  // AI Analysis Summary
  message += `**🤖 AI Analysis Summary:**\n`
  
  // Detected symptoms
  const allSymptoms = [...new Set([
    ...symptomMatches.map(s => s.symptom.replace('_', ' ')),
    ...entities.symptoms
  ])]
  
  if (allSymptoms.length > 0) {
    message += `• Symptoms detected: ${allSymptoms.slice(0, 5).join(', ')}\n`
  }
  
  // Body parts affected
  if (entities.bodyParts.length > 0) {
    message += `• Affected areas: ${entities.bodyParts.slice(0, 4).join(', ')}\n`
  }
  
  // Duration if mentioned
  if (entities.durations.length > 0) {
    message += `• Duration indicators: ${entities.durations.slice(0, 2).join(', ')}\n`
  }
  
  // Severity indicators
  if (entities.severity.length > 0) {
    message += `• Severity noted: ${entities.severity.join(', ')}\n`
  }
  
  // Patient sentiment
  message += `• Emotional state: ${sentiment.sentiment} (${(sentiment.confidence * 100).toFixed(0)}% confidence)\n\n`
  
  // Possible conditions from ML
  if (diagnoses.length > 0 || similarConditions.length > 0) {
    message += `**📋 Possible Conditions:**\n`
    
    // From rule-based diagnosis
    diagnoses.slice(0, 2).forEach(d => {
      const conditionInfo = CONDITION_DATABASE[d.diagnosis]
      if (conditionInfo) {
        message += `• **${conditionInfo.name}** (${(d.confidence * 100).toFixed(0)}% match)\n`
        conditionInfo.specialists.forEach(s => specialists.add(s))
      }
    })
    
    // From TF-IDF similarity
    similarConditions.slice(0, 2).forEach(c => {
      const conditionInfo = CONDITION_DATABASE[c.label]
      if (conditionInfo && !diagnoses.find(d => d.diagnosis === c.label)) {
        message += `• ${conditionInfo.name} (${(c.similarity * 100).toFixed(0)}% similar to known cases)\n`
        conditionInfo.specialists.forEach(s => specialists.add(s))
      }
    })
    message += '\n'
  }
  
  // Recommended specialists
  if (specialists.size > 0) {
    message += `**👨‍⚕️ Recommended Specialists:**\n`
    Array.from(specialists).slice(0, 3).forEach(s => {
      message += `• ${s}\n`
    })
    message += '\n'
  }
  
  // Self-care recommendations for low urgency
  if (overallUrgency.level === 'low' || overallUrgency.level === 'moderate') {
    const topCondition = diagnoses[0] || similarConditions[0]
    if (topCondition) {
      const conditionKey = topCondition.diagnosis || topCondition.label
      const conditionInfo = CONDITION_DATABASE[conditionKey]
      if (conditionInfo && conditionInfo.selfCare) {
        message += `**💊 Self-Care Tips:**\n`
        conditionInfo.selfCare.slice(0, 4).forEach(tip => {
          message += `• ${tip}\n`
        })
        message += '\n'
      }
    }
  }
  
  // Warning signs
  const topCondition = diagnoses[0] || similarConditions[0]
  if (topCondition) {
    const conditionKey = topCondition.diagnosis || topCondition.label
    const conditionInfo = CONDITION_DATABASE[conditionKey]
    if (conditionInfo && conditionInfo.urgentSigns) {
      message += `**⚠️ Seek Immediate Care If:**\n`
      conditionInfo.urgentSigns.slice(0, 3).forEach(sign => {
        message += `• ${sign}\n`
      })
    }
  }
  
  // Build actions
  const primarySpecialist = Array.from(specialists)[0]
  if (primarySpecialist) {
    actions.push({
      label: `👨‍⚕️ See ${primarySpecialist}`,
      type: 'book',
      speciality: SPECIALIST_MAPPING[primarySpecialist],
      variant: 'primary'
    })
  }
  
  actions.push(
    { label: '📅 Browse All Doctors', type: 'navigate', path: '/doctors' },
    { label: '💬 Tell Me More', type: 'message', message: 'I want to add more details about my symptoms' },
    { label: '🔄 New Assessment', type: 'message', message: 'Start a new health assessment' }
  )
  
  // Get recommended doctors
  const recommendations = getRecommendedDoctors(Array.from(specialists), doctors)
  
  return {
    message,
    warning,
    actions,
    recommendations: recommendations.length > 0 ? recommendations : null,
    mlAnalysis: {
      confidence: Math.max(...[...diagnoses, ...similarConditions].map(d => d.confidence || d.similarity || 0.5), 0.6),
      urgencyLevel: overallUrgency.level,
      sentiment: {
        label: sentiment.sentiment,
        score: sentiment.score
      },
      entities: {
        bodyParts: entities.bodyParts,
        symptoms: [...new Set([...entities.symptoms, ...symptomMatches.map(s => s.symptom.replace('_', ' '))])],
        duration: entities.durations,
        severity: entities.severity,
        conditions: entities.conditions
      },
      matchedSymptoms: symptomMatches.map(s => s.symptom.replace('_', ' ')),
      possibleDiagnoses: diagnoses.slice(0, 3).map(d => ({
        condition: CONDITION_DATABASE[d.diagnosis]?.name || d.diagnosis,
        matchScore: d.confidence
      }))
    },
    updatedContext: {
      symptoms: [...(context.symptoms || []), ...allSymptoms],
      severity: overallUrgency.level,
      lastAnalysis: new Date().toISOString()
    }
  }
}

// Generate emergency response
function generateEmergencyResponse(diagnosis) {
  return {
    message: `🚨 **EMERGENCY ALERT**\n\nBased on my analysis, your symptoms suggest a potentially serious condition that requires immediate medical attention.\n\n**Please take immediate action:**\n\n1. 📞 **Call Emergency Services (911)** immediately\n2. 🏥 Go to the nearest emergency room\n3. 👥 If possible, have someone stay with you\n4. 📝 Note your symptoms and when they started\n\n**Do NOT wait** - time is critical in emergency situations.`,
    warning: 'This appears to be a medical emergency. Please seek immediate medical care.',
    actions: [
      { label: '🚨 Call 911', type: 'emergency', variant: 'danger' },
      { label: '🏥 Find ER Near Me', type: 'message', message: 'Find nearest emergency room' }
    ]
  }
}

// Generate no symptoms response
function generateNoSymptomsResponse() {
  return {
    message: `I wasn't able to identify specific symptoms from your message. To help you better, could you please describe:\n\n• **What are you feeling?** (e.g., pain, discomfort, fatigue)\n• **Where is the problem?** (e.g., head, stomach, chest)\n• **How long have you had it?** (e.g., 2 days, a week)\n• **How severe is it?** (mild, moderate, severe)\n\nThe more details you provide, the better I can analyze your condition.`,
    actions: [
      { label: '🩺 Common Symptoms', type: 'message', message: 'I have headache and feel nauseous' },
      { label: '🤢 Digestive Issues', type: 'message', message: 'I have stomach pain and nausea' },
      { label: '😷 Cold/Flu Symptoms', type: 'message', message: 'I have fever, cough and sore throat' },
      { label: '💔 Chest Discomfort', type: 'message', message: 'I have chest pain and difficulty breathing' }
    ]
  }
}

// Generate health scan report
function generateHealthScanReport(mlAnalysis) {
  const { sentiment, entities, symptomMatches, similarConditions, diagnoses, overallUrgency } = mlAnalysis
  
  // Calculate overall health score (inverse of symptom severity)
  let healthScore = 85 // Base score
  if (overallUrgency.level === 'critical') healthScore -= 40
  else if (overallUrgency.level === 'high') healthScore -= 30
  else if (overallUrgency.level === 'moderate') healthScore -= 15
  if (entities.severity.some(s => s.includes('severe'))) healthScore -= 10
  if (sentiment.sentiment === 'negative') healthScore -= 5
  healthScore = Math.max(30, Math.min(95, healthScore))
  
  let report = `🔬 **AI Health Assessment Report**\n`
  report += `━━━━━━━━━━━━━━━━━━━━━━\n\n`
  
  report += `📊 **Analysis Metrics:**\n`
  report += `• Sentiment Score: ${sentiment.score.toFixed(2)}\n`
  report += `• Emotional State: ${sentiment.sentiment}\n`
  report += `• Analysis Confidence: ${(sentiment.confidence * 100).toFixed(0)}%\n`
  report += `• Words Analyzed: ${sentiment.details.wordCount}\n\n`
  
  report += `🔍 **Entity Detection:**\n`
  report += `• Body Parts Mentioned: ${entities.bodyParts.length > 0 ? entities.bodyParts.join(', ') : 'None detected'}\n`
  report += `• Symptoms Mentioned: ${entities.symptoms.length > 0 ? entities.symptoms.join(', ') : 'None detected'}\n`
  report += `• Severity Indicators: ${entities.severity.length > 0 ? entities.severity.join(', ') : 'None detected'}\n`
  report += `• Time References: ${entities.durations.length > 0 ? entities.durations.join(', ') : 'None detected'}\n\n`
  
  report += `📋 **Recommendations:**\n`
  
  if (sentiment.urgency === 'high') {
    report += `• ⚠️ Your message indicates distress - consider speaking with a healthcare provider\n`
  } else if (sentiment.urgency === 'medium') {
    report += `• Monitor your symptoms and consult a doctor if they persist\n`
  } else {
    report += `• Continue with general wellness practices\n`
  }
  
  report += `• Regular check-ups are recommended\n`
  report += `• Maintain a healthy lifestyle\n`
  
  // Build risk factors
  const riskFactors = []
  if (sentiment.sentiment === 'negative') riskFactors.push('Emotional distress detected')
  if (entities.symptoms.length > 2) riskFactors.push('Multiple symptoms reported')
  if (entities.severity.some(s => s.includes('severe'))) riskFactors.push('Severe symptoms indicated')
  if (overallUrgency.level === 'high' || overallUrgency.level === 'critical') riskFactors.push('High urgency level')
  
  // Build recommendations
  const recommendations = [
    'Maintain regular sleep schedule (7-9 hours)',
    'Stay hydrated (8 glasses of water daily)',
    'Regular physical activity (30 min/day)',
    'Balanced diet with fruits and vegetables',
    'Manage stress through relaxation techniques'
  ]
  
  return {
    message: report,
    healthReport: {
      overallScore: healthScore,
      riskFactors: riskFactors,
      recommendations: recommendations
    },
    mlAnalysis: {
      confidence: sentiment.confidence,
      urgencyLevel: overallUrgency.level || 'low',
      sentiment: {
        label: sentiment.sentiment,
        score: sentiment.score
      },
      entities: entities
    },
    actions: [
      { label: '🩺 Describe Symptoms', type: 'message', message: 'Let me describe my symptoms in detail' },
      { label: '📅 Book Check-up', type: 'navigate', path: '/doctors', variant: 'primary' },
      { label: '❓ Ask a Question', type: 'message', message: 'I have a health question' }
    ]
  }
}

// Main AI response function
export async function getAIResponse(input, context, doctors) {
  // Simulate AI processing with realistic delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 500))
  
  // Check for emergencies first
  const lowerInput = input.toLowerCase()
  for (const keyword of EMERGENCY_KEYWORDS) {
    if (lowerInput.includes(keyword)) {
      return generateEmergencyResponse({ diagnosis: 'emergency' })
    }
  }
  
  // Perform ML analysis
  const mlAnalysis = performMLAnalysis(input)
  
  // Detect intent
  const intent = detectIntent(input, mlAnalysis)
  
  // Handle different intents
  switch (intent) {
    case 'greeting':
      return {
        message: "Hello! 👋 I'm **MediFlow AI**, powered by advanced machine learning to help you understand your health better.\n\nI can:\n• 🔬 Analyze your symptoms using AI\n• 📊 Provide health assessments\n• 👨‍⚕️ Recommend specialists\n• 📅 Help you book appointments\n\nHow can I assist you today?",
        actions: QUICK_ACTIONS
      }
    
    case 'farewell':
      return {
        message: "Take care! 💙 Remember:\n\n• Monitor your symptoms\n• Don't hesitate to seek medical help if needed\n• Stay healthy!\n\nFeel free to return anytime for another health assessment.",
        actions: [
          { label: '📅 Book Appointment', type: 'navigate', path: '/doctors', variant: 'primary' },
          { label: '🏠 Go Home', type: 'navigate', path: '/' }
        ]
      }
    
    case 'help':
      return {
        message: "🤖 **MediFlow AI Capabilities**\n\nI use advanced machine learning to:\n\n**1. Symptom Analysis**\n• Natural Language Processing (NLP) to understand your symptoms\n• Pattern matching with medical knowledge base\n• Severity assessment\n\n**2. Intelligent Diagnosis**\n• TF-IDF similarity matching with symptom database\n• Rule-based diagnosis suggestions\n• Confidence scoring\n\n**3. Sentiment Analysis**\n• Understand your emotional state\n• Detect urgency in your messages\n• Personalize responses\n\n**4. Recommendations**\n• Specialist suggestions\n• Self-care tips\n• When to seek emergency care\n\n⚠️ **Disclaimer**: I provide guidance only. Always consult a real doctor for medical decisions.",
        actions: QUICK_ACTIONS
      }
    
    case 'booking':
      return {
        message: "I'd be happy to help you book an appointment! 📅\n\nBased on your needs, which specialist would you like to see?",
        actions: [
          { label: '👨‍⚕️ General Physician', type: 'book', speciality: 'General physician', variant: 'primary' },
          { label: '🧠 Neurologist', type: 'book', speciality: 'Neurologist' },
          { label: '❤️ Cardiologist', type: 'book', speciality: 'Cardiologist' },
          { label: '🦴 Dermatologist', type: 'book', speciality: 'Dermatologist' },
          { label: '👩‍⚕️ Gynecologist', type: 'book', speciality: 'Gynecologist' },
          { label: '📋 View All', type: 'navigate', path: '/doctors' }
        ]
      }
    
    case 'medication':
      return {
        message: "I can provide general medication information, but please note:\n\n⚠️ **Important Disclaimer**\n• I cannot prescribe medications\n• Only licensed doctors can prescribe medicine\n• Never self-medicate with prescription drugs\n\n**For medication needs:**\n• Consult your doctor for prescriptions\n• Ask pharmacists about OTC options\n• Always read medication labels\n\nWould you like me to help you find a doctor instead?",
        actions: [
          { label: '👨‍⚕️ Find a Doctor', type: 'navigate', path: '/doctors', variant: 'primary' },
          { label: '🩺 Check Symptoms First', type: 'message', message: 'I want to check my symptoms' }
        ]
      }
    
    case 'find_specialist':
      return {
        message: "Let me help you find the right specialist! 🔍\n\nTo give you the best recommendation, you can:\n\n1. **Describe your symptoms** - I'll analyze them and suggest specialists\n2. **Browse by speciality** - Choose from our categories below",
        actions: [
          { label: '🩺 Describe Symptoms', type: 'message', message: 'Let me describe my symptoms', variant: 'primary' },
          { label: '👨‍⚕️ General Physician', type: 'book', speciality: 'General physician' },
          { label: '👶 Pediatrician', type: 'book', speciality: 'Pediatricians' },
          { label: '👩‍⚕️ Gynecologist', type: 'book', speciality: 'Gynecologist' },
          { label: '🧠 Neurologist', type: 'book', speciality: 'Neurologist' },
          { label: '📋 All Specialists', type: 'navigate', path: '/doctors' }
        ]
      }
    
    case 'covid':
      return {
        message: "**COVID-19 Information:**\n\n**Common Symptoms:**\n• Fever or chills\n• Cough, shortness of breath\n• Loss of taste or smell\n• Fatigue, body aches\n\n**What to do:**\n1. Get tested if symptomatic\n2. Isolate if positive\n3. Monitor symptoms closely\n4. Stay hydrated and rest\n\n**Seek emergency care if:**\n• Difficulty breathing\n• Persistent chest pain\n• Confusion\n• Bluish lips or face",
        warning: 'If you have severe symptoms, seek emergency medical care immediately.',
        actions: [
          { label: '🩺 I Have Symptoms', type: 'message', message: 'I have COVID-like symptoms with fever and cough' },
          { label: '👨‍⚕️ See a Doctor', type: 'book', speciality: 'General physician', variant: 'primary' }
        ]
      }
    
    case 'health_scan':
      return generateHealthScanReport(mlAnalysis)
    
    case 'symptom_analysis':
      return generateMLResponse(mlAnalysis, doctors, context)
    
    default:
      // For general queries, still try to extract any health-related content
      if (mlAnalysis.entities.symptoms.length > 0 || mlAnalysis.entities.bodyParts.length > 0) {
        return generateMLResponse(mlAnalysis, doctors, context)
      }
      
      return {
        message: "I'm here to help with your health concerns! You can:\n\n• **Describe symptoms** for AI-powered analysis\n• **Ask health questions** for information\n• **Find specialists** for your needs\n• **Book appointments** with doctors\n\nWhat would you like help with?",
        actions: QUICK_ACTIONS
      }
  }
}

export default {
  getAIResponse,
  QUICK_ACTIONS
}

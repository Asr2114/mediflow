/**
 * MediFlow ML Engine
 * Advanced Machine Learning utilities for healthcare AI assistant
 * Includes: NLP, TF-IDF, Sentiment Analysis, Entity Extraction
 */

// ============================================
// TEXT PREPROCESSING & NLP UTILITIES
// ============================================

// Medical stopwords to filter
const MEDICAL_STOPWORDS = [
  'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'you', 'your', 'he', 'she',
  'it', 'its', 'they', 'them', 'what', 'which', 'who', 'whom', 'this', 'that',
  'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
  'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might',
  'must', 'can', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as',
  'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'into', 'through',
  'during', 'before', 'after', 'to', 'from', 'up', 'down', 'in', 'out', 'on',
  'off', 'over', 'under', 'again', 'then', 'once', 'here', 'there', 'when',
  'where', 'why', 'how', 'all', 'each', 'few', 'more', 'most', 'other', 'some',
  'such', 'no', 'nor', 'not', 'only', 'same', 'so', 'than', 'too', 'very',
  'just', 'also', 'now', 'really', 'please', 'help', 'need', 'want', 'got',
  'getting', 'going', 'having', 'feeling', 'feel', 'think', 'know', 'like'
]

// Tokenize text into words
export function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s'-]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 1)
}

// Remove stopwords
export function removeStopwords(tokens) {
  return tokens.filter(token => !MEDICAL_STOPWORDS.includes(token))
}

// Simple stemmer (Porter-like)
export function stem(word) {
  // Common medical suffix rules
  const suffixes = [
    { suffix: 'aches', replace: 'ache' },
    { suffix: 'aching', replace: 'ache' },
    { suffix: 'pains', replace: 'pain' },
    { suffix: 'painful', replace: 'pain' },
    { suffix: 'ing', replace: '' },
    { suffix: 'ness', replace: '' },
    { suffix: 'ment', replace: '' },
    { suffix: 'tion', replace: '' },
    { suffix: 'sion', replace: '' },
    { suffix: 'ity', replace: '' },
    { suffix: 'ies', replace: 'y' },
    { suffix: 'es', replace: '' },
    { suffix: 'ed', replace: '' },
    { suffix: 's', replace: '' },
    { suffix: 'ly', replace: '' }
  ]

  for (const { suffix, replace } of suffixes) {
    if (word.endsWith(suffix) && word.length > suffix.length + 2) {
      return word.slice(0, -suffix.length) + replace
    }
  }
  return word
}

// Preprocess text for NLP
export function preprocessText(text) {
  const tokens = tokenize(text)
  const filtered = removeStopwords(tokens)
  const stemmed = filtered.map(stem)
  return { tokens, filtered, stemmed, original: text }
}

// ============================================
// TF-IDF IMPLEMENTATION
// ============================================

class TFIDF {
  constructor() {
    this.documents = []
    this.vocabulary = new Set()
    this.idf = {}
  }

  // Add document to corpus
  addDocument(doc, label) {
    const processed = preprocessText(doc)
    this.documents.push({ 
      tokens: processed.stemmed, 
      label,
      original: doc 
    })
    processed.stemmed.forEach(token => this.vocabulary.add(token))
  }

  // Calculate IDF for all terms
  calculateIDF() {
    const N = this.documents.length
    this.vocabulary.forEach(term => {
      const docsWithTerm = this.documents.filter(doc => 
        doc.tokens.includes(term)
      ).length
      this.idf[term] = Math.log((N + 1) / (docsWithTerm + 1)) + 1
    })
  }

  // Get TF-IDF vector for a document
  getTFIDFVector(tokens) {
    const tf = {}
    const totalTerms = tokens.length
    
    tokens.forEach(token => {
      tf[token] = (tf[token] || 0) + 1
    })

    const vector = {}
    Object.keys(tf).forEach(term => {
      const termFreq = tf[term] / totalTerms
      const idfValue = this.idf[term] || Math.log(this.documents.length + 1)
      vector[term] = termFreq * idfValue
    })

    return vector
  }

  // Calculate cosine similarity between two vectors
  cosineSimilarity(vec1, vec2) {
    const allTerms = new Set([...Object.keys(vec1), ...Object.keys(vec2)])
    
    let dotProduct = 0
    let norm1 = 0
    let norm2 = 0

    allTerms.forEach(term => {
      const v1 = vec1[term] || 0
      const v2 = vec2[term] || 0
      dotProduct += v1 * v2
      norm1 += v1 * v1
      norm2 += v2 * v2
    })

    if (norm1 === 0 || norm2 === 0) return 0
    return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2))
  }

  // Find most similar documents
  findSimilar(query, topK = 5) {
    const processed = preprocessText(query)
    const queryVector = this.getTFIDFVector(processed.stemmed)

    const similarities = this.documents.map((doc, idx) => {
      const docVector = this.getTFIDFVector(doc.tokens)
      return {
        index: idx,
        label: doc.label,
        original: doc.original,
        similarity: this.cosineSimilarity(queryVector, docVector)
      }
    })

    return similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK)
      .filter(item => item.similarity > 0.1)
  }
}

// ============================================
// SENTIMENT ANALYSIS
// ============================================

const SENTIMENT_LEXICON = {
  // Positive words
  positive: {
    'better': 2, 'good': 2, 'great': 3, 'improved': 2, 'improving': 2,
    'fine': 1, 'okay': 1, 'alright': 1, 'comfortable': 2, 'relieved': 2,
    'happy': 2, 'glad': 2, 'thankful': 2, 'hopeful': 2, 'optimistic': 2
  },
  // Negative words
  negative: {
    'bad': -2, 'worse': -3, 'worst': -4, 'terrible': -4, 'horrible': -4,
    'awful': -4, 'severe': -3, 'intense': -2, 'unbearable': -4, 'excruciating': -4,
    'painful': -2, 'hurts': -2, 'ache': -1, 'aching': -2, 'throbbing': -2,
    'sharp': -2, 'burning': -2, 'stabbing': -3, 'constant': -1, 'persistent': -2,
    'chronic': -2, 'acute': -2, 'worried': -2, 'anxious': -2, 'scared': -3,
    'frightened': -3, 'nervous': -2, 'stressed': -2, 'depressed': -3, 'sad': -2,
    'tired': -1, 'exhausted': -3, 'weak': -2, 'dizzy': -2, 'nauseous': -2,
    'sick': -2, 'ill': -2, 'suffering': -3, 'struggling': -2, 'difficult': -2
  },
  // Intensity modifiers
  intensifiers: {
    'very': 1.5, 'really': 1.5, 'extremely': 2, 'incredibly': 2,
    'absolutely': 2, 'completely': 1.5, 'totally': 1.5, 'so': 1.3,
    'quite': 1.2, 'fairly': 1.1, 'slightly': 0.5, 'somewhat': 0.7,
    'a bit': 0.5, 'a little': 0.5, 'mildly': 0.6, 'moderately': 1
  },
  // Negators
  negators: ['not', "don't", "doesn't", "didn't", "won't", "can't", "cannot", 'never', 'no']
}

export function analyzeSentiment(text) {
  const tokens = tokenize(text)
  let score = 0
  let positiveCount = 0
  let negativeCount = 0
  let isNegated = false
  let intensifier = 1

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    const prevToken = i > 0 ? tokens[i - 1] : ''
    const prevPrevToken = i > 1 ? tokens[i - 2] : ''

    // Check for negation
    if (SENTIMENT_LEXICON.negators.includes(prevToken) || 
        SENTIMENT_LEXICON.negators.includes(prevPrevToken)) {
      isNegated = true
    }

    // Check for intensifier
    if (SENTIMENT_LEXICON.intensifiers[prevToken]) {
      intensifier = SENTIMENT_LEXICON.intensifiers[prevToken]
    }

    // Calculate sentiment
    if (SENTIMENT_LEXICON.positive[token]) {
      let wordScore = SENTIMENT_LEXICON.positive[token] * intensifier
      if (isNegated) wordScore *= -0.5
      score += wordScore
      positiveCount++
    } else if (SENTIMENT_LEXICON.negative[token]) {
      let wordScore = SENTIMENT_LEXICON.negative[token] * intensifier
      if (isNegated) wordScore *= -0.5
      score += wordScore
      negativeCount++
    }

    // Reset modifiers
    if (!SENTIMENT_LEXICON.negators.includes(token)) {
      isNegated = false
    }
    if (!SENTIMENT_LEXICON.intensifiers[token]) {
      intensifier = 1
    }
  }

  // Normalize score
  const wordCount = positiveCount + negativeCount
  const normalizedScore = wordCount > 0 ? score / wordCount : 0

  // Determine sentiment category
  let sentiment
  let confidence
  if (normalizedScore > 1) {
    sentiment = 'positive'
    confidence = Math.min(normalizedScore / 3, 1)
  } else if (normalizedScore < -1) {
    sentiment = 'negative'
    confidence = Math.min(Math.abs(normalizedScore) / 3, 1)
  } else {
    sentiment = 'neutral'
    confidence = 1 - Math.abs(normalizedScore)
  }

  // Determine urgency based on negative intensity
  let urgency = 'low'
  if (normalizedScore < -2) urgency = 'high'
  else if (normalizedScore < -1) urgency = 'medium'

  return {
    score: normalizedScore,
    sentiment,
    confidence,
    urgency,
    positiveCount,
    negativeCount,
    details: {
      rawScore: score,
      wordCount: tokens.length,
      sentimentWordCount: wordCount
    }
  }
}

// ============================================
// MEDICAL ENTITY EXTRACTION (NER-like)
// ============================================

const MEDICAL_ENTITIES = {
  // Body parts
  bodyParts: [
    'head', 'neck', 'throat', 'chest', 'back', 'stomach', 'abdomen', 'belly',
    'arm', 'arms', 'leg', 'legs', 'hand', 'hands', 'foot', 'feet', 'finger',
    'fingers', 'toe', 'toes', 'knee', 'knees', 'ankle', 'ankles', 'wrist',
    'wrists', 'elbow', 'elbows', 'shoulder', 'shoulders', 'hip', 'hips',
    'eye', 'eyes', 'ear', 'ears', 'nose', 'mouth', 'tongue', 'tooth', 'teeth',
    'jaw', 'face', 'skin', 'heart', 'lungs', 'liver', 'kidney', 'kidneys',
    'brain', 'spine', 'joint', 'joints', 'muscle', 'muscles', 'bone', 'bones',
    'nerve', 'nerves', 'blood', 'vein', 'veins', 'artery', 'arteries'
  ],
  // Symptoms
  symptoms: [
    'pain', 'ache', 'aching', 'hurt', 'hurting', 'sore', 'soreness',
    'swelling', 'swollen', 'inflammation', 'redness', 'itching', 'itchy',
    'burning', 'tingling', 'numbness', 'stiffness', 'weakness', 'fatigue',
    'tiredness', 'exhaustion', 'dizziness', 'lightheadedness', 'vertigo',
    'nausea', 'vomiting', 'diarrhea', 'constipation', 'bloating',
    'fever', 'chills', 'sweating', 'cough', 'coughing', 'sneezing',
    'congestion', 'runny', 'discharge', 'bleeding', 'bruising',
    'headache', 'migraine', 'cramps', 'spasms', 'tremors', 'shaking',
    'rash', 'hives', 'bumps', 'spots', 'blisters', 'ulcers',
    'shortness', 'breathlessness', 'wheezing', 'palpitations',
    'insomnia', 'anxiety', 'depression', 'stress', 'confusion'
  ],
  // Durations
  durations: [
    'minutes', 'hours', 'days', 'weeks', 'months', 'years',
    'today', 'yesterday', 'morning', 'afternoon', 'evening', 'night',
    'constantly', 'intermittently', 'occasionally', 'frequently',
    'suddenly', 'gradually', 'recently', 'always', 'sometimes'
  ],
  // Severity indicators
  severity: [
    'mild', 'moderate', 'severe', 'extreme', 'intense', 'slight',
    'minor', 'major', 'acute', 'chronic', 'persistent', 'constant',
    'unbearable', 'excruciating', 'tolerable', 'manageable'
  ],
  // Medical conditions
  conditions: [
    'diabetes', 'hypertension', 'asthma', 'arthritis', 'allergy', 'allergies',
    'infection', 'virus', 'bacteria', 'cancer', 'tumor', 'fracture',
    'sprain', 'strain', 'flu', 'cold', 'covid', 'coronavirus', 'pneumonia',
    'bronchitis', 'sinusitis', 'gastritis', 'ulcer', 'hernia', 'appendicitis',
    'migraine', 'epilepsy', 'stroke', 'heart attack', 'anemia', 'thyroid'
  ]
}

export function extractMedicalEntities(text) {
  const lowerText = text.toLowerCase()
  const tokens = tokenize(text)
  const entities = {
    bodyParts: [],
    symptoms: [],
    durations: [],
    severity: [],
    conditions: [],
    numbers: []
  }

  // Extract body parts
  MEDICAL_ENTITIES.bodyParts.forEach(part => {
    if (lowerText.includes(part)) {
      entities.bodyParts.push(part)
    }
  })

  // Extract symptoms
  MEDICAL_ENTITIES.symptoms.forEach(symptom => {
    if (lowerText.includes(symptom)) {
      entities.symptoms.push(symptom)
    }
  })

  // Extract durations
  MEDICAL_ENTITIES.durations.forEach(duration => {
    if (lowerText.includes(duration)) {
      entities.durations.push(duration)
    }
  })

  // Extract severity
  MEDICAL_ENTITIES.severity.forEach(sev => {
    if (lowerText.includes(sev)) {
      entities.severity.push(sev)
    }
  })

  // Extract conditions
  MEDICAL_ENTITIES.conditions.forEach(condition => {
    if (lowerText.includes(condition)) {
      entities.conditions.push(condition)
    }
  })

  // Extract numbers (for duration, temperature, etc.)
  const numberPattern = /\b(\d+\.?\d*)\s*(degrees?|°|days?|weeks?|months?|years?|hours?|minutes?|mg|ml|times?|pills?)?\b/gi
  let match
  while ((match = numberPattern.exec(text)) !== null) {
    entities.numbers.push({
      value: parseFloat(match[1]),
      unit: match[2] || null,
      original: match[0]
    })
  }

  return entities
}

// ============================================
// SYMPTOM PATTERN MATCHING
// ============================================

const SYMPTOM_PATTERNS = [
  // Headache patterns
  {
    pattern: /(headache|head\s*ache|head\s*pain|migraine|head\s*hurts?)/i,
    symptom: 'headache',
    category: 'neurological'
  },
  // Stomach patterns
  {
    pattern: /(stomach\s*ache|stomach\s*pain|belly\s*ache|abdominal\s*pain|tummy\s*ache)/i,
    symptom: 'stomach_pain',
    category: 'gastrointestinal'
  },
  // Chest patterns
  {
    pattern: /(chest\s*pain|chest\s*tight|chest\s*pressure|heart\s*pain)/i,
    symptom: 'chest_pain',
    category: 'cardiovascular'
  },
  // Breathing patterns
  {
    pattern: /(can'?t\s*breathe|short(ness)?\s*(of)?\s*breath|breathing\s*(problem|difficult|trouble)|breathless|wheezing)/i,
    symptom: 'breathing_difficulty',
    category: 'respiratory'
  },
  // Fever patterns
  {
    pattern: /(fever|high\s*temperature|feel(ing)?\s*hot|chills|shivering)/i,
    symptom: 'fever',
    category: 'general'
  },
  // Cough patterns
  {
    pattern: /(cough(ing)?|dry\s*cough|wet\s*cough|persistent\s*cough)/i,
    symptom: 'cough',
    category: 'respiratory'
  },
  // Nausea patterns
  {
    pattern: /(nause(a|ous)|feel(ing)?\s*sick|want\s*to\s*vomit|throw(ing)?\s*up|vomit(ing)?)/i,
    symptom: 'nausea',
    category: 'gastrointestinal'
  },
  // Dizziness patterns
  {
    pattern: /(dizz(y|iness)|lightheaded|vertigo|room\s*spinning|balance\s*problem)/i,
    symptom: 'dizziness',
    category: 'neurological'
  },
  // Fatigue patterns
  {
    pattern: /(tired|fatigue(d)?|exhaust(ed|ion)|no\s*energy|weak(ness)?|lethargy)/i,
    symptom: 'fatigue',
    category: 'general'
  },
  // Back pain patterns
  {
    pattern: /(back\s*pain|back\s*ache|lower\s*back|upper\s*back|spine\s*pain)/i,
    symptom: 'back_pain',
    category: 'musculoskeletal'
  },
  // Joint pain patterns
  {
    pattern: /(joint\s*pain|knee\s*pain|ankle\s*pain|wrist\s*pain|shoulder\s*pain|elbow\s*pain)/i,
    symptom: 'joint_pain',
    category: 'musculoskeletal'
  },
  // Skin patterns
  {
    pattern: /(rash|skin\s*rash|itch(y|ing)?|hives|skin\s*(irritation|problem)|bumps?)/i,
    symptom: 'skin_issue',
    category: 'dermatological'
  },
  // Throat patterns
  {
    pattern: /(sore\s*throat|throat\s*pain|throat\s*hurts?|difficulty\s*swallowing|strep)/i,
    symptom: 'sore_throat',
    category: 'ent'
  },
  // Eye patterns
  {
    pattern: /(eye\s*pain|red\s*eye|blurry\s*vision|vision\s*problem|eye\s*irritation)/i,
    symptom: 'eye_problem',
    category: 'ophthalmological'
  },
  // Ear patterns
  {
    pattern: /(ear\s*ache|ear\s*pain|hearing\s*(loss|problem)|ringing\s*(in\s*)?ear)/i,
    symptom: 'ear_problem',
    category: 'ent'
  },
  // Mental health patterns
  {
    pattern: /(anxious|anxiety|panic|worried|nervous|stressed|stress)/i,
    symptom: 'anxiety',
    category: 'mental_health'
  },
  {
    pattern: /(depress(ed|ion)|sad|hopeless|no\s*motivation|feel(ing)?\s*down)/i,
    symptom: 'depression',
    category: 'mental_health'
  },
  // Heart patterns
  {
    pattern: /(palpitation|heart\s*racing|heart\s*pounding|irregular\s*heartbeat|fast\s*heart)/i,
    symptom: 'palpitations',
    category: 'cardiovascular'
  }
]

export function matchSymptomPatterns(text) {
  const matches = []
  
  SYMPTOM_PATTERNS.forEach(({ pattern, symptom, category }) => {
    if (pattern.test(text)) {
      matches.push({ symptom, category, confidence: 0.9 })
    }
  })

  return matches
}

// ============================================
// DIAGNOSIS DECISION TREE
// ============================================

const DIAGNOSIS_RULES = {
  // Rule: headache + fever + stiff neck = possible meningitis (urgent)
  meningitis: {
    required: ['headache', 'fever'],
    optional: ['stiff neck', 'confusion', 'sensitivity to light'],
    minMatch: 2,
    severity: 'critical',
    specialist: 'Neurologist',
    action: 'emergency'
  },
  // Rule: chest pain + shortness of breath = possible heart issue (urgent)
  cardiac_emergency: {
    required: ['chest_pain'],
    optional: ['breathing_difficulty', 'arm pain', 'sweating', 'nausea'],
    minMatch: 2,
    severity: 'critical',
    specialist: 'Cardiologist',
    action: 'emergency'
  },
  // Rule: fever + cough + fatigue = possible flu/covid
  respiratory_infection: {
    required: ['fever', 'cough'],
    optional: ['fatigue', 'body aches', 'sore_throat', 'headache'],
    minMatch: 2,
    severity: 'moderate',
    specialist: 'General physician',
    action: 'consult'
  },
  // Rule: stomach pain + nausea + fever = possible appendicitis
  appendicitis: {
    required: ['stomach_pain'],
    optional: ['nausea', 'fever', 'loss of appetite'],
    minMatch: 2,
    severity: 'high',
    specialist: 'General physician',
    action: 'urgent_consult'
  },
  // Rule: headache + dizziness + nausea = migraine
  migraine: {
    required: ['headache'],
    optional: ['dizziness', 'nausea', 'sensitivity to light', 'vision changes'],
    minMatch: 2,
    severity: 'moderate',
    specialist: 'Neurologist',
    action: 'consult'
  },
  // Rule: joint pain + swelling + stiffness = arthritis
  arthritis: {
    required: ['joint_pain'],
    optional: ['swelling', 'stiffness', 'redness', 'warmth'],
    minMatch: 2,
    severity: 'moderate',
    specialist: 'Rheumatologist',
    action: 'consult'
  },
  // Rule: anxiety + palpitations + breathing difficulty = panic attack
  panic_attack: {
    required: ['anxiety'],
    optional: ['palpitations', 'breathing_difficulty', 'dizziness', 'sweating'],
    minMatch: 2,
    severity: 'moderate',
    specialist: 'Psychiatrist',
    action: 'consult'
  }
}

export function runDiagnosisRules(symptoms) {
  const matches = []
  const symptomSet = new Set(symptoms.map(s => s.symptom || s))

  Object.entries(DIAGNOSIS_RULES).forEach(([diagnosis, rule]) => {
    // Check required symptoms
    const hasRequired = rule.required.every(req => 
      symptoms.some(s => (s.symptom || s).includes(req) || req.includes(s.symptom || s))
    )

    if (!hasRequired) return

    // Count optional symptoms
    const optionalMatches = rule.optional.filter(opt =>
      symptoms.some(s => (s.symptom || s).includes(opt) || opt.includes(s.symptom || s))
    ).length

    const totalMatches = rule.required.length + optionalMatches

    if (totalMatches >= rule.minMatch) {
      matches.push({
        diagnosis,
        confidence: Math.min(totalMatches / (rule.required.length + rule.optional.length), 1),
        severity: rule.severity,
        specialist: rule.specialist,
        action: rule.action,
        matchedSymptoms: totalMatches
      })
    }
  })

  return matches.sort((a, b) => b.confidence - a.confidence)
}

// ============================================
// EXPORT TF-IDF INSTANCE FOR SYMPTOMS
// ============================================

// Pre-trained symptom corpus
const symptomCorpus = [
  { text: 'I have a severe headache and feel nauseous', label: 'migraine' },
  { text: 'My head hurts and I see spots', label: 'migraine' },
  { text: 'Throbbing pain in my head with light sensitivity', label: 'migraine' },
  { text: 'I have chest pain and difficulty breathing', label: 'cardiac' },
  { text: 'Pressure in my chest and pain in left arm', label: 'cardiac' },
  { text: 'My heart is racing and I feel anxious', label: 'anxiety' },
  { text: 'I have fever and cough for three days', label: 'respiratory_infection' },
  { text: 'High temperature with body aches and fatigue', label: 'flu' },
  { text: 'Stomach pain and nausea after eating', label: 'gastritis' },
  { text: 'Sharp pain in lower right abdomen', label: 'appendicitis' },
  { text: 'Joint pain and swelling in my knees', label: 'arthritis' },
  { text: 'Back pain that radiates down my leg', label: 'sciatica' },
  { text: 'Itchy red rash on my arms', label: 'skin_allergy' },
  { text: 'Sore throat and difficulty swallowing', label: 'pharyngitis' },
  { text: 'Ear pain and reduced hearing', label: 'ear_infection' },
  { text: 'Feeling sad and hopeless for weeks', label: 'depression' },
  { text: 'Constant worry and panic attacks', label: 'anxiety_disorder' },
  { text: 'Dizzy and lightheaded when standing', label: 'orthostatic_hypotension' },
  { text: 'Blurry vision and eye pain', label: 'eye_problem' },
  { text: 'Frequent urination and burning sensation', label: 'uti' }
]

export const symptomTFIDF = new TFIDF()

// Initialize corpus
symptomCorpus.forEach(item => {
  symptomTFIDF.addDocument(item.text, item.label)
})
symptomTFIDF.calculateIDF()

// ============================================
// MAIN ML ANALYSIS FUNCTION
// ============================================

export function performMLAnalysis(text) {
  // 1. Text preprocessing
  const processed = preprocessText(text)
  
  // 2. Sentiment analysis
  const sentiment = analyzeSentiment(text)
  
  // 3. Entity extraction
  const entities = extractMedicalEntities(text)
  
  // 4. Pattern matching
  const symptomMatches = matchSymptomPatterns(text)
  
  // 5. TF-IDF similarity
  const similarConditions = symptomTFIDF.findSimilar(text, 3)
  
  // 6. Diagnosis rules
  const diagnoses = runDiagnosisRules(symptomMatches)
  
  return {
    preprocessed: processed,
    sentiment,
    entities,
    symptomMatches,
    similarConditions,
    diagnoses,
    overallUrgency: calculateOverallUrgency(sentiment, diagnoses, entities)
  }
}

function calculateOverallUrgency(sentiment, diagnoses, entities) {
  let urgencyScore = 0

  // Sentiment urgency
  if (sentiment.urgency === 'high') urgencyScore += 3
  else if (sentiment.urgency === 'medium') urgencyScore += 2
  else urgencyScore += 1

  // Diagnosis severity
  if (diagnoses.length > 0) {
    const topDiagnosis = diagnoses[0]
    if (topDiagnosis.severity === 'critical') urgencyScore += 4
    else if (topDiagnosis.severity === 'high') urgencyScore += 3
    else if (topDiagnosis.severity === 'moderate') urgencyScore += 2
  }

  // Severity words in entities
  if (entities.severity.some(s => ['severe', 'extreme', 'intense', 'unbearable', 'excruciating'].includes(s))) {
    urgencyScore += 2
  }

  // Determine level
  if (urgencyScore >= 6) return { level: 'critical', score: urgencyScore, action: 'emergency' }
  if (urgencyScore >= 4) return { level: 'high', score: urgencyScore, action: 'urgent_consult' }
  if (urgencyScore >= 2) return { level: 'moderate', score: urgencyScore, action: 'consult' }
  return { level: 'low', score: urgencyScore, action: 'self_care' }
}

export default {
  preprocessText,
  analyzeSentiment,
  extractMedicalEntities,
  matchSymptomPatterns,
  runDiagnosisRules,
  performMLAnalysis,
  symptomTFIDF,
  TFIDF
}

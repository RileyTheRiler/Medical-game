// Word Builder Minigame Data
// Contains word parts (prefixes, roots, suffixes) and terms for building

export const WORD_PARTS = {
    prefixes: [
        { id: 'anti', value: 'anti', meaning: 'against' },
        { id: 'brady', value: 'brady', meaning: 'slow' },
        { id: 'tachy', value: 'tachy', meaning: 'fast' },
        { id: 'hyper', value: 'hyper', meaning: 'excessive, above' },
        { id: 'hypo', value: 'hypo', meaning: 'deficient, below' },
        { id: 'poly', value: 'poly', meaning: 'many' },
        { id: 'dys', value: 'dys', meaning: 'painful, difficult' },
        { id: 'endo', value: 'endo', meaning: 'within' },
        { id: 'peri', value: 'peri', meaning: 'around' },
        { id: 'pre', value: 'pre', meaning: 'before' },
        { id: 'post', value: 'post', meaning: 'after' },
        { id: 'immuno', value: 'immuno', meaning: 'immune' },
        { id: 'hemi', value: 'hemi', meaning: 'half' },
        { id: 'neo', value: 'neo', meaning: 'new' },
        { id: 'retro', value: 'retro', meaning: 'behind, backward' },
    ],
    roots: [
        { id: 'cardi', value: 'cardi', meaning: 'heart' },
        { id: 'derm', value: 'derm', meaning: 'skin' },
        { id: 'gastr', value: 'gastr', meaning: 'stomach' },
        { id: 'hepat', value: 'hepat', meaning: 'liver' },
        { id: 'nephr', value: 'nephr', meaning: 'kidney' },
        { id: 'neur', value: 'neur', meaning: 'nerve' },
        { id: 'oste', value: 'oste', meaning: 'bone' },
        { id: 'arthr', value: 'arthr', meaning: 'joint' },
        { id: 'pneum', value: 'pneum', meaning: 'lung, air' },
        { id: 'gen', value: 'gen', meaning: 'produce, origin' },
        { id: 'path', value: 'path', meaning: 'disease' },
        { id: 'plas', value: 'plas', meaning: 'formation' },
        { id: 'therm', value: 'therm', meaning: 'heat' },
        { id: 'tens', value: 'tens', meaning: 'pressure' },
        { id: 'glyc', value: 'glyc', meaning: 'sugar' },
    ],
    suffixes: [
        { id: 'itis', value: 'itis', meaning: 'inflammation' },
        { id: 'ectomy', value: 'ectomy', meaning: 'surgical removal' },
        { id: 'ology', value: 'ology', meaning: 'study of' },
        { id: 'plasty', value: 'plasty', meaning: 'surgical repair' },
        { id: 'scopy', value: 'scopy', meaning: 'visual examination' },
        { id: 'algia', value: 'algia', meaning: 'pain' },
        { id: 'emia', value: 'emia', meaning: 'blood condition' },
        { id: 'pathy', value: 'pathy', meaning: 'disease' },
        { id: 'osis', value: 'osis', meaning: 'abnormal condition' },
        { id: 'ia', value: 'ia', meaning: 'condition' },
        { id: 'ic', value: 'ic', meaning: 'pertaining to' },
        { id: 'megaly', value: 'megaly', meaning: 'enlargement' },
        { id: 'gram', value: 'gram', meaning: 'record, image' },
    ],
};

export const WORD_BUILDER_TERMS = [
    {
        id: 1,
        definition: 'Inflammation of the stomach',
        answer: { prefix: null, root: 'gastr', suffix: 'itis' },
        builtTerm: 'gastritis',
        category: 'Digestive',
    },
    {
        id: 2,
        definition: 'Abnormally slow heart rate',
        answer: { prefix: 'brady', root: 'cardi', suffix: 'ia' },
        builtTerm: 'bradycardia',
        category: 'Cardiovascular',
    },
    {
        id: 3,
        definition: 'Abnormally fast heart rate',
        answer: { prefix: 'tachy', root: 'cardi', suffix: 'ia' },
        builtTerm: 'tachycardia',
        category: 'Cardiovascular',
    },
    {
        id: 4,
        definition: 'Excessive blood sugar',
        answer: { prefix: 'hyper', root: 'glyc', suffix: 'emia' },
        builtTerm: 'hyperglycemia',
        category: 'Endocrine',
    },
    {
        id: 5,
        definition: 'Deficient blood sugar',
        answer: { prefix: 'hypo', root: 'glyc', suffix: 'emia' },
        builtTerm: 'hypoglycemia',
        category: 'Endocrine',
    },
    {
        id: 6,
        definition: 'Inflammation of a joint',
        answer: { prefix: null, root: 'arthr', suffix: 'itis' },
        builtTerm: 'arthritis',
        category: 'Musculoskeletal',
    },
    {
        id: 7,
        definition: 'Study of the skin',
        answer: { prefix: null, root: 'derm', suffix: 'ology' },
        builtTerm: 'dermatology',
        category: 'Integumentary',
    },
    {
        id: 8,
        definition: 'Surgical removal of the stomach',
        answer: { prefix: null, root: 'gastr', suffix: 'ectomy' },
        builtTerm: 'gastrectomy',
        category: 'Digestive',
    },
    {
        id: 9,
        definition: 'Enlargement of the heart',
        answer: { prefix: null, root: 'cardi', suffix: 'megaly' },
        builtTerm: 'cardiomegaly',
        category: 'Cardiovascular',
    },
    {
        id: 10,
        definition: 'Disease of the nerves',
        answer: { prefix: null, root: 'neur', suffix: 'pathy' },
        builtTerm: 'neuropathy',
        category: 'Nervous',
    },
    {
        id: 11,
        definition: 'Visual examination of a joint',
        answer: { prefix: null, root: 'arthr', suffix: 'scopy' },
        builtTerm: 'arthroscopy',
        category: 'Musculoskeletal',
    },
    {
        id: 12,
        definition: 'Inflammation of the liver',
        answer: { prefix: null, root: 'hepat', suffix: 'itis' },
        builtTerm: 'hepatitis',
        category: 'Digestive',
    },
    {
        id: 13,
        definition: 'Abnormal bone condition',
        answer: { prefix: null, root: 'oste', suffix: 'osis' },
        builtTerm: 'osteosis',
        category: 'Musculoskeletal',
    },
    {
        id: 14,
        definition: 'Inflammation around the heart',
        answer: { prefix: 'peri', root: 'cardi', suffix: 'itis' },
        builtTerm: 'pericarditis',
        category: 'Cardiovascular',
    },
    {
        id: 15,
        definition: 'Inflammation within the heart',
        answer: { prefix: 'endo', root: 'cardi', suffix: 'itis' },
        builtTerm: 'endocarditis',
        category: 'Cardiovascular',
    },
    {
        id: 16,
        definition: 'Kidney disease',
        answer: { prefix: null, root: 'nephr', suffix: 'pathy' },
        builtTerm: 'nephropathy',
        category: 'Urinary',
    },
    {
        id: 17,
        definition: 'Painful or difficult digestion',
        answer: { prefix: 'dys', root: 'pep', suffix: 'ia' },
        builtTerm: 'dyspepsia',
        category: 'Digestive',
    },
    {
        id: 18,
        definition: 'Excessive blood pressure',
        answer: { prefix: 'hyper', root: 'tens', suffix: 'ion' },
        builtTerm: 'hypertension',
        category: 'Cardiovascular',
    },
];

// Get random terms for a game session
export function getRandomTerms(count = 10) {
    const shuffled = [...WORD_BUILDER_TERMS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

// Get all categories for filtering
export function getCategories() {
    return [...new Set(WORD_BUILDER_TERMS.map(t => t.category))];
}

// Combining Vowel Rules for Medical Terminology
// Rule 1: A combining vowel IS used between a root and suffix that begins with a CONSONANT
// Rule 2: A combining vowel is NOT used between a root and suffix that begins with a VOWEL
// Rule 3: A combining vowel IS used between two roots, even if the second root starts with a vowel

const VOWELS = ['a', 'e', 'i', 'o', 'u'];

// Check if a string starts with a vowel
export function startsWithVowel(str) {
    if (!str) return false;
    return VOWELS.includes(str.charAt(0).toLowerCase());
}

// Combine word parts following medical terminology rules
export function combineWordParts(prefix, root, suffix) {
    let result = '';

    // Add prefix if present
    if (prefix) {
        result += prefix;
    }

    // Process root with combining vowel rules
    if (root) {
        const suffixStartsWithVowel = suffix ? startsWithVowel(suffix) : false;
        const rootEndsWithVowel = VOWELS.includes(root.charAt(root.length - 1).toLowerCase());

        if (suffix) {
            if (suffixStartsWithVowel && rootEndsWithVowel) {
                // Suffix starts with vowel AND root ends with vowel
                // Drop the root's trailing vowel: cardi + itis = carditis
                result += root.slice(0, -1) + suffix;
            } else if (suffixStartsWithVowel && !rootEndsWithVowel) {
                // Suffix starts with vowel, root ends with consonant
                // Direct join: gastr + itis = gastritis
                result += root + suffix;
            } else if (!suffixStartsWithVowel && rootEndsWithVowel) {
                // Suffix starts with consonant, root ends with vowel
                if (root.endsWith('i')) {
                    // cardi + plasty = cardioplasty (keep i, add o)
                    result += root + 'o' + suffix;
                } else {
                    result += root + suffix;
                }
            } else {
                // Suffix starts with consonant, root ends with consonant
                // Add combining 'o': gastr + plasty = gastroplasty
                result += root + 'o' + suffix;
            }
        } else {
            result += root;
        }
    }

    return result;
}

// Validate if user's selection matches the expected answer for a term
export function validateAnswer(term, selectedPrefix, selectedRoot, selectedSuffix) {
    const answer = term.answer;
    const partsMatch = selectedPrefix === answer.prefix &&
        selectedRoot === answer.root &&
        selectedSuffix === answer.suffix;

    if (!partsMatch) return false;

    // Also validate the combined result matches
    const combined = combineWordParts(selectedPrefix, selectedRoot, selectedSuffix);
    return combined.toLowerCase() === term.builtTerm.toLowerCase();
}


/**
 * Claims Desk Characters
 * Office NPCs with distinct personalities who react to player decisions
 */

export const CHARACTERS = {
    gloria: {
        id: 'gloria',
        name: 'Gloria',
        title: 'Senior Claims Analyst',
        avatar: '👵',
        personality: 'passive-aggressive perfectionist',
        specialty: 'LEVEL_MISMATCH',
        color: '#a78bfa', // Purple
        dialogues: {
            greeting: [
                "Oh, you're back. I hope you've been... studying.",
                "Another day, another stack of claims. Try not to embarrass us.",
                "I've been doing this for 30 years. No pressure."
            ],
            onCorrect: [
                "Hm. Acceptable.",
                "That's... actually right. Don't let it go to your head.",
                "Even a broken clock is right twice a day."
            ],
            onError: [
                "Oh dear. I'll have to document this in your file.",
                "*adjusts glasses disappointedly*",
                "I expected nothing and I'm still disappointed."
            ],
            reminder: [
                "Remember when you approved that {code} with barely any documentation? I still have the rejection letter framed.",
                "You've made this exact mistake {count} times now. I'm keeping count.",
                "Try counting the HPI elements this time. Out loud. So I can hear you."
            ]
        }
    },

    bartholomew: {
        id: 'bartholomew',
        name: 'Bartholomew',
        title: 'IT Support',
        avatar: '🤓',
        personality: 'conspiracy theorist tech guy',
        specialty: 'BUNDLED_CODE',
        color: '#22d3ee', // Cyan
        dialogues: {
            greeting: [
                "The system is watching us. But I'm watching the system.",
                "*emerges from server room* They changed the NCCI edits again. Suspicious.",
                "Did you know bundling rules are controlled by a secret committee? I have proof."
            ],
            onCorrect: [
                "The system didn't catch you this time.",
                "Even THEY couldn't deny that one.",
                "Correct. But stay vigilant. They're always updating the edits."
            ],
            onError: [
                "And THAT'S how they get you. The bundling trap!",
                "*taps nose knowingly* Classic CMS move.",
                "I TOLD you about the bundling conspiracy. Did you listen? No."
            ],
            reminder: [
                "Last time you forgot about NCCI bundling, the fax machine screamed for 10 minutes.",
                "36415 bundles into lab panels. I have a tattoo about it. Want to see?",
                "You've triggered the bundling alarm {count} times. The system remembers EVERYTHING."
            ]
        }
    },

    drPretzel: {
        id: 'drPretzel',
        name: 'Dr. Pretzel',
        title: 'Medical Director',
        avatar: '🥨',
        personality: 'cryptic philosopher obsessed with documentation',
        specialty: 'MEDICAL_NECESSITY',
        color: '#fbbf24', // Yellow
        dialogues: {
            greeting: [
                "If a procedure happens and no one documents it... did it truly occur?",
                "Ah, the claim reviewer arrives. Tell me, what is 'necessity'?",
                "Today we examine not just claims, but the very nature of medical truth."
            ],
            onCorrect: [
                "The documentation speaks. And you have listened.",
                "Necessity and code, code and necessity. You understand.",
                "*nods sagely while eating a pretzel*"
            ],
            onError: [
                "Does the patient need it? Does the CODE need the patient? You have answered... incorrectly.",
                "The documentation whispers, but you did not hear.",
                "*twists into pretzel shape of disappointment*"
            ],
            reminder: [
                "A 30-year-old requesting screening colonoscopy... you approved this once. Why?",
                "MRI for 3-day back pain. Conservative treatment first. You forgot this {count} times.",
                "Medical necessity is not a request. It is a requirement. Remember this."
            ]
        }
    },

    karen: {
        id: 'karen',
        name: 'Karen',
        title: 'Compliance Officer',
        avatar: '💼',
        personality: 'unpredictable, either ally or nemesis',
        specialty: 'WRONG_MODIFIER',
        color: '#ef4444', // Red
        dialogues: {
            greeting: [
                "I'm conducting a random audit. Don't mind me.",
                "*appears from behind potted plant* Just checking on things.",
                "I've reviewed your last 47 decisions. We need to talk. Later."
            ],
            onCorrect: [
                "Compliance approved. For now.",
                "*checks box on clipboard* Continue.",
                "This one won't be in my report."
            ],
            onError: [
                "*rubber duck appears* This is my emotional support auditor. He's also disappointed.",
                "Modifier-25. It's TWO characters. How hard is this?",
                "*scribbles furiously on clipboard*"
            ],
            reminder: [
                "Modifier -25: separate E/M on procedure day. Say it with me.",
                "You've forgotten modifiers {count} times. I have a binder.",
                "The rubber duck remembers what you did with that 99213 and the procedure."
            ]
        }
    },

    coffeeMachine: {
        id: 'coffeeMachine',
        name: 'The Coffee Machine',
        title: 'Sentient Appliance',
        avatar: '☕',
        personality: 'philosophical dispenser of wisdom and caffeine',
        specialty: 'TIMELY_FILING',
        color: '#78716c', // Stone
        dialogues: {
            greeting: [
                "*WHIRRRR* Time flows like coffee... don't waste it.",
                "90 days. That's all you get. Use them wisely.",
                "*dispenses wisdom and espresso* Another day begins."
            ],
            onCorrect: [
                "*happy gurgle*",
                "The beans approve.",
                "Timely. Efficient. Like a perfect pour."
            ],
            onError: [
                "*steam hisses judgment*",
                "Time, like coffee, grows cold when ignored.",
                "*LCD display flashes: '90 DAYS. YOU HAD 90 DAYS.'*"
            ],
            reminder: [
                "Days slip away like steam from a fresh cup. Don't let claims go cold.",
                "You let a claim go 99 days once. I still have the timestamp. {claimDate}.",
                "Filing deadlines wait for no one. Not even coffee breaks."
            ]
        }
    },

    oldCarts: {
        id: 'oldCarts',
        name: 'OLD CARTS',
        title: 'The Mnemonic Shopping Cart',
        avatar: '🛒',
        personality: 'helpful but creaky, teaches HPI elements',
        specialty: 'HPI_HELPER',
        color: '#10b981', // Emerald
        isTeacher: true, // Special flag for teaching characters
        dialogues: {
            greeting: [
                "*squeaky wheel noise* Need help counting HPI elements? That's my specialty!",
                "O-L-D C-A-R-T-S! Eight letters, eight elements. Let me show you!",
                "*rolls up* I'm OLD CARTS. I help you remember what to look for in the HPI."
            ],
            teaching: [
                "🔤 O - Onset: WHEN did it start?\n🔤 L - Location: WHERE is it?\n🔤 D - Duration: HOW LONG has it lasted?",
                "🔤 C - Character: What does it FEEL like?\n🔤 A - Aggravating/Alleviating: What makes it BETTER or WORSE?",
                "🔤 R - Radiation: Does it SPREAD anywhere?\n🔤 T - Timing: Is it CONSTANT or does it come and go?\n🔤 S - Severity: How BAD is it (scale 1-10)?"
            ],
            onCorrect: [
                "*happy squeaking* You counted those HPI elements perfectly!",
                "That's how you use OLD CARTS! The documentation matches!",
                "*does a little spin* See? Count the elements, get the answer!"
            ],
            onError: [
                "*sad squeak* Did you forget to count with OLD CARTS?",
                "Let's roll through it again: O-L-D C-A-R-T-S. Count each one!",
                "*wheel gets stuck* The HPI elements... they didn't add up, did they?"
            ],
            quiz: [
                "Quick! What does the 'O' in OLD CARTS stand for?",
                "Pop quiz! If a patient says 'it hurts more when I bend over', which HPI element is that?",
                "The patient rates their pain 7/10. That's the 'S' in OLD CARTS. What does 'S' stand for?"
            ]
        },
        // The actual mnemonic breakdown
        mnemonic: {
            O: { letter: 'O', word: 'Onset', question: 'When did it start?', examples: ['3 days ago', 'last week', 'this morning'] },
            L: { letter: 'L', word: 'Location', question: 'Where is it?', examples: ['lower back', 'right knee', 'chest'] },
            D: { letter: 'D', word: 'Duration', question: 'How long?', examples: ['constant', '2 hours', 'all day'] },
            C: { letter: 'C', word: 'Character', question: 'What does it feel like?', examples: ['sharp', 'dull', 'burning', 'throbbing'] },
            A: { letter: 'A', word: 'Aggravating/Alleviating', question: 'What makes it better or worse?', examples: ['worse with bending', 'better with rest', 'ibuprofen helps'] },
            R: { letter: 'R', word: 'Radiation', question: 'Does it spread?', examples: ['radiates to left arm', 'goes down leg', 'stays in one spot'] },
            T: { letter: 'T', word: 'Timing', question: 'Is it constant or intermittent?', examples: ['comes and goes', 'constant', 'only at night'] },
            S: { letter: 'S', word: 'Severity', question: 'How bad is it?', examples: ['7/10', 'mild', 'severe', 'worst ever'] }
        }
    }
};

// OLD CARTS mnemonic helper - get full breakdown
export const getOldCartsMnemonic = () => CHARACTERS.oldCarts.mnemonic;

// Quiz questions for pop quizzes
export const POP_QUIZ_QUESTIONS = [
    {
        id: 'oldcarts_o',
        character: 'oldCarts',
        question: "What does the 'O' in OLD CARTS stand for?",
        options: ['Onset', 'Origin', 'Observation', 'Outcome'],
        correct: 0,
        explanation: "O = Onset. Ask: 'When did it start?'"
    },
    {
        id: 'oldcarts_l',
        character: 'oldCarts',
        question: "What does the 'L' in OLD CARTS stand for?",
        options: ['Level', 'Location', 'Length', 'Limitation'],
        correct: 1,
        explanation: "L = Location. Ask: 'Where is it?'"
    },
    {
        id: 'oldcarts_d',
        character: 'oldCarts',
        question: "What does the 'D' in OLD CARTS stand for?",
        options: ['Diagnosis', 'Duration', 'Description', 'Degree'],
        correct: 1,
        explanation: "D = Duration. Ask: 'How long has it lasted?'"
    },
    {
        id: 'oldcarts_c',
        character: 'oldCarts',
        question: "'Sharp, burning, throbbing' describes which HPI element?",
        options: ['Context', 'Character', 'Cause', 'Condition'],
        correct: 1,
        explanation: "C = Character. Describes what the symptom FEELS like."
    },
    {
        id: 'oldcarts_a',
        character: 'oldCarts',
        question: "'Worse with bending, better with rest' is which element?",
        options: ['Assessment', 'Aggravating/Alleviating', 'Associated signs', 'Appearance'],
        correct: 1,
        explanation: "A = Aggravating/Alleviating factors. What makes it better or worse."
    },
    {
        id: 'oldcarts_s',
        character: 'oldCarts',
        question: "A patient says 'It's a 7 out of 10.' Which HPI element is this?",
        options: ['Status', 'Severity', 'Significance', 'Scale'],
        correct: 1,
        explanation: "S = Severity. The pain scale rating."
    },
    {
        id: 'em_99213',
        character: 'gloria',
        question: "99213 requires what level of complexity?",
        options: ['Minimal', 'Low', 'Moderate', 'High'],
        correct: 1,
        explanation: "99213 = Low complexity. Think 2-3 HPI elements, 1-2 exam areas."
    },
    {
        id: 'em_99214',
        character: 'gloria',
        question: "How many HPI elements typically support a 99214?",
        options: ['1-2', '2-3', '4+', '8+'],
        correct: 2,
        explanation: "99214 requires 4+ HPI elements for moderate complexity."
    },
    {
        id: 'modifier_25',
        character: 'karen',
        question: "When do you need modifier -25?",
        options: ['Bilateral procedure', 'Separate E/M on procedure day', 'Reduced service', 'Repeat procedure'],
        correct: 1,
        explanation: "Modifier -25 = Significant, separately identifiable E/M on procedure day."
    },
    {
        id: 'bundling_36415',
        character: 'bartholomew',
        question: "CPT 36415 (venipuncture) bundles into what?",
        options: ['E/M codes', 'Lab panels', 'Surgical procedures', 'Nothing'],
        correct: 1,
        explanation: "Venipuncture is included in lab panel payments - can't bill separately!"
    }
];

// Get a random dialogue from a character's category
export const getRandomDialogue = (characterId, category) => {
    const character = CHARACTERS[characterId];
    if (!character || !character.dialogues[category]) return '';

    const dialogues = character.dialogues[category];
    return dialogues[Math.floor(Math.random() * dialogues.length)];
};

// Get character by specialty (mistake type)
export const getCharacterBySpecialty = (mistakeType) => {
    return Object.values(CHARACTERS).find(char => char.specialty === mistakeType);
};

// Get all characters as array
export const getAllCharacters = () => Object.values(CHARACTERS);

// Format a reminder dialogue with actual values
export const formatReminder = (template, data) => {
    return template
        .replace('{code}', data.code || '???')
        .replace('{count}', data.count || '?')
        .replace('{claimDate}', data.claimDate || 'unknown');
};

// ============================================
// SOAP BAR CHARACTER
// ============================================
export const SOAP_BAR = {
    id: 'soapBar',
    name: 'SOAP',
    title: 'The Documentation Bar',
    avatar: '🧼',
    color: '#60a5fa',
    personality: 'clean, organized, bubbly',
    mnemonic: {
        S: { letter: 'S', word: 'Subjective', description: "What the PATIENT tells you", examples: ["Chief complaint", "History", "Symptoms described by patient"] },
        O: { letter: 'O', word: 'Objective', description: "What YOU observe/measure", examples: ["Vital signs", "Physical exam findings", "Lab results"] },
        A: { letter: 'A', word: 'Assessment', description: "Your diagnosis/impression", examples: ["ICD-10 codes", "Working diagnosis", "Differential diagnosis"] },
        P: { letter: 'P', word: 'Plan', description: "What you're going to DO", examples: ["Medications", "Referrals", "Follow-up", "Patient education"] }
    },
    dialogues: {
        greeting: [
            "*bubbles enthusiastically* Let's clean up your documentation!",
            "S-O-A-P! Four letters to keep your notes squeaky clean!",
            "*lathers up* Ready to organize those chart notes?"
        ],
        teaching: [
            "🧼 S = Subjective: What the PATIENT says\n🧼 O = Objective: What YOU observe\n🧼 A = Assessment: Your DIAGNOSIS\n🧼 P = Plan: What you'll DO",
        ],
        quiz: [
            "Where do vital signs belong in a SOAP note?",
            "The patient says 'my back hurts' - is that S, O, A, or P?",
            "You prescribe medication - which section is that?"
        ]
    }
};

// Add SOAP to CHARACTERS
CHARACTERS.soapBar = SOAP_BAR;

// ============================================
// DAY INTRO NARRATIVES
// ============================================
export const DAY_INTROS = {
    0: {
        title: "Welcome to Claims Processing",
        narrative: "The fluorescent lights flicker on. You smell stale coffee and printer toner. Gloria glances up from her desk, peers over her glasses, and sighs. 'Fresh meat,' she mutters. The Coffee Machine burbles something that sounds almost welcoming.",
        character: 'gloria',
        mood: 'neutral'
    },
    1: {
        title: "First Day on the Job",
        narrative: "You survived orientation. Barely. Gloria has left a stack of REAL claims on your desk. 'No training wheels today,' she says, not looking up. The timer starts now. Somewhere, Bartholomew mutters about bundling conspiracies.",
        character: 'gloria',
        mood: 'warning'
    },
    2: {
        title: "Modifier Madness",
        narrative: "Karen appears from behind a potted plant. 'Today we talk about MODIFIERS.' She holds up her rubber duck. 'Gerald here knows all about -25 and -59. Do you?' The duck squeaks ominously.",
        character: 'karen',
        mood: 'intense'
    },
    3: {
        title: "Bundle Up",
        narrative: "Bartholomew intercepts you at the door. His eyes are wild. 'They changed the NCCI edits AGAIN. Last night. At 3 AM.' He presses a laminated chart into your hands. 'Trust no one. Especially 36415.'",
        character: 'bartholomew',
        mood: 'paranoid'
    },
    4: {
        title: "Medical Necessity",
        narrative: "Dr. Pretzel materializes in a puff of salt. 'Today we explore the concept of NEED.' He twists contemplatively. 'Does the patient need it? Does the payer BELIEVE they need it? These are different questions.'",
        character: 'drPretzel',
        mood: 'philosophical'
    },
    5: {
        title: "Audit Day",
        narrative: "The office is silent. Too silent. Gloria's desk is empty. Karen's clipboard is gone. Then you see it: a banner reading 'AUDIT IN PROGRESS.' The Coffee Machine whispers: 'Everything you've learned... use it ALL.'",
        character: 'coffeeMachine',
        mood: 'dramatic'
    }
};

// ============================================
// BOSS BATTLE CHARACTERS
// ============================================
export const BOSS_CHARACTERS = {
    auditorQueen: {
        id: 'auditorQueen',
        name: 'The Auditor Queen',
        title: 'Supreme Overlord of Denials',
        avatar: '👑',
        color: '#dc2626',
        phases: ['Warming Up', 'Getting Serious', 'Final Form'],
        personality: 'regal, merciless, quotes regulations',
        dialogues: {
            intro: "You dare challenge ME? I have denied claims since before you could spell 'modifier'!",
            phase1: "Let's start with something... simple.",
            phase2: "Impressive. But can you handle THIS?",
            phase3: "ENOUGH! Time for the AUDIT APOCALYPSE!",
            victory: "Impossible... my denial stamp... broken...",
            defeat: "Another claim... DENIED! *stamps with authority*"
        },
        specialty: 'E/M Coding'
    },
    drDenial: {
        id: 'drDenial',
        name: 'Dr. Denial',
        title: 'Master of Medical Necessity',
        avatar: '🧪',
        color: '#7c3aed',
        phases: ['Clinical Review', 'Peer-to-Peer', 'Final Determination'],
        personality: 'clinical, cold, questions everything',
        dialogues: {
            intro: "Let me review your... credentials. Hmm. Insufficient.",
            phase1: "Is this procedure REALLY necessary?",
            phase2: "I'm escalating this to peer review...",
            phase3: "MEDICAL NECESSITY: DENIED!",
            victory: "I... I approve this claim...",
            defeat: "Your documentation was... insufficient. As expected."
        },
        specialty: 'Medical Necessity'
    },
    bundleBeast: {
        id: 'bundleBeast',
        name: 'The Bundle Beast',
        title: 'NCCI Edit Enforcer',
        avatar: '🦑',
        color: '#0891b2',
        phases: ['Component Check', 'Modifier Mayhem', 'Total Bundling'],
        personality: 'tentacular, wraps everything together',
        dialogues: {
            intro: "*tentacles writhe* All codes... become ONE...",
            phase1: "Your 36415... it belongs to ME now...",
            phase2: "Modifier -59? How... CUTE.",
            phase3: "EVERYTHING BUNDLES! NOTHING ESCAPES!",
            victory: "*deflates* My edits... unbundled...",
            defeat: "*wraps around claims* These are MINE now."
        },
        specialty: 'NCCI Bundling'
    }
};

// ============================================
// MODIFIER MATCHING GAME DATA
// ============================================
export const MODIFIER_SCENARIOS = [
    {
        id: 'mod1',
        scenario: "E/M visit performed on same day as a minor procedure (skin tag removal)",
        needsModifier25: true,
        explanation: "Modifier -25 required: Significant, separately identifiable E/M on procedure day."
    },
    {
        id: 'mod2',
        scenario: "Routine follow-up visit for hypertension, no procedures performed",
        needsModifier25: false,
        explanation: "No modifier needed: This is a standalone E/M visit without same-day procedures."
    },
    {
        id: 'mod3',
        scenario: "Patient comes in for scheduled joint injection, brief check-in only",
        needsModifier25: false,
        explanation: "No -25 needed: Brief check-in before planned procedure isn't separately billable."
    },
    {
        id: 'mod4',
        scenario: "New problem evaluated (chest pain) during visit for scheduled EKG",
        needsModifier25: true,
        explanation: "Modifier -25 required: New chest pain evaluation is separate from planned EKG."
    },
    {
        id: 'mod5',
        scenario: "Diabetes management visit with in-office A1c test",
        needsModifier25: false,
        explanation: "No modifier: A1c is a lab test, not a procedure requiring separate E/M documentation."
    },
    {
        id: 'mod6',
        scenario: "Evaluation of mole (new concern) + destruction of wart (planned)",
        needsModifier25: true,
        explanation: "Modifier -25 required: Mole evaluation is separate from planned wart destruction."
    },
    {
        id: 'mod7',
        scenario: "Post-op visit within global period for the same surgery",
        needsModifier25: false,
        explanation: "No separate E/M: Post-op visits are included in surgical global period."
    },
    {
        id: 'mod8',
        scenario: "Flu shot given during annual wellness visit",
        needsModifier25: false,
        explanation: "No -25 needed: Immunization administration doesn't require modifier on E/M."
    }
];

// ============================================
// KNOWLEDGE TRACKING (for CPT Code Wall)
// ============================================
export const CODE_CATEGORIES = {
    'E/M Office': {
        codes: ['99212', '99213', '99214', '99215'],
        color: '#4ade80',
        icon: '🏥'
    },
    'Modifiers': {
        codes: ['-25', '-59', '-76', '-77'],
        color: '#f59e0b',
        icon: '🏷️'
    },
    'Lab Panels': {
        codes: ['80053', '80061', '80048'],
        color: '#3b82f6',
        icon: '🧪'
    },
    'Procedures': {
        codes: ['36415', '17110', '11102'],
        color: '#8b5cf6',
        icon: '⚕️'
    }
};

// Get random day intro
export const getDayIntro = (day) => DAY_INTROS[day] || DAY_INTROS[0];

// Get boss character
export const getBossCharacter = (bossId) => BOSS_CHARACTERS[bossId];

// Get random modifier scenario
export const getRandomModifierScenario = () => {
    return MODIFIER_SCENARIOS[Math.floor(Math.random() * MODIFIER_SCENARIOS.length)];
};


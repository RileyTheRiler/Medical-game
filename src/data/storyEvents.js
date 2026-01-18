/**
 * Story Events for Claims Desk
 * Absurd, memorable consequences for each mistake type
 */

import { CLAIM_ISSUES } from './claims.js';

// Story events by mistake type, with escalating tiers
export const STORY_EVENTS = {
    [CLAIM_ISSUES.LEVEL_MISMATCH]: {
        character: 'gloria',
        events: [
            {
                tier: 1,
                title: "The E/M Specter",
                text: "The ghost of Dr. E.M. Leveler flickers into existence above your monitor. He counts on translucent fingers: 'One... two... TWO HPI elements.' He shakes his head and dissipates into a cloud of disappointed CPT manuals.",
                learning: "Count your HPI elements carefully."
            },
            {
                tier: 2,
                title: "Gloria's Filing Cabinet",
                text: "Gloria's filing cabinet bursts open. Thousands of rejected 99214 claims flutter out like angry butterflies. Each one has your name on it. Gloria sighs. 'I'll add this to the collection.'",
                learning: "99214 requires moderate complexity - 4+ HPI elements."
            },
            {
                tier: 3,
                title: "The Documentation Police",
                text: "A SWAT team of auditors rappels from the ceiling. Their vests say 'DOCUMENTATION POLICE.' The leader points at your screen: 'This 99215 has THREE HPI elements. THREE.' Sirens wail. Somewhere, a printer jams in solidarity.",
                learning: "99215 is HIGH complexity - comprehensive everything."
            }
        ]
    },

    [CLAIM_ISSUES.WRONG_MODIFIER]: {
        character: 'karen',
        events: [
            {
                tier: 1,
                title: "Karen's Rubber Duck",
                text: "Karen storms in holding a rubber duck. 'This is Gerald. Gerald understands modifiers.' She squeezes it. It squeaks '-25.' She squeezes again. '-59.' She stares at you. 'Even Gerald knows.'",
                learning: "Modifier -25 is for separate E/M on procedure day."
            },
            {
                tier: 2,
                title: "The Modifier Musical",
                text: "The entire office breaks into song. Bartholomew on keyboard, Gloria on backup vocals. 'MOD-I-FI-ERRRRR TWEN-TY-FIVE!' Karen conducts with a stapler. The chorus: 'SEPA-RATE! I-DEN-TI-FI-ABLE! SER-VICE!'",
                learning: "-25 indicates significant, separately identifiable E/M."
            },
            {
                tier: 3,
                title: "Modifier Hell",
                text: "You blink. You're in a courtroom. The judge is a giant modifier symbol. The jury: 12 angry CPT books. 'HOW DO YOU PLEAD?' the -25 thunders. Gerald the rubber duck is your defense attorney. He squeaks helplessly.",
                learning: "Always check if a procedure was performed on the same day."
            }
        ]
    },

    [CLAIM_ISSUES.BUNDLED_CODE]: {
        character: 'bartholomew',
        events: [
            {
                tier: 1,
                title: "The Bundling Gremlin",
                text: "Something scurries behind the fax machine. Green. Small. It peers at you with knowing eyes. 'Youuuu forgot about meeeee,' it whispers. 'NCCI remembers ALL.' It vanishes with your stapler.",
                learning: "36415 (venipuncture) bundles into lab panels."
            },
            {
                tier: 2,
                title: "Bartholomew's Theory",
                text: "Bartholomew grabs your shoulder. His eyes are wild. 'They WANT you to forget about bundling. CMS, the AMA, the Girl Scouts—they're ALL in on it. But not me. I remember.' He tapes an NCCI edit chart to your forehead.",
                learning: "Check NCCI edits before billing multiple codes."
            },
            {
                tier: 3,
                title: "The Bundle Dimension",
                text: "Reality folds. You're in a dimension where all codes are bundled. 99213 bundles into 'breathing.' Coffee bundles into 'existing.' Bartholomew is there. 'I tried to warn you,' he says, knitting a sweater made of rejected claims.",
                learning: "Component codes can't be billed with comprehensive codes."
            }
        ]
    },

    [CLAIM_ISSUES.MEDICAL_NECESSITY]: {
        character: 'drPretzel',
        events: [
            {
                tier: 1,
                title: "The Pretzel Paradox",
                text: "Dr. Pretzel materializes in a puff of salt. 'A 30-year-old wants a screening colonoscopy. WHY?' He twists into a question mark shape. 'Guidelines exist for a REASON.' He untwists and vanishes, leaving only crumbs.",
                learning: "Screening colonoscopy starts at 45 for average risk."
            },
            {
                tier: 2,
                title: "The Necessity Tribunal",
                text: "You stand before the Council of Medical Necessity. Five floating ICD-10 books surround you. 'Does the DIAGNOSIS support the PROCEDURE?' they boom in unison. Dr. Pretzel is the bailiff. He offers you a pretzel. It's shaped like 'DENIED.'",
                learning: "Procedures must be supported by appropriate diagnoses."
            },
            {
                tier: 3,
                title: "Dr. Pretzel's Koan",
                text: "Dr. Pretzel sits in lotus position atop your monitor. 'If an MRI is ordered but not necessary, does it make a sound?' He pauses. 'Yes. The sound of a denial letter printing.' He folds into an origami crane and flies away.",
                learning: "Conservative treatment before advanced imaging."
            }
        ]
    },

    [CLAIM_ISSUES.TIMELY_FILING]: {
        character: 'coffeeMachine',
        events: [
            {
                tier: 1,
                title: "The Clock Strikes",
                text: "Every calendar in the office explodes simultaneously. The coffee machine's display flashes: 'DAY 91. DAY 91. DAY 91.' Coffee pours out uncontrollably. It's cold. Like the claim you just let expire.",
                learning: "Claims must be filed within 90 days for most payers."
            },
            {
                tier: 2,
                title: "Time's Lament",
                text: "The coffee machine weeps espresso tears. 'I tried to tell you,' it gurgles. 'Time flows like coffee—but deadlines are absolute.' The break room clock spins backwards. Gloria takes notes.",
                learning: "Check the date of service vs. claim filing date."
            },
            {
                tier: 3,
                title: "The 90-Day Zone",
                text: "You're trapped in a dimension where it's always Day 89. The coffee machine is a stone monument. 'ONE. MORE. DAY.' is carved into it. You reach for the submit button but it's just out of reach. Forever.",
                learning: "Never let a claim go past the filing deadline."
            }
        ]
    },

    [CLAIM_ISSUES.MISSING_AUTH]: {
        character: 'karen',
        events: [
            {
                tier: 1,
                title: "The Authorization Fairy",
                text: "A tiny fairy appears. It's Karen, but 3 inches tall and with wings. 'Did... did you get prior auth?' she squeaks. You didn't. She explodes into a cloud of denial letters.",
                learning: "Advanced imaging requires prior authorization."
            },
            {
                tier: 2,
                title: "The Auth Alarm",
                text: "An alarm you've never heard blares. Red lights spin. A trapdoor opens beneath the claim. 'PRIOR AUTH NOT FOUND,' announces the ceiling. Karen emerges from the vent. 'I LIVE here now.'",
                learning: "Check auth requirements before expensive procedures."
            },
            {
                tier: 3,
                title: "Auth Quest",
                text: "You must journey to the Prior Authorization Kingdom. The path is treacherous, paved with hold music and transfer requests. Karen guards the gate. 'Prove you called,' she says. You have no proof. You never do.",
                learning: "Document all authorization numbers."
            }
        ]
    },

    [CLAIM_ISSUES.DUPLICATE]: {
        character: 'bartholomew',
        events: [
            {
                tier: 1,
                title: "Déjà Vu",
                text: "You blink. The same claim is on your screen. You blink again. Still there. Bartholomew whispers: 'They already submitted this one. Check the dates. CHECK THE DATES.' The claim multiplies.",
                learning: "Check for duplicate claim submissions."
            }
        ]
    },

    [CLAIM_ISSUES.WRONG_DIAGNOSIS]: {
        character: 'drPretzel',
        events: [
            {
                tier: 1,
                title: "The ICD Oracle",
                text: "Dr. Pretzel pulls an ICD-10 volume from thin air. 'The codes... they do not match the words.' He flips to a random page. 'Z23 is immunization. Not... whatever THIS is.' The book hisses at you.",
                learning: "ICD-10 must match the documented diagnosis."
            }
        ]
    }
};

// Get an appropriate story event based on mistake type and count
export const getStoryEvent = (mistakeType, mistakeCount = 1) => {
    const eventCategory = STORY_EVENTS[mistakeType];
    if (!eventCategory) return null;

    const tier = Math.min(mistakeCount, eventCategory.events.length);
    const tierIndex = tier - 1;

    return {
        ...eventCategory.events[tierIndex],
        character: eventCategory.character
    };
};

// Get all event categories
export const getAllEventCategories = () => Object.keys(STORY_EVENTS);

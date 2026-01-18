export const SCENARIOS = [
    {
        id: 1,
        title: "Excision of Lipoma",
        difficulty: "Beginner",
        xpReward: 150,
        patient: {
            name: "Smith, John",
            dob: "1965-03-12",
            mrn: "884210"
        },
        documentation: `OPERATIVE REPORT
    
PATIENT: John Smith
DATE OF SERVICE: 10/12/2023
SURGEON: Dr. Sarah Bennett

PREOPERATIVE DIAGNOSIS: Lipoma, right forearm.
POSTOPERATIVE DIAGNOSIS: Lipoma, right forearm.
PROCEDURE PERFORMED: Excision of subcutaneous lipoma, right forearm.

ANESTHESIA: Local with 1% lidocaine with epinephrine.

INDICATIONS: The patient is a 58-year-old male with a slowly enlarging mass on the right forearm, symptomatic with pressure. He desires removal.

PROCEDURE IN DETAIL:
The patient was brought to the procedure room. The right forearm was prepped and draped in the usual sterile fashion. The area of the mass was infiltrated with 5 cc of 1% lidocaine with epinephrine.

An elliptical incision was made over the mass measuring 3.0 cm in length. Dissection was carried down through the subcutaneous tissues. The lipoma was identified and encapsulated. It was dissected free from the surrounding tissues using blunt and sharp dissection. The mass measured 2.5 cm x 2.0 cm. 

The wound was irrigated with sterile saline. Hemostasis was obtained with electrocautery. The subcutaneous layer was closed with 4-0 Vicryl inverted interrupted sutures. The skin was closed with numeric 5-0 Prolene in a running subcuticular fashion. Complexity of the repair was intermediate due to layered closure.

Sterile dressing was applied. The patient tolerated the procedure well and was discharged home in stable condition.`,
        questions: [
            {
                id: "q1",
                type: "cpt",
                text: "What is the primary CPT code for the excision?",
                options: [
                    { code: "11403", desc: "Excision, benign lesion, trunk/arms/legs; 2.1 to 3.0 cm" },
                    { code: "11404", desc: "Excision, benign lesion, trunk/arms/legs; 3.1 to 4.0 cm" },
                    { code: "11423", desc: "Excision, benign lesion, scalp/neck/hands/feet; 2.1 to 3.0 cm" },
                    { code: "12032", desc: "Repair, intermediate, wounds of scalp/axillae/trunk/extremities; 2.6 cm to 7.5 cm" }
                ],
                correct: 0,
                explanation: "Code 11403 is correct. The mass is on the arm/forearm (11400 series). The size is the excised diameter (2.5 cm) plus margins. However, even if we assume narrow margins, it falls into the 2.1-3.0 range or slightly higher. Wait - typically we code excision diameter. Report states mass was 2.5 cm. Total excised diameter = lesion + margins. If margins aren't specified, use lesion diameter. 11403 covers 2.1 to 3.0 cm."
            },
            {
                id: "q2",
                type: "repair",
                text: "Is the intermediate repair (12032) separately billable?",
                options: [
                    { text: "Yes, because it was a layered closure.", isCorrect: false },
                    { text: "No, simple and intermediate repairs are included in excision of benign lesions.", isCorrect: false },
                    { text: "No, intermediate repair is bundled, only complex is separate.", isCorrect: false },
                    { text: "Yes, but only with modifier -59.", isCorrect: false }
                ],
                // Actually, per CPT, simple repair is included. Intermediate and complex ARE separately billable for benign excisions (11400 series) in some years, but CURRENTLY:
                // "Simple repair is used when the wound is superficial... Closure of the ... subcutaneous tissues... constitutes intermediate repair."
                // AND for Excision - Benign Lesions: "Simple closure is included... Intermediate and complex closures should be reported separately."
                // SO correct answer is YES.
                correct: 0,
                explanation: "Yes. For benign lesion excisions (11400-11471), simple closure is included. However, intermediate (12031-12057) and complex repairs are separately billable. This report specifies 'layered closure', qualifying as Intermediate."
            },
            {
                id: "q3",
                type: "icd",
                text: "What is the correct ICD-10-CM code for the Lipoma?",
                options: [
                    { code: "D17.1", desc: "Benign lipomatous neoplasm of skin and subcutaneous tissue of trunk" },
                    { code: "D17.21", desc: "Benign lipomatous neoplasm of skin/subq of right arm" },
                    { code: "D17.22", desc: "Benign lipomatous neoplasm of skin/subq of left arm" },
                    { code: "D17.9", desc: "Benign lipomatous neoplasm, unspecified" }
                ],
                correct: 1,
                explanation: "D17.21 is specific for the right arm. Forearm is part of the upper limb (arm)."
            }
        ]
    },
    {
        id: 2,
        title: "Screening Colonoscopy",
        difficulty: "Intermediate",
        xpReward: 200,
        patient: {
            name: "Doe, Jane",
            dob: "1973-08-22",
            mrn: "993821"
        },
        documentation: `OPERATIVE REPORT
    
PATIENT: Jane Doe
DATE OF SERVICE: 11/05/2023
PROCEDURE: Colonoscopy

INDICATIONS: Screening for colorectal cancer. Patient is 50 years old, average risk.

PROCEDURE: 
Informed consent was obtained. The patient was sedated with Propofol. The colonoscope was introduced through the anus and advanced to the cecum. The appendiceal orifice and ileocecal valve were identified.
The preparation was excellent.

Findings:
1. A 6mm polyp was found in the ascending colon. This was removed via hot biopsy forceps.
2. A 4mm polyp was found in the sigmoid colon. This was removed via snare technique.

The patient tolerated the procedure well.

IMPRESSION:
1. Ascending colon polyp, removed.
2. Sigmoid colon polyp, removed.
3. Otherwise normal colonoscopy.`,
        questions: [
            {
                id: "q1",
                type: "cpt",
                text: "How should the procedures be coded?",
                options: [
                    { code: "45385, 45384", desc: "Snare removal (45385) and Hot biopsy (45384)" },
                    { code: "45385", desc: "Snare removal only (highest value)" },
                    { code: "45378", desc: "Diagnostic colonoscopy only" },
                    { code: "45380, 45385", desc: "Biopsy (45380) and Snare (45385)" }
                ],
                correct: 0,
                explanation: "Code both techniques. 45385 for the snare removal in the sigmoid, and 45384 for the hot biopsy forceps removal in the ascending colon. They are distinct lesions treated with different techniques."
            },
            {
                id: "q2",
                type: "modifier",
                text: "What modifier is needed to indicate distinct procedures?",
                options: [
                    { code: "-51", desc: "Multiple procedures" },
                    { code: "-59", desc: "Distinct procedural service" },
                    { code: "-25", desc: "Significant separate E/M" },
                    { code: "No modifier needed", desc: "Codes are additive" }
                ],
                correct: 1,
                explanation: "Modifier -59 (or X-subset) is typically used to indicate that the procedures were performed on separate lesions/sites, overriding the NCCI bundle if one exists. (Note: Medicare might require -XS)."
            }
        ]
    },
    {
        id: 3,
        title: "ORIF Distal Radius",
        difficulty: "Advanced",
        xpReward: 300,
        patient: {
            name: "Johnson, Robert",
            dob: "1980-05-15",
            mrn: "442918"
        },
        documentation: `OPERATIVE REPORT

PATIENT: Robert Johnson
DATE: 01/15/2024
SURGEON: Dr. Mark Bones
PROCEDURE: Open reduction internal fixation (ORIF) of left distal radius fracture.

HISTORY: 43-year-old male fell on outstretched hand. X-rays showed intra-articular distal radius fracture.

PROCEDURE:
After satisfactory general anesthesia, the left upper extremity was prepped. A volar Henry approach was utilized. The flexor carpi radialis tendon was retracted ulnarly. The fracture site was exposed. 
The fracture was reduced and held with K-wires. A volar locking plate was applied. Fluoroscopy confirmed good reduction of the intra-articular fragments.
The plate was secured with cortical and locking screws. Final films showed restoration of radial height and tilt.
Wounds closed in layers. Splint applied.

IMPRESSION: Successful ORIF left distal radius.`,
        questions: [
            {
                id: "q1",
                type: "cpt",
                text: "What is the CPT code for this procedure?",
                options: [
                    { code: "25600", desc: "Closed treatment of distal radial fracture; without manipulation" },
                    { code: "25605", desc: "Closed treatment... with manipulation" },
                    { code: "25607", desc: "Open treatment of distal radial extra-articular fracture" },
                    { code: "25609", desc: "Open treatment of distal radial intra-articular fracture" }
                ],
                correct: 3,
                explanation: "25609 is correct. This was an OPEN treatment (ORIF) of an INTRA-ARTICULAR fracture (explicitly stated in history and procedure)."
            },
            {
                id: "q2",
                type: "modifier",
                text: "Which modifier indicates the laterality?",
                options: [
                    { code: "-LT", desc: "Left side" },
                    { code: "-RT", desc: "Right side" },
                    { code: "-50", desc: "Bilateral procedure" },
                    { code: "-51", desc: "Multiple procedures" }
                ],
                correct: 0,
                explanation: "-LT puts the 'Left' in laterality. Essential for limb procedures!"
            }
        ]
    },
    {
        id: 4,
        title: "Left Heart Cath",
        difficulty: "Advanced",
        xpReward: 350,
        patient: {
            name: "Williams, Mary",
            dob: "1955-11-30",
            mrn: "772109"
        },
        documentation: `CARDIAC CATHETERIZATION REPORT

PATIENT: Mary Williams
DATE: 01/20/2024
PHYSICIAN: Dr. Sara Heart

INDICATIONS: Positive stress test, chest pain.

PROCEDURE:
1. Left heart catheterization via femoral approach.
2. Coronary angiography.
3. Left ventricular output (ventriculography).

FINDINGS:
Right coronary artery: 30% stenosis.
Left anterior descending: 40% stenosis.
Left Circumflex: Patent.
LVEDP: 18 mmHg. Ejection Fraction: 60%.

IMPRESSION: Non-obstructive coronary artery disease. Medical management recommended.`,
        questions: [
            {
                id: "q1",
                type: "cpt",
                text: "Which code describes the combined procedure?",
                options: [
                    { code: "93452", desc: "Left heart catheterization only" },
                    { code: "93454", desc: "Coronary angiography only" },
                    { code: "93458", desc: "LHC + Coronary Angio + Ventriculography" },
                    { code: "93459", desc: "LHC + Coronary Angio + Ventriculography + Bypass Graft Angio" }
                ],
                correct: 2,
                explanation: "93458 includes all three components performed: Left Heart Cath, Coronary Angiography, and Ventriculography (LV gram). 93452 is too limited, 93459 implies bypass grafts were studied (they weren't)."
            },
            {
                id: "q2",
                type: "modifier",
                text: "Is modifier -26 (Professional Component) needed?",
                options: [
                    { text: "Yes, if performed in a hospital setting.", isCorrect: true },
                    { text: "No, never.", isCorrect: false },
                    { text: "Only if the patient was admitted.", isCorrect: false },
                    { text: "Only for the anesthesia.", isCorrect: false }
                ],
                correct: 0,
                explanation: "Yes! If the doctor doesn't own the cath lab equipment (typical in a hospital), they bill the professional component (-26). The hospital bills the technical component (-TC)."
            }
        ]
    },
    {
        id: 5,
        title: "Maternity Delivery",
        difficulty: "Intermediate",
        xpReward: 250,
        patient: {
            name: "Davis, Ashley",
            dob: "1994-07-04",
            mrn: "119283"
        },
        documentation: `DELIVERY NOTE

PATIENT: Ashley Davis
DATE OF DELIVERY: 02/10/2024
OBSTETRICIAN: Dr. Emily Child

HISTORY: G1P0 at 39 weeks. Spontaneous labor.

DELIVERY:
NSVD (Normal Spontaneous Vaginal Delivery) of live male infant.
Episiotomy performed and repaired.
Placenta delivered intact spontaneously.

POSTPARTUM:
Patient and baby stable. I have provided all prenatal care (12 visits) and will provide postpartum care.`,
        questions: [
            {
                id: "q1",
                type: "cpt",
                text: "What is the global obstetric package code?",
                options: [
                    { code: "59400", desc: "Routine obstetric care including antepartum care, vaginal delivery (with or without episiotomy, and/or forceps) and postpartum care" },
                    { code: "59409", desc: "Vaginal delivery only (with or without episiotomy/forceps)" },
                    { code: "59410", desc: "Vaginal delivery only (with or without episiotomy/forceps); including postpartum care" },
                    { code: "59510", desc: "Routine obstetric care including antepartum care, cesarean delivery, and postpartum care" }
                ],
                correct: 0,
                explanation: "59400 is the global package. The note states the physician provided ALL prenatal care, the delivery, and will provide postpartum care. This bundles everything into one code."
            },
            {
                id: "q2",
                type: "icd",
                text: "What is the outcome of delivery code?",
                options: [
                    { code: "Z37.0", desc: "Single live birth" },
                    { code: "Z37.2", desc: "Twins, both liveborn" },
                    { code: "Z38.00", desc: "Single liveborn infant, delivered vaginally (This is for the BABY's record!)" },
                    { code: "O80", desc: "Encounter for full-term uncomplicated delivery" }
                ],
                correct: 0,
                explanation: "Z37.0 is the outcome of delivery code used on the MOM's chart. Z38 codes go on the BABY's chart. O80 is the diagnosis for the delivery encounter itself."
            }
        ]
    },
    {
        id: 6,
        title: "Anesthesia for TKA",
        difficulty: "Advanced",
        xpReward: 300,
        patient: {
            name: "Miller, George",
            dob: "1950-02-12",
            mrn: "551920"
        },
        documentation: `ANESTHESIA RECORD

PATIENT: George Miller
DATE: 03/01/2024

PROCEDURE: Total Knee Arthroplasty (TKA), Left.
ANESTHESIOLOGIST: Dr. Sleep

Patient Status: P3 (Severe systemic disease - controlled COPD, HTN).

TIMING:
Anesthesia Start: 07:30
Anesthesia End: 10:45
Total Time: 195 minutes.

TECHNIQUE: General Anesthesia with endotracheal intubation.`,
        questions: [
            {
                id: "q1",
                type: "cpt",
                text: "What is the Anesthesia CPT code for a total knee?",
                options: [
                    { code: "01392", desc: "Anesthesia for all open procedures on upper end of tibia, fibula, and/or knee joint" },
                    { code: "01400", desc: "Anesthesia for open or surgical arthroscopic procedures on knee joint; not otherwise specified" },
                    { code: "01402", desc: "Anesthesia for open or surgical arthroscopic procedures on knee joint; total knee arthroplasty" },
                    { code: "27447", desc: "Arthroplasty, knee, condyle and plateau (This is the SURGERY code, not anesthesia!)" }
                ],
                correct: 2,
                explanation: "01402 is specific for 'Total Knee Arthroplasty'. Anesthesia codes (00100-01999) are distinct from surgery codes."
            },
            {
                id: "q2",
                type: "math",
                text: "If the conversion factor is $22/unit and time unit is 15 min, what is the billable time amount?",
                options: [
                    { text: "13 units (195 / 15)", isCorrect: true },
                    { text: "195 units", isCorrect: false },
                    { text: "3.25 units", isCorrect: false },
                    { text: "10 units", isCorrect: false }
                ],
                correct: 0,
                explanation: "195 minutes / 15 minutes per unit = 13 time units. (Base units + Time units + Modifiers) * Conversion Factor = Payment."
            }
        ]
    }
];

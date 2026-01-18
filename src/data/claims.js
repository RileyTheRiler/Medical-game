/**
 * Claims Desk Mini-Game Data
 * A "Papers Please" style game where players approve/deny medical billing claims
 */

// Types of issues that can appear in claims
export const CLAIM_ISSUES = {
    LEVEL_MISMATCH: 'level_mismatch',      // E/M level doesn't match documentation
    WRONG_MODIFIER: 'wrong_modifier',       // Missing or incorrect modifier
    BUNDLED_CODE: 'bundled_code',           // Codes that should be bundled
    MEDICAL_NECESSITY: 'medical_necessity', // Diagnosis doesn't support procedure
    TIMELY_FILING: 'timely_filing',         // Claim filed too late
    DUPLICATE: 'duplicate',                  // Duplicate claim submission
    MISSING_AUTH: 'missing_auth',           // Missing prior authorization
    WRONG_DIAGNOSIS: 'wrong_diagnosis',     // ICD-10 doesn't match documentation
    VALID: 'valid'                          // No issues - should be approved
};

// Daily rules that progressively add complexity
export const DAILY_RULES = [
    {
        day: 0,
        title: "Orientation",
        subtitle: "Learn the ropes - no pressure!",
        description: "A guided introduction to claim review. No timer, just learn!",
        rules: [
            "This is TRAINING MODE - take your time!",
            "Read the documentation on the left carefully",
            "Look for HPI elements: location, duration, severity, timing",
            "Count exam areas: HEENT, CV, Lungs, Abdomen, etc.",
            "Match what you find to the E/M level being billed"
        ],
        issueTypes: [CLAIM_ISSUES.LEVEL_MISMATCH, CLAIM_ISSUES.VALID],
        isOrientation: true,
        shiftTime: null,  // No timer for orientation
        claimCount: 3,
        xpReward: 50
    },
    {
        day: 1,
        title: "First Day on the Job",
        subtitle: "Learn the basics of claim review",
        description: "Check if the E/M level matches the documentation complexity.",
        rules: [
            "E/M levels (99211-99215) must match documentation elements",
            "99213 requires low complexity (2 HPI elements, 1 exam area)",
            "99214 requires moderate complexity (4+ HPI elements, 2+ exam areas)",
            "99215 requires high complexity (comprehensive documentation)"
        ],
        issueTypes: [CLAIM_ISSUES.LEVEL_MISMATCH, CLAIM_ISSUES.VALID],
        shiftTime: 180,  // 3 minutes
        claimCount: 5,
        xpReward: 200
    },
    {
        day: 2,
        title: "Modifier Madness",
        subtitle: "Not everything is straightforward",
        description: "Today you'll need to watch for modifier requirements.",
        rules: [
            "All previous rules still apply",
            "Modifier -25 required for separate E/M on procedure day",
            "Modifier -59 for distinct procedural services",
            "Modifier -76 for repeat procedure by same physician"
        ],
        issueTypes: [CLAIM_ISSUES.LEVEL_MISMATCH, CLAIM_ISSUES.WRONG_MODIFIER, CLAIM_ISSUES.VALID],
        shiftTime: 240,  // 4 minutes
        claimCount: 7,
        xpReward: 300
    },
    {
        day: 3,
        title: "Bundle Up",
        subtitle: "Some codes don't play well together",
        description: "Watch for NCCI bundling edits.",
        rules: [
            "All previous rules still apply",
            "36415 (venipuncture) bundles into most lab panels",
            "Can't bill 99213 and 99214 together",
            "Check for component codes billed with comprehensive codes"
        ],
        issueTypes: [CLAIM_ISSUES.LEVEL_MISMATCH, CLAIM_ISSUES.WRONG_MODIFIER, CLAIM_ISSUES.BUNDLED_CODE, CLAIM_ISSUES.VALID],
        shiftTime: 300,  // 5 minutes
        claimCount: 10,
        xpReward: 400
    },
    {
        day: 4,
        title: "Medical Necessity",
        subtitle: "Is this procedure really needed?",
        description: "Verify diagnoses support the procedures performed.",
        rules: [
            "All previous rules still apply",
            "Screening colonoscopy requires appropriate age/risk factors",
            "Physical therapy requires documented functional limitation",
            "Imaging requires symptoms, not just \"rule out\""
        ],
        issueTypes: [CLAIM_ISSUES.LEVEL_MISMATCH, CLAIM_ISSUES.WRONG_MODIFIER, CLAIM_ISSUES.BUNDLED_CODE, CLAIM_ISSUES.MEDICAL_NECESSITY, CLAIM_ISSUES.VALID],
        shiftTime: 300,
        claimCount: 12,
        xpReward: 500
    },
    {
        day: 5,
        title: "Audit Day",
        subtitle: "Everything on the line",
        description: "Full audit complexity - all rules in effect!",
        rules: [
            "ALL previous rules apply",
            "Watch for duplicate submissions",
            "Check timely filing (claims must be within 90 days)",
            "Prior authorization required for advanced imaging"
        ],
        issueTypes: Object.values(CLAIM_ISSUES),
        shiftTime: 360,  // 6 minutes
        claimCount: 15,
        xpReward: 750
    }
];

// Individual claims to review
export const CLAIMS = [
    // DAY 0 CLAIMS - Orientation (with coaching)
    {
        id: 'o1',
        day: 0,
        patient: { name: "Tutorial, Patient", dob: "01/01/1970", insurance: "Learning Insurance" },
        provider: "Dr. Training Mode",
        dateOfService: "01/01/2026",
        cptCode: "99214",
        icdCodes: ["J06.9"],
        modifier: null,
        chargedAmount: 125.00,
        documentation: `PROGRESS NOTE

CHIEF COMPLAINT: Sore throat for 3 days.

HPI: Patient presents with sore throat. Started 3 days ago.

EXAM: HEENT: Pharynx erythematous. Tonsils enlarged.

ASSESSMENT: Pharyngitis.

PLAN: Strep test. Symptomatic treatment.`,
        correctDecision: "DENY",
        issues: [CLAIM_ISSUES.LEVEL_MISMATCH],
        correctCode: "99213",
        explanation: "This documentation only has 2 HPI elements (what: sore throat, when: 3 days) and 1 exam area (HEENT). That's enough for 99213, but NOT 99214 which needs more detail.",
        // Orientation-specific coaching
        coachMessage: "👋 Welcome! Let's learn together. Look at the HPI section - can you count how many details are given? (Hint: 'sore throat' = what, '3 days' = when)",
        hpiHints: ["sore throat", "3 days"],
        examHints: ["HEENT"]
    },
    {
        id: 'o2',
        day: 0,
        patient: { name: "Practice, Example", dob: "05/15/1985", insurance: "Demo Health" },
        provider: "Dr. Training Mode",
        dateOfService: "01/02/2026",
        cptCode: "99213",
        icdCodes: ["M54.5", "M25.561"],
        modifier: null,
        chargedAmount: 95.00,
        documentation: `PROGRESS NOTE

CHIEF COMPLAINT: Low back pain and right knee pain.

HPI: 40 y/o presents with low back pain x 1 week, worse with bending. Also has right knee pain with stairs. No injury. Taking ibuprofen with some relief.

EXAM:
- Spine: Lumbar tenderness L4-L5, no radiculopathy
- Right knee: Mild crepitus, full ROM, no effusion

ASSESSMENT: 
1. Lumbar strain
2. Knee pain, likely early OA

PLAN: Continue NSAIDs. PT referral. Return 2 weeks.`,
        correctDecision: "APPROVE",
        issues: [CLAIM_ISSUES.VALID],
        correctCode: "99213",
        explanation: "Good job if you approved this! The HPI has 3+ elements (location: back/knee, duration: 1 week, modifying factors: bending/stairs, context: no injury). Two exam areas (Spine, Knee). This properly supports 99213.",
        coachMessage: "📝 This one has MORE detail. Count the HPI elements: location (back, knee), duration (1 week), what makes it worse (bending, stairs), what helps (ibuprofen)...",
        hpiHints: ["low back pain", "1 week", "worse with bending", "right knee pain", "stairs", "No injury", "ibuprofen", "some relief"],
        examHints: ["Spine", "Right knee"]
    },
    {
        id: 'o3',
        day: 0,
        patient: { name: "Final, Test", dob: "11/20/1960", insurance: "Training Plan" },
        provider: "Dr. Training Mode",
        dateOfService: "01/03/2026",
        cptCode: "99215",
        icdCodes: ["R05.9"],
        modifier: null,
        chargedAmount: 195.00,
        documentation: `PROGRESS NOTE

CHIEF COMPLAINT: Cough.

HPI: Has a cough.

EXAM: Lungs clear.

ASSESSMENT: Cough.

PLAN: Cough suppressant.`,
        correctDecision: "DENY",
        issues: [CLAIM_ISSUES.LEVEL_MISMATCH],
        correctCode: "99211 or 99212",
        explanation: "This is SEVERELY underdocumented for 99215! Only 1 vague HPI element ('has a cough'), 1 exam finding. 99215 requires HIGH complexity - this barely qualifies for 99211-99212.",
        coachMessage: "🎓 Last practice! This claim is for 99215 (the HIGHEST office visit level). Does this tiny amount of documentation justify charging $195? Compare to the detailed notes you saw before!",
        hpiHints: ["cough"],
        examHints: ["Lungs"]
    },

    // DAY 1 CLAIMS - E/M Level Matching
    {
        id: 1,
        day: 1,
        patient: { name: "Garcia, Maria", dob: "04/15/1980", insurance: "Blue Cross" },
        provider: "Dr. James Wilson",
        dateOfService: "01/10/2026",
        cptCode: "99214",
        icdCodes: ["J06.9"],
        modifier: null,
        chargedAmount: 125.00,
        documentation: `PROGRESS NOTE

CHIEF COMPLAINT: Runny nose for 2 days.

HPI: Patient presents with clear rhinorrhea x 2 days. No fever. No sore throat.

EXAM: HEENT: Clear rhinorrhea. TMs clear. Throat non-erythematous.

ASSESSMENT: Acute upper respiratory infection.

PLAN: Supportive care. Push fluids. Return if worsening.`,
        correctDecision: "DENY",
        issues: [CLAIM_ISSUES.LEVEL_MISMATCH],
        correctCode: "99213",
        explanation: "Documentation shows only 2 HPI elements (location, duration) and 1 exam area (HEENT). This supports 99213, not 99214 which requires moderate complexity."
    },
    {
        id: 2,
        day: 1,
        patient: { name: "Thompson, Robert", dob: "08/22/1955", insurance: "Medicare" },
        provider: "Dr. Sarah Chen",
        dateOfService: "01/11/2026",
        cptCode: "99213",
        icdCodes: ["E11.9", "I10"],
        modifier: null,
        chargedAmount: 95.00,
        documentation: `PROGRESS NOTE

CHIEF COMPLAINT: Diabetes and hypertension follow-up.

HPI: 70 y/o male here for routine follow-up. Blood sugars have been well controlled, ranging 110-140 fasting. No hypoglycemic episodes. Taking medications as prescribed.

EXAM: 
- Vitals: BP 128/78, HR 72
- General: Well-appearing
- CV: RRR, no murmurs

ASSESSMENT:
1. Type 2 diabetes - well controlled
2. Hypertension - at goal

PLAN: Continue current regimen. Recheck in 3 months. Labs ordered.`,
        correctDecision: "APPROVE",
        issues: [CLAIM_ISSUES.VALID],
        correctCode: "99213",
        explanation: "Documentation appropriately supports 99213 - low complexity visit with straightforward decision making for stable chronic conditions."
    },
    {
        id: 3,
        day: 1,
        patient: { name: "Johnson, Alice", dob: "12/03/1978", insurance: "Aetna" },
        provider: "Dr. Michael Brown",
        dateOfService: "01/12/2026",
        cptCode: "99215",
        icdCodes: ["M54.5"],
        modifier: null,
        chargedAmount: 195.00,
        documentation: `PROGRESS NOTE

CHIEF COMPLAINT: Back pain.

HPI: Patient has had back pain for 1 week after lifting a heavy box.

EXAM: Lumbar tenderness noted.

ASSESSMENT: Low back strain.

PLAN: Ibuprofen. Heat. Follow up prn.`,
        correctDecision: "DENY",
        issues: [CLAIM_ISSUES.LEVEL_MISMATCH],
        correctCode: "99212",
        explanation: "This minimal documentation (1 HPI element, 1 exam finding, straightforward MDM) only supports 99212. 99215 requires HIGH complexity with comprehensive documentation."
    },
    {
        id: 4,
        day: 1,
        patient: { name: "Williams, David", dob: "06/17/1962", insurance: "United Healthcare" },
        provider: "Dr. Lisa Park",
        dateOfService: "01/13/2026",
        cptCode: "99214",
        icdCodes: ["J45.40", "J30.1"],
        modifier: null,
        chargedAmount: 125.00,
        documentation: `PROGRESS NOTE

CHIEF COMPLAINT: Asthma and allergies, here for management.

HPI: 63 y/o male with moderate persistent asthma, currently on Symbicort 160/4.5 BID and albuterol PRN. Reports increased wheezing over past 2 weeks, especially at night. Using rescue inhaler 3-4x/week (up from 1x/week). Seasonal allergies flaring - itchy eyes, sneezing, congestion. No fever, no productive cough.

EXAM:
- Vitals: BP 132/84, HR 78, SpO2 96%
- General: Mild respiratory distress
- HEENT: Nasal mucosa boggy, clear discharge
- Lungs: Diffuse expiratory wheezes bilaterally, no rales
- CV: RRR

ASSESSMENT:
1. Asthma exacerbation - moderate, likely triggered by allergies
2. Allergic rhinitis - uncontrolled

PLAN:
1. Add oral prednisone burst 40mg x 5 days
2. Increase Symbicort to 160/4.5 2 puffs BID
3. Start Flonase 2 sprays each nostril daily
4. Peak flow monitoring at home
5. Return in 1 week or sooner if worsening`,
        correctDecision: "APPROVE",
        issues: [CLAIM_ISSUES.VALID],
        correctCode: "99214",
        explanation: "This is properly coded as 99214. Documentation shows 4+ HPI elements, multiple exam systems, and moderate complexity MDM with prescription management and treatment adjustments."
    },
    {
        id: 5,
        day: 1,
        patient: { name: "Brown, Emily", dob: "03/29/1990", insurance: "Cigna" },
        provider: "Dr. James Wilson",
        dateOfService: "01/14/2026",
        cptCode: "99213",
        icdCodes: ["N39.0"],
        modifier: null,
        chargedAmount: 95.00,
        documentation: `PROGRESS NOTE

CHIEF COMPLAINT: Painful urination x 3 days.

HPI: 35 y/o female with dysuria, frequency, and urgency for 3 days. No fever, no flank pain, no vaginal discharge. Last menstrual period 2 weeks ago. Sexually active with one partner.

EXAM:
- Vitals: Afebrile
- Abdomen: Soft, mild suprapubic tenderness
- CVA: No tenderness bilaterally

ASSESSMENT: Acute uncomplicated cystitis.

PLAN: Macrobid 100mg BID x 5 days. Push fluids. Return if symptoms persist or fever develops.`,
        correctDecision: "APPROVE",
        issues: [CLAIM_ISSUES.VALID],
        correctCode: "99213",
        explanation: "Correctly coded as 99213. Documentation shows adequate HPI (3 elements), focused exam, and low complexity straightforward decision making."
    },

    // DAY 2 CLAIMS - Add Modifier Issues
    {
        id: 6,
        day: 2,
        patient: { name: "Martinez, Carlos", dob: "11/08/1975", insurance: "Medicare" },
        provider: "Dr. Sarah Chen",
        dateOfService: "01/15/2026",
        cptCode: "99213",
        icdCodes: ["L82.1", "L57.0"],
        modifier: null,
        chargedAmount: 95.00,
        documentation: `PROGRESS NOTE

CHIEF COMPLAINT: Skin lesion on back.

HPI: Patient noticed a dark, raised lesion on his upper back. Present for several months. Non-painful. No itching.

EXAM: 8mm seborrheic keratosis on upper back at T4 level.

PROCEDURE PERFORMED: Destruction of benign lesion via cryotherapy (see procedure note).

ASSESSMENT: Seborrheic keratosis.

PLAN: Wound care instructions given. Return if recurrence.`,
        correctDecision: "DENY",
        issues: [CLAIM_ISSUES.WRONG_MODIFIER],
        correctCode: "99213-25",
        explanation: "When an E/M service is performed on the same day as a procedure (the cryotherapy), modifier -25 must be appended to indicate a significant, separately identifiable E/M service."
    },
    {
        id: 7,
        day: 2,
        patient: { name: "Lee, Jennifer", dob: "07/14/1988", insurance: "Blue Cross" },
        provider: "Dr. Michael Brown",
        dateOfService: "01/16/2026",
        cptCode: "99214",
        icdCodes: ["K21.0"],
        modifier: "-25",
        chargedAmount: 125.00,
        documentation: `PROGRESS NOTE

CHIEF COMPLAINT: Heartburn and GERD follow-up.

HPI: 37 y/o female with known GERD. Symptoms have worsened despite PPI therapy. Experiencing daily heartburn, regurgitation after meals, occasional dysphagia. Tried lifestyle modifications. No weight loss, no GI bleeding.

EXAM:
- Abdomen: Soft, mild epigastric tenderness, no masses
- Throat: Mild posterior pharyngeal erythema

EGD SCHEDULED: Due to treatment failure and alarm symptoms (dysphagia).

ASSESSMENT: GERD with esophagitis, refractory to medical management.

PLAN: 
1. Continue PPI, switch to BID dosing
2. EGD scheduled for next week
3. Discussed Barrett's screening

PROCEDURE: Upper GI endoscopy performed same day (see procedure report).`,
        correctDecision: "APPROVE",
        issues: [CLAIM_ISSUES.VALID],
        correctCode: "99214-25",
        explanation: "Correctly coded with modifier -25. The E/M service is significant and separately identifiable from the EGD procedure, with documented decision-making and treatment planning."
    },
    {
        id: 8,
        day: 2,
        patient: { name: "Davis, Michael", dob: "02/28/1970", insurance: "Aetna" },
        provider: "Dr. Lisa Park",
        dateOfService: "01/17/2026",
        cptCode: "99215",
        icdCodes: ["I50.9", "E11.65", "I10", "N18.3"],
        modifier: null,
        chargedAmount: 195.00,
        documentation: `PROGRESS NOTE

CHIEF COMPLAINT: Multiple chronic disease management, new symptoms.

HPI: 55 y/o male with CHF (EF 35%), DM2 with nephropathy, and HTN. Presents with 2 weeks of increasing lower extremity edema, 8 lb weight gain, and progressive dyspnea on exertion. Now SOB walking one block (previously 3 blocks). Waking at night with SOB requiring 3 pillows. Reports medication compliance. Blood sugars have been 160-200 range.

EXAM:
- Vitals: BP 158/94, HR 88, SpO2 92% on RA
- General: Mild distress, speaks in full sentences
- CV: JVD to angle of jaw, S3 gallop present
- Lungs: Bibasilar crackles 1/3 up
- Extremities: 3+ pitting edema to knees bilaterally
- Neuro: Alert and oriented

LABS TODAY: BNP 890, Cr 2.1 (baseline 1.8), K 5.2

ASSESSMENT:
1. Acute on chronic systolic heart failure exacerbation
2. T2DM with diabetic nephropathy - worsening
3. Hypertension - uncontrolled
4. CKD Stage 3b - worsening

PLAN:
1. Direct admit to hospital for IV diuresis and monitoring
2. Hold metformin given AKI
3. Cardiology consult
4. Adjust antihypertensives after volume status improved
5. Will coordinate with nephrology`,
        correctDecision: "APPROVE",
        issues: [CLAIM_ISSUES.VALID],
        correctCode: "99215",
        explanation: "This is appropriately coded as 99215. Documentation shows comprehensive HPI, multi-system exam, and high complexity MDM with multiple chronic conditions, acute exacerbation, and hospital admission decision."
    },

    // DAY 3 CLAIMS - Add Bundling Issues
    {
        id: 9,
        day: 3,
        patient: { name: "Anderson, Susan", dob: "09/05/1965", insurance: "United Healthcare" },
        provider: "Dr. James Wilson",
        dateOfService: "01/18/2026",
        cptCode: "36415",
        icdCodes: ["R73.09", "E78.5"],
        modifier: null,
        chargedAmount: 12.00,
        additionalCodes: ["80053"],
        documentation: `LAB ORDER

Comprehensive metabolic panel (80053) ordered for annual wellness visit.

Venipuncture performed by clinical staff.`,
        correctDecision: "DENY",
        issues: [CLAIM_ISSUES.BUNDLED_CODE],
        correctCode: "80053 only",
        explanation: "CPT 36415 (venipuncture) is bundled into laboratory panels per NCCI edits. When billing a comprehensive metabolic panel (80053), the blood draw is included and cannot be billed separately."
    },
    {
        id: 10,
        day: 3,
        patient: { name: "Taylor, James", dob: "04/20/1958", insurance: "Medicare" },
        provider: "Dr. Sarah Chen",
        dateOfService: "01/19/2026",
        cptCode: "99214",
        icdCodes: ["M79.3"],
        modifier: null,
        chargedAmount: 125.00,
        additionalCodes: ["99213"],
        documentation: `PROGRESS NOTE

CHIEF COMPLAINT: Right knee pain.

HPI: 67 y/o male with right knee pain x 2 weeks. No injury recalled. Pain with stairs. Mild swelling.

EXAM: Right knee - mild effusion, no warmth, ROM slightly decreased.

ASSESSMENT: Knee pain, possible early osteoarthritis.

PLAN: X-ray ordered. Trial of physical therapy.`,
        correctDecision: "DENY",
        issues: [CLAIM_ISSUES.BUNDLED_CODE],
        correctCode: "99213",
        explanation: "Cannot bill both 99213 and 99214 for the same visit - only one E/M level can be billed per encounter. Additionally, this documentation only supports 99213, not 99214."
    },

    // DAY 4 CLAIMS - Medical Necessity Issues
    {
        id: 11,
        day: 4,
        patient: { name: "White, Patricia", dob: "01/12/1995", insurance: "Cigna" },
        provider: "Dr. Michael Brown",
        dateOfService: "01/20/2026",
        cptCode: "45380",
        icdCodes: ["Z12.11"],
        modifier: null,
        chargedAmount: 450.00,
        documentation: `PROCEDURE NOTE

PROCEDURE: Colonoscopy with biopsy.

INDICATION: Screening colonoscopy per patient request.

PATIENT AGE: 30 years old.

No family history of colorectal cancer.
No symptoms reported.
No prior polyps.

FINDINGS: Normal colonoscopy. Random biopsies taken for training purposes.`,
        correctDecision: "DENY",
        issues: [CLAIM_ISSUES.MEDICAL_NECESSITY],
        correctCode: "N/A - procedure not medically necessary",
        explanation: "Screening colonoscopy (Z12.11) is only covered for average-risk patients starting at age 45 (per updated guidelines). At age 30 with no symptoms, family history, or other risk factors, this procedure lacks medical necessity."
    },
    {
        id: 12,
        day: 4,
        patient: { name: "Harris, William", dob: "05/30/1960", insurance: "Medicare" },
        provider: "Dr. Lisa Park",
        dateOfService: "01/21/2026",
        cptCode: "72148",
        icdCodes: ["M54.5"],
        modifier: null,
        chargedAmount: 320.00,
        documentation: `RADIOLOGY ORDER

STUDY: MRI Lumbar Spine without contrast.

INDICATION: Low back pain x 3 days. No red flags. No radiculopathy.

CLINICAL NOTES: Patient requests MRI to "see what's going on."`,
        correctDecision: "DENY",
        issues: [CLAIM_ISSUES.MEDICAL_NECESSITY],
        correctCode: "N/A - conservative treatment first",
        explanation: "MRI for acute low back pain (< 6 weeks) without red flag symptoms (trauma, neurological deficits, fever, weight loss, history of cancer) lacks medical necessity. Guidelines require 4-6 weeks of conservative treatment before advanced imaging."
    },

    // DAY 5 CLAIMS - Complex/All Issues
    {
        id: 13,
        day: 5,
        patient: { name: "Clark, Richard", dob: "08/15/1972", insurance: "Blue Cross" },
        provider: "Dr. James Wilson",
        dateOfService: "01/22/2026",
        cptCode: "99214",
        icdCodes: ["J18.9"],
        modifier: null,
        chargedAmount: 125.00,
        claimDate: "05/01/2026",  // Filed 99 days after DOS
        documentation: `PROGRESS NOTE

CHIEF COMPLAINT: Cough and fever.

HPI: 53 y/o male with productive cough x 5 days, fever to 101.5, fatigue. Started after URI symptoms.

EXAM:
- Vitals: T 101.2, BP 130/82, HR 92, SpO2 94%
- Lungs: Right lower lobe crackles and decreased breath sounds
- CV: Tachycardic but regular

CXR: Right lower lobe infiltrate.

ASSESSMENT: Community-acquired pneumonia.

PLAN: Azithromycin Z-pack. Follow-up in 48-72 hours.`,
        correctDecision: "DENY",
        issues: [CLAIM_ISSUES.TIMELY_FILING],
        correctCode: "99214 (if filed timely)",
        explanation: "This claim was filed 99 days after the date of service, exceeding the 90-day timely filing limit for most payers. While the E/M coding appears appropriate, the claim must be denied due to late submission."
    },
    {
        id: 14,
        day: 5,
        patient: { name: "Lewis, Nancy", dob: "12/01/1980", insurance: "Aetna" },
        provider: "Dr. Sarah Chen",
        dateOfService: "01/23/2026",
        cptCode: "70553",
        icdCodes: ["G43.909"],
        modifier: null,
        chargedAmount: 580.00,
        documentation: `RADIOLOGY ORDER

STUDY: MRI Brain with and without contrast.

INDICATION: Migraine headaches. 

PRIOR AUTHORIZATION: Not obtained.

CLINICAL NOTES: Patient has had migraines for 10 years, well-controlled with sumatriptan. No new neurological symptoms. No change in headache pattern. Requesting MRI for reassurance.`,
        correctDecision: "DENY",
        issues: [CLAIM_ISSUES.MISSING_AUTH, CLAIM_ISSUES.MEDICAL_NECESSITY],
        correctCode: "N/A",
        explanation: "Two issues: (1) MRI Brain requires prior authorization which was not obtained. (2) Stable, long-standing migraines without red flags or neurological changes do not meet medical necessity criteria for advanced imaging."
    },
    {
        id: 15,
        day: 5,
        patient: { name: "Robinson, Mark", dob: "03/18/1968", insurance: "Medicare" },
        provider: "Dr. Michael Brown",
        dateOfService: "01/24/2026",
        cptCode: "99214",
        icdCodes: ["I10", "E78.5"],
        modifier: "-25",
        chargedAmount: 125.00,
        documentation: `PROGRESS NOTE

CHIEF COMPLAINT: Hypertension and hyperlipidemia follow-up.

HPI: 57 y/o male with well-controlled HTN on lisinopril 20mg daily and hyperlipidemia on atorvastatin 40mg. No chest pain, no SOB, no edema. Tolerating medications well. 

ROS: 10-system review documented, all negative except as noted.

EXAM:
- Vitals: BP 124/78, HR 68, BMI 28
- General: Well-appearing
- CV: RRR, no murmurs, no JVD
- Lungs: Clear
- Extremities: No edema

LABS: LDL 85, HDL 52, TG 140, A1c 5.8

ASSESSMENT:
1. Essential hypertension - at goal
2. Mixed hyperlipidemia - at goal

PLAN:
1. Continue current medications
2. Lifestyle counseling provided
3. Recheck in 6 months`,
        correctDecision: "APPROVE",
        issues: [CLAIM_ISSUES.VALID],
        correctCode: "99214-25",
        explanation: "Correctly coded. Documentation supports 99214 with multiple HPI elements, comprehensive ROS, multi-system exam, and moderate complexity MDM. Modifier -25 is appropriate if a procedure was also performed."
    }
];

// Helper to get claims for a specific day
export const getClaimsForDay = (day) => {
    return CLAIMS.filter(claim => claim.day === day);
};

// Helper to get random claims for gameplay (shuffled from pool)
export const getRandomClaimsForDay = (day, count) => {
    const dayClaims = getClaimsForDay(day);
    const shuffled = [...dayClaims].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
};

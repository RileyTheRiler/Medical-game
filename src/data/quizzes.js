export const QUIZ_DATA = {
    1: [
        { q: "What does HIPAA protect?", o: ["Financial data", "Patient health information (PHI)", "Provider credentials", "Insurance rates"], c: 1, e: "HIPAA's Privacy Rule protects patient health information from unauthorized disclosure." },
        { q: "What law prohibits submitting false claims to Medicare?", o: ["HIPAA", "Stark Law", "False Claims Act", "Anti-Kickback Statute"], c: 2, e: "The False Claims Act makes it illegal to submit false or fraudulent claims to government programs." },
        { q: "NCCI edits prevent which coding error?", o: ["Wrong patient", "Improper code combinations", "Missing signatures", "Late filing"], c: 1, e: "National Correct Coding Initiative edits identify code pairs that shouldn't be billed together." }
    ],
    2: [
        { q: "What does the suffix '-ectomy' mean?", o: ["Incision into", "Surgical removal", "Inflammation", "Visual exam"], c: 1, e: "-ectomy means surgical removal. Cholecystectomy = removal of gallbladder." },
        { q: "What does 'cholecystitis' mean?", o: ["Gallbladder removal", "Gallbladder inflammation", "Gallstone", "Bile duct disease"], c: 1, e: "Cholecyst = gallbladder, -itis = inflammation. Together: inflammation of the gallbladder." },
        { q: "What does 'bilateral' mean?", o: ["One side", "Both sides", "Front", "Back"], c: 1, e: "Bilateral means affecting or relating to both sides. Bi- = two, lateral = side." }
    ],
    3: [
        { q: "How many lobes does the right lung have?", o: ["2", "3", "4", "5"], c: 1, e: "Right lung has 3 lobes (upper, middle, lower). Left lung has only 2 lobes." },
        { q: "What are the four heart chambers?", o: ["2 atria, 2 ventricles", "4 ventricles", "4 atria", "1 atrium, 3 ventricles"], c: 0, e: "The heart has right atrium, left atrium, right ventricle, and left ventricle." },
        { q: "The femur is located in which body region?", o: ["Upper arm", "Lower leg", "Upper leg (thigh)", "Forearm"], c: 2, e: "The femur is the thigh bone, located in the upper leg between hip and knee." }
    ],
    4: [
        { q: "How many characters can an ICD-10-CM code have?", o: ["Exactly 5", "3 to 7", "Always 7", "4 to 6"], c: 1, e: "ICD-10-CM codes range from 3 to 7 characters. Always code to highest specificity." },
        { q: "What does the placeholder 'X' do in ICD-10-CM?", o: ["Marks deleted codes", "Holds position for 7th character", "Indicates bilateral", "Means unspecified"], c: 1, e: "Placeholder X fills empty positions so required 7th characters can be added." },
        { q: "What does '7th character A' typically indicate?", o: ["Sequela", "Subsequent encounter", "Initial encounter", "Bilateral"], c: 2, e: "A = Initial encounter (first time treated for this condition). D = Subsequent. S = Sequela." }
    ],
    5: [
        { q: "In outpatient coding, how do you code 'possible pneumonia'?", o: ["Code pneumonia", "Code signs/symptoms only", "Code both", "Don't code anything"], c: 1, e: "In outpatient, never code uncertain diagnoses. Code documented signs/symptoms instead." },
        { q: "When is Z23 (immunization) a first-listed diagnosis?", o: ["Never", "When visit is solely for immunization", "Only with other diagnoses", "Only for children"], c: 1, e: "Z23 can be first-listed when the encounter is specifically for receiving a vaccine." },
        { q: "When type of diabetes isn't documented, what do you code?", o: ["Type 1", "Type 2", "Query physician", "Unspecified"], c: 1, e: "Per guidelines, when diabetes type isn't specified, default to Type 2 (E11.-)." }
    ],
    6: [
        { q: "What does the + symbol indicate in CPT?", o: ["New code", "Add-on code", "Revised code", "Telemedicine"], c: 1, e: "The + symbol indicates an add-on code that can never be reported alone." },
        { q: "CPT Category I codes have how many digits?", o: ["4", "5", "6", "7"], c: 1, e: "Category I CPT codes have 5 numeric digits (e.g., 99213, 27447)." },
        { q: "What should you do after finding a code in the CPT Index?", o: ["Bill it immediately", "Verify in Tabular List", "Add modifiers", "Check HCPCS"], c: 1, e: "Never code from the Index alone. Always verify in the Tabular List for instructions." }
    ],
    7: [
        { q: "Modifier -25 is used for:", o: ["Bilateral procedure", "Significant separate E/M same day as procedure", "Reduced services", "Repeat procedure"], c: 1, e: "Modifier -25 indicates a significant, separately identifiable E/M service on the same day as a procedure." },
        { q: "Modifier -26 represents:", o: ["Technical component", "Professional component", "Bilateral", "Reduced services"], c: 1, e: "-26 = Professional component (interpretation). -TC = Technical component (equipment/technician)." },
        { q: "When is modifier -59 appropriate?", o: ["Always with multiple procedures", "When procedures are distinct/separate", "For reduced services", "For bilateral only"], c: 1, e: "Modifier -59 indicates a distinct procedural service when codes might otherwise be bundled." }
    ],
    8: [
        { q: "J-codes represent:", o: ["Equipment", "Injected drugs", "Lab tests", "Procedures"], c: 1, e: "J-codes (J0000-J9999) represent drugs administered by injection or infusion." },
        { q: "If J1885 is 'per 15mg' and you give 30mg, how many units?", o: ["1", "2", "15", "30"], c: 1, e: "30mg ÷ 15mg per unit = 2 units. Always match administered dose to code units." },
        { q: "E-codes in HCPCS represent:", o: ["Emergency services", "Durable Medical Equipment", "Evaluation services", "Enteral nutrition"], c: 1, e: "E-codes (E0100-E9999) are for Durable Medical Equipment like wheelchairs and CPAP." }
    ],
    9: [
        { q: "A 1.0 cm benign lesion excised with 0.3 cm margins - total size?", o: ["1.0 cm", "1.3 cm", "1.6 cm", "0.3 cm"], c: 2, e: "Lesion (1.0) + margin on each side (0.3 + 0.3) = 1.6 cm total excised diameter." },
        { q: "Simple closure is included in which excision codes?", o: ["Never", "All excision codes", "Only malignant lesions", "Only benign lesions"], c: 1, e: "Simple repair/closure is included in excision codes. Only code closure separately if intermediate or complex." },
        { q: "Intermediate repair requires:", o: ["Single layer only", "Layered closure OR extensive cleaning", "Always two surgeons", "General anesthesia"], c: 1, e: "Intermediate repair involves layered closure of deeper tissue OR extensive contaminated wound cleaning." }
    ],
    10: [
        { q: "ORIF stands for:", o: ["Outpatient Repair Internal Fixation", "Open Reduction Internal Fixation", "Original Reconstruction In Facility", "Open Restoration Intra-operative Fusion"], c: 1, e: "ORIF = Open Reduction Internal Fixation. Open surgical realignment with hardware placement." },
        { q: "Surgical arthroscopy includes diagnostic arthroscopy:", o: ["Never", "Always", "Only for knee", "Only with modifier"], c: 1, e: "Per CPT guidelines, surgical arthroscopy always includes diagnostic arthroscopy." },
        { q: "A 90-day global period means:", o: ["Bill every 90 days", "Post-op follow-up included for 90 days", "Patient discharged in 90 days", "Modifier required"], c: 1, e: "Routine post-operative care within 90 days is included in the surgical package." }
    ],
    11: [
        { q: "Left heart catheterization accesses:", o: ["Right atrium/ventricle", "Left atrium/ventricle/coronary arteries", "All four chambers", "Pulmonary artery only"], c: 1, e: "Left heart cath accesses left-sided structures including coronary arteries via arterial access." },
        { q: "CABG coding is based on:", o: ["Time", "Number and type of grafts", "Patient age", "Diagnosis only"], c: 1, e: "CABG codes depend on the number of grafts and whether venous or arterial grafts are used." },
        { q: "What does bronchoscopy with BAL mean?", o: ["Biopsy of lesion", "Bronchoalveolar lavage - cell washing", "Balloon dilation", "Laser ablation"], c: 1, e: "BAL = Bronchoalveolar Lavage, washing cells from airways for examination." }
    ],
    12: [
        { q: "Can you code diagnostic colonoscopy with surgical colonoscopy?", o: ["Yes, always", "No, surgical includes diagnostic", "Only with modifier", "Only for Medicare"], c: 1, e: "Surgical endoscopy includes diagnostic. Don't code diagnostic separately when surgical is performed." },
        { q: "An incarcerated hernia means:", o: ["Small hernia", "Contents trapped, cannot be reduced", "Recurrent hernia", "Bilateral hernia"], c: 1, e: "Incarcerated means hernia contents are trapped and cannot be pushed back into the abdomen." },
        { q: "Lap chole converted to open is coded:", o: ["Both codes", "Lap only with modifier", "Open only", "Cannot bill"], c: 2, e: "When laparoscopic converts to open, code only the open procedure. The lap approach is not separate." }
    ],
    13: [
        { q: "Surgical cystoscopy includes:", o: ["Nothing extra", "Diagnostic cystoscopy", "All stents", "Anesthesia"], c: 1, e: "Surgical cystoscopy always includes diagnostic cystoscopy - don't code 52000 separately." },
        { q: "Global OB (59400) includes:", o: ["Delivery only", "Antepartum + delivery + postpartum", "Only prenatal care", "Only hospital care"], c: 1, e: "Global OB includes all antepartum visits, the delivery, and postpartum care by one provider." },
        { q: "Bilateral salpingo-oophorectomy removes:", o: ["Uterus only", "Both tubes and both ovaries", "Cervix", "Bladder"], c: 1, e: "Salpingo = tubes, oophor = ovaries. Bilateral = both sides. All tubes and ovaries removed." }
    ],
    14: [
        { q: "Lumbar laminectomy at L4-L5 and L5-S1 = how many levels?", o: ["1", "2", "3", "4"], c: 1, e: "L4-L5 is one level, L5-S1 is another. Two interspaces = primary code + add-on for additional." },
        { q: "Standard cataract surgery (66984) includes:", o: ["IOL separate", "IOL insertion included", "Only lens removal", "Corneal work"], c: 1, e: "Cataract extraction code includes IOL (intraocular lens) insertion - don't code separately." },
        { q: "Carpal tunnel release CPT section:", o: ["Integumentary", "Nervous System", "Musculoskeletal", "Medicine"], c: 1, e: "Carpal tunnel release (64721) is in the Nervous System section - it's a nerve procedure." }
    ],
    15: [
        { q: "Anesthesia is calculated using:", o: ["Flat fee", "Base units + time units + modifying units", "CPT code only", "Surgeon's fee"], c: 1, e: "Formula: (Base + Time + Modifying Units) × Conversion Factor = Payment" },
        { q: "P3 physical status modifier indicates:", o: ["Normal healthy", "Mild systemic disease", "Severe systemic disease", "Brain death"], c: 2, e: "P3 = severe systemic disease. P1 = healthy, P2 = mild disease, P4 = severe constant threat." },
        { q: "Multiple procedures during one anesthesia:", o: ["Add all base units", "Use highest base units only", "Average the units", "Bill separately"], c: 1, e: "For multiple procedures, use only the code with highest base value. Time continues throughout." }
    ],
    16: [
        { q: "Modifier -26 on radiology represents:", o: ["Technical component", "Professional component", "Complete exam", "Bilateral"], c: 1, e: "-26 = Professional component (radiologist interpretation). -TC = Technical (equipment/tech)." },
        { q: "A lab panel can only be billed if:", o: ["Most tests done", "ALL listed tests performed", "Physician orders it", "Patient requests"], c: 1, e: "All component tests in a panel must be performed to bill the panel code." },
        { q: "Surgical pathology level is determined by:", o: ["Diagnosis found", "Specimen type", "Surgeon preference", "Lab preference"], c: 1, e: "Pathology levels (88300-88309) are based on the specimen type, not the final diagnosis." }
    ],
    17: [
        { q: "For office E/M, MDM requires how many elements?", o: ["All 3", "2 of 3", "1 of 3", "Just the highest"], c: 1, e: "Medical Decision Making requires 2 of 3 elements (problems, data, risk) at or above the level." },
        { q: "New patient office visit codes are:", o: ["99201-99205", "99202-99205", "99211-99215", "99221-99223"], c: 1, e: "New patient office visits are 99202-99205 (99201 deleted). Established = 99211-99215." },
        { q: "Modifier -25 goes on which service?", o: ["Procedure", "E/M code", "Both codes", "Neither"], c: 1, e: "Modifier -25 is appended to the E/M code when a significant separate E/M is done same day as procedure." }
    ],
    18: [
        { q: "Immunization coding requires:", o: ["Admin code only", "Vaccine code only", "Both admin code + vaccine code", "E/M code only"], c: 2, e: "Complete immunization coding: administration code (90471) + vaccine product code (90xxx/J-code)." },
        { q: "IV infusion hierarchy (highest to lowest):", o: ["Hydration > Infusion > Chemo", "Chemo > Infusion > Hydration", "All equal", "Push > Infusion > Hydration"], c: 1, e: "Hierarchy: Chemotherapy > Therapeutic infusion > Hydration. Code initial from highest level." },
        { q: "CPC exam has how many questions?", o: ["50", "100", "150", "200"], c: 1, e: "CPC exam = 100 questions in 4 hours. Need 70% (70 correct) to pass. Open book allowed." }
    ]
};

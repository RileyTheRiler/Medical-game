export const BOSSES = [
    {
        id: 1,
        title: "The Weekend Warrior",
        subtitle: "Ortho & Integrity Boss",
        description: "A patient arrives on a busy Sunday with a complex fracture. Can you navigate the triage, surgery, and billing without triggering an audit?",
        icon: "⚔️",
        color: "#dc2626",
        characterId: "auditorQueen", // Links to BOSS_CHARACTERS for narrative dialogues
        xpReward: 500,
        unlockReq: { chapterId: 10, label: "Unlock after Chapter 10" },
        stages: [
            {
                id: 1,
                type: "dialogue",
                speaker: "Triage Nurse",
                text: "John Doe (45M) Fell off a ladder. Right leg is swollen, deformed. He's asking if his insurance covers 'everything'. He also mentioned he had a beer before the fall."
            },
            {
                id: 2,
                type: "question",
                prompt: "First Priority: What immediate anatomy is compromised based on 'deformed lower leg'?",
                options: [
                    { text: "Femur", correct: false, feedback: "Femur is the thigh/upper leg." },
                    { text: "Tibia/Fibula", correct: true, feedback: "Correct. Lower leg bones." },
                    { text: "Humerus", correct: false, feedback: "Humerus is the arm." },
                    { text: "Patella", correct: false, feedback: "Patella is the knee cap." }
                ],
                damage: 20 // Damage if wrong
            },
            {
                id: 3,
                type: "dialogue",
                speaker: "Dr. Cutter (Surgeon)",
                text: "X-ray confirms a comminuted fracture of the right tibial shaft. I'm taking him to the OR for an Intramedullary Nailing. Get the paperwork ready."
            },
            {
                id: 4,
                type: "question",
                prompt: "Coding Challenge: Select the correct CPT for 'IM nailing of tibial shaft fracture'.",
                options: [
                    { text: "27750 - Closed tx tibial shaft fx", correct: false },
                    { text: "27759 - Treatment of tibial shaft fx by intramedullary implant", correct: true },
                    { text: "27780 - Closed tx proximal fibula fx", correct: false },
                    { text: "27792 - Open tx distal fibula fx", correct: false }
                ],
                damage: 30
            },
            {
                id: 5,
                type: "dialogue",
                speaker: "Billing Manager",
                text: "Wait! The chart says he was 'intoxicated'. Insurance might fight this. Also, the doctor added a 'modifier -22' because it was 'hard'. Is that justified?"
            },
            {
                id: 6,
                type: "question",
                prompt: "Compliance Check: The Op Report says 'standard approach, no complications'. Is Modifier -22 (Increased Procedural Services) allowed?",
                options: [
                    { text: "Yes, because it was a weekend surgery.", correct: false },
                    { text: "Yes, trauma is always hard.", correct: false },
                    { text: "No. Documentation does not support substantial additional work.", correct: true, feedback: "Correct. Misusing -22 is an audit trigger!" },
                    { text: "Yes, if the patient agrees to pay.", correct: false }
                ],
                damage: 50
            },
            {
                id: 7,
                type: "dialogue",
                speaker: "System",
                text: "Claim Submitting..."
            }
        ]
    }
];

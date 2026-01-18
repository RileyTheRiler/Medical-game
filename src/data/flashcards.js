export const FLASHCARD_DECKS = [
    {
        id: 'terms',
        title: 'Medical Terminology',
        icon: '📚',
        color: '#7c3aed',
        description: 'Common prefixes, suffixes, and root words.',
        cards: [
            { id: 1, front: 'Brady-', back: 'Slow (e.g., Bradycardia)' },
            { id: 2, front: 'Tachy-', back: 'Fast (e.g., Tachycardia)' },
            { id: 3, front: '-ectomy', back: 'Surgical removal (e.g., Appendectomy)' },
            { id: 4, front: '-itis', back: 'Inflammation (e.g., Arthritis)' },
            { id: 5, front: 'Dys-', back: 'Painful, difficult, or abnormal (e.g., Dyspnea)' },
            { id: 6, front: '-ostomy', back: 'Surgical creation of an opening (e.g., Colostomy)' },
            { id: 7, front: '-plasty', back: 'Surgical repair (e.g., Rhinoplasty)' },
            { id: 8, front: 'Hyper-', back: 'Excessive, above normal (e.g., Hypertension)' },
            { id: 9, front: 'Hypo-', back: 'Deficient, below normal (e.g., Hypoglycemia)' },
            { id: 10, front: 'Retro-', back: 'Behind, backward (e.g., Retroperitoneal)' }
        ]
    },
    {
        id: 'modifiers',
        title: 'CPT Modifiers',
        icon: '🔧',
        color: '#8b5cf6',
        description: 'Essential modifiers for coding accuracy.',
        cards: [
            { id: 1, front: '-25', back: 'Significant, separately identifiable E/M service by same physician on same day of procedure.' },
            { id: 2, front: '-59', back: 'Distinct procedural service. Indicates a procedure is separate from others performed on same day.' },
            { id: 3, front: '-50', back: 'Bilateral procedure.' },
            { id: 4, front: '-RT / -LT', back: 'Right side / Left side (HCPCS Level II modifiers).' },
            { id: 5, front: '-26', back: 'Professional component. (Physician\'s work only).' },
            { id: 6, front: '-TC', back: 'Technical component. (Equipment/facility cost only).' },
            { id: 7, front: '-51', back: 'Multiple procedures. Reduced payment for subsequent procedures.' },
            { id: 8, front: '-53', back: 'Discontinued procedure (Physician stopped due to risk).' },
            { id: 9, front: '-76', back: 'Repeat procedure by same physician.' },
            { id: 10, front: '-AA', back: 'Anesthesia performed personally by anesthesiologist.' }
        ]
    },
    {
        id: 'anatomy',
        title: 'Anatomy Review',
        icon: '🫀',
        color: '#dc2626',
        description: 'Key anatomical terms and locations.',
        cards: [
            { id: 1, front: 'Distal', back: 'Farther from the point of attachment or origin.' },
            { id: 2, front: 'Proximal', back: 'Closer to the point of attachment or origin.' },
            { id: 3, front: 'Anterior (Ventral)', back: 'Front of the body.' },
            { id: 4, front: 'Posterior (Dorsal)', back: 'Back of the body.' },
            { id: 5, front: 'Phalanges', back: 'Bones of the fingers and toes.' },
            { id: 6, front: 'Femur', back: 'Thigh bone (longest bone in body).' },
            { id: 7, front: 'Clavicle', back: 'Collarbone.' },
            { id: 8, front: 'Sternum', back: 'Breastbone.' },
            { id: 9, front: 'Renal', back: 'Pertaining to the kidneys.' },
            { id: 10, front: 'Hepatic', back: 'Pertaining to the liver.' }
        ]
    }
];

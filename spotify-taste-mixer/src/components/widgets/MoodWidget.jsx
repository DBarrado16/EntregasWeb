'use client'

const MOODS = [
    { label: 'Energética', value: 'energetic', energy: 'high', valence: 'high' },
    { label: 'Relajada', value: 'chill', energy: 'low', valence: 'medium' },
    { label: 'Melancólica', value: 'sad', energy: 'low', valence: 'low' },
    { label: 'Fiesta', value: 'party', energy: 'high', valence: 'high' },
    { label: 'Tranquila', value: 'calm', energy: 'low', valence: 'medium' },
    { label: 'Motivadora', value: 'motivating', energy: 'high', valence: 'medium' }
]

export default function MoodWidget({slectedMood, onSelect}) {
    return(
        <div className="bg-neutral-800 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-3">Mood</h3>

            <div className="grid grid-cols-2 gap-2">
                {MOODS.map(mood => (
                    <button
                        key={mood.value}
                        onClick={() => onSelect(mood)}
                        className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                            slectedMood?.value === mood.value
                                ? 'bg-green-500 text-black'
                                : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                        }`}
                    >
                        {mood.label}
                    </button>
                ))}
            </div>
        </div>
    )
}
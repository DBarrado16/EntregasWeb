'use client'

const POPULARITY_OPTIONS = [
    { label: 'Hits mainstream', value: 'high', description: 'Lo más sonado' },
    { label: 'Popular', value: 'medium', description: 'Conocidos'},
    { label: 'De nicho', value: 'low', description: 'Joyitas ocultas' }
]

export default function PopularityWidget({ selectedPopularity, onSelect }){
    return(
        <div className="bg-neutral-800 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-4">Popularidad</h3>

            <div className="flex flex-col gap-2">
                {POPULARITY_OPTIONS.map(option => (
                    <button 
                        key={option.value}
                        onClick={() => onSelect(option.value)}
                        className={`px-4 py-3 rounded-lg text-left transition-colors ${
                            selectedPopularity === option.value
                            ? 'bg-green-500 text-black'
                            : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                        }`}
                    >
                        <span className="font-medium">{option.label}</span>
                        <span className="block text-xs opacity-70">{option.description}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}
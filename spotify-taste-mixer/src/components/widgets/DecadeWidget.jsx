'use client'

const DECADES = [
    { label: '2020s', start: 2020, end: 2025 },
    { label: '2010s', start: 2010, end: 2019 },
    { label: '2000s', start: 2000, end: 2009 },
    { label: '90s', start: 1990, end: 1999 },
    { label: '80s', start: 1980, end: 1989 },
    { label: '70s', start: 1970, end: 1979 },
    { label: '60s', start: 1960, end: 1969 },
    { label: '50s', start: 1950, end: 1959 }
]

export default function DecadeWidget({ selectedDecades, onSelect }){
    const toggleDecade = (decade) => {
        const exists = selectedDecades.find(d => d.label === decade.label)

        if(exists){
            onSelect(selectedDecades.filter(d => d.label !== decade.label))
        } else if (selectedDecades.length < 3) {
            onSelect([...selectedDecades, decade])
        }
    }

    return(
        <div className="bg-neutral-800 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-3">Décadas</h3>

            <div className="grid grid-cols-2 gap-2">
                {DECADES.map(decade => (
                    <button
                        key={decade.label}
                        onClick={() => toggleDecade(decade)}
                        className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedDecades.find(d => d.label === decade.label)
                                ? 'bg-green-500 text-black'
                                : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                        }`}
                    >
                        {decade.label}
                    </button>
                ))}
            </div>

            {selectedDecades.length > 0 && (
                <p className="text-neutral-400 text-xs mt-2">
                    {selectedDecades.length}/3 seleccionadas
                </p>
            )}
        </div>
    )
}
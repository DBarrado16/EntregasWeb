'use client'

const DECADES = [
    { label: 'lo urtimo', start: 2020, end: 2025 },
    { label: 'tiene tiempo', start: 2010, end: 2019 },
    { label: 'de tu época', start: 2000, end: 2009 },
    { label: 'de mi época', start: 1990, end: 1999 },
    { label: 'disco?', start: 1980, end: 1989 },
    { label: 'la era dorá', start: 1970, end: 1979 },
    { label: 'mu bueno', start: 1960, end: 1969 },
    { label: 'mas tiempo ke andar pa lante', start: 1950, end: 1959 }
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
        <div className="bg-gradient-to-br from-red-950/90 to-amber-950/90 rounded-2xl p-5 border-2 border-amber-500/30 shadow-xl shadow-red-900/20 relative overflow-hidden">
            <h3 className="text-amber-100 font-bold text-lg mb-4 flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>Elige tu época niño</h3>

            <div className="grid grid-cols-2 gap-2">
                {DECADES.map(decade => (
                    <button
                        key={decade.label}
                        onClick={() => toggleDecade(decade)}
                        disabled={selectedDecades.length >= 3 && !selectedDecades.find(d => d.label === decade.label)}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                            selectedDecades.find(d => d.label === decade.label)
                                ? 'bg-gradient-to-r from-amber-500 to-red-500 text-white shadow-lg shadow-amber-500/30 scale-105 border-2 border-amber-400'
                                : 'bg-red-900/50 text-amber-200/80 hover:bg-red-800/60 border border-amber-500/20 hover:border-amber-500/50'
                        }disabled:opacity-40 disabled:cursor-not-allowed`}
                    >
                        {decade.label}
                    </button>
                ))}
            </div>

            {selectedDecades.length > 0 && (
                <p className="text-amber-400/60 text-xs mt-4 text-center italic">
                    {selectedDecades.length} de 3 seleccionás
                </p>
            )}
        </div>
    )
}
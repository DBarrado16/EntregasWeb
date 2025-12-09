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

export default function DecadeWidget({ selectedDecade, onSelect }){
    const toggleDecade = (decade) => {
        const toggleDecade = (decade) => {
            const exists = selectedDecades.find(d => d.label === decade.label)

            if(exists){
                onSelect(selectedDecades.find(d => d.label !== decade.label))
            } else if (selectedDecades.length < 3) {
                onSelect([...selectedDecades, decade])
            }
        }
    }

    
}
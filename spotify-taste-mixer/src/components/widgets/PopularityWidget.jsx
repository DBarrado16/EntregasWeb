'use client'

import { useState, useEffect } from 'react'

export default function PopularityWidget({ selectedPopularity, onSelect }){

    const [value, setValue] = useState(50)

    useEffect(() => {
        if(value >= 70){
            onSelect('high')
        }else if(value >= 40){
            onSelect('medium')
        }else{
            onSelect('low')
        } 
    }, [value, onSelect])

    const getPopularityInfo = () => {
        if(value >= 70){
            return{imagen: '/images/camaron.png', label: 'Las buenas rumbitas oleee', description: 'Suena en tos laos' }
        }else if(value >= 40){
            return { imagen: '/images/losChichos.png', label: 'Un poco payo', description: 'Pero no pasa ná' }
        }else{
            return { imagen: '/images/elcigala.png', label: 'Lo conoce el patriarca solo', description: 'No suena ni en las bodas de los payos' }
        }
    }

    const info = getPopularityInfo()

    return(
        <div className="bg-gradient-to-br from-red-950/90 to-amber-950/90 rounded-2xl p-5 border-2 border-amber-500/30 shadow-xl shadow-red-900/20 relative overflow-hidden">
            <h3 className="text-amber-100 font-bold text-lg mb-4 flex items-center gap-2">Cómo de reconocío lo quieres</h3>

            <div className="flex flex-col gap-3">
                <div className="text-center flex flex-col items-center">
                    <img 
                        src={info.imagen} 
                        alt={info.label} 
                        className="w-40 h-40 object-contain"
                    />
                    <p className="text-white font-medium mt-1">{info.label}</p>
                    <p className="text-neutral-400 text-xs">{info.description}</p>
                </div>

                <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                    style={{
                        background: `linear-gradient(to right, #eab308 0%, #eab308 ${value}%, #404040 ${value}%, #404040 100%)`
                    }}
                />

                <div className="flex justify-between text-xs text-neutral-500">
                    <span>Ocurto</span>
                    <span>Lo más sonao</span>
                </div>

            </div>
        </div>
    )
}
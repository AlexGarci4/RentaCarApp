import React, { useState, useEffect, useRef } from 'react';
import { CARS } from './data';
import { Car, CarCategory, ViewState } from './types';
import { getCarAssistantResponse } from './services/geminiService';

// --- SUB-COMPONENTS ---

interface HeaderProps {
    title?: string;
    onBack?: () => void;
    rightAction?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, onBack, rightAction }) => (
  <div className="sticky top-0 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 pb-2 flex items-center justify-between border-b border-black/5 dark:border-white/5">
    <div className="w-10">
        {onBack && (
        <button onClick={onBack} className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full active:bg-black/5 dark:active:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-slate-800 dark:text-white">arrow_back_ios_new</span>
        </button>
        )}
    </div>
    <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">{title}</h2>
    <div className="w-10 flex justify-end">
        {rightAction || (
             <button className="flex items-center justify-center w-10 h-10 -mr-2 rounded-full active:bg-black/5 dark:active:bg-white/10 transition-colors">
                <span className="material-symbols-outlined text-slate-800 dark:text-[#b99d9d]">menu</span>
            </button>
        )}
    </div>
  </div>
);

interface FeatureChipProps {
    icon: string;
    label: string;
}

const FeatureChip: React.FC<FeatureChipProps> = ({ icon, label }) => (
    <span className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300 flex items-center gap-1.5">
        <span className="material-symbols-outlined text-[16px]">{icon}</span> {label}
    </span>
);

interface SpecBoxProps {
    icon: string;
    value: string;
    label: string;
}

const SpecBox: React.FC<SpecBoxProps> = ({ icon, value, label }) => (
    <div className="aspect-square rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center gap-1 hover:bg-white/10 transition cursor-default">
        <span className="material-symbols-outlined text-primary text-[24px]">{icon}</span>
        <span className="text-white font-bold text-sm">{value}</span>
        <span className="text-[10px] text-gray-500">{label}</span>
    </div>
);

// --- VIEWS ---

const WelcomeView = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col justify-between overflow-hidden animate-fade-in">
        {/* Background */}
        <div className="absolute top-0 left-0 w-full h-[65vh] overflow-hidden z-0">
            <div className="w-full h-full bg-cover bg-center scale-105" 
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBzEdyrOAaejqPku-c4xtenA9QEH-5zKXm3sCa4kmqIgywzrGBCynnw7HE_lmPdhehzQLqHCra993ar3JRmaLSmioWFvwa2qCW32ZrTjHtr9IXjJEOmlAlb2xg8BV-pulW-TKozLVMDWRw8L5QvK4H4CcPu7WfDx23XmsaZWkfqRgT6vL8yuioz4jiq52T2vYlHQp2cWTbFKlguZ5rlU9r-hPtOK9XpuLRatZ-heilNak07Nm1ZSzd0B7PUJQWTpe9dtOgvN8dqabuR")'}}>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background-light dark:to-background-dark"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light/20 dark:via-background-dark/20 to-transparent"></div>
        </div>

        {/* Top Nav */}
        <div className="relative z-10 w-full px-6 pt-12 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-xl">directions_car</span>
                </div>
                <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">Velocidad</span>
            </div>
            <button className="text-white/80 hover:text-white font-medium text-sm backdrop-blur-sm bg-black/20 px-3 py-1 rounded-full border border-white/10">
                Ayuda
            </button>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col justify-end flex-grow px-6 pb-8 pt-20 animate-slide-up">
            <div className="flex flex-col items-center text-center space-y-4 mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-xs font-medium text-white/90 uppercase tracking-wider">Premium Service</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white">
                    Movilidad <span className="text-primary">Premium</span> a tu alcance
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg font-normal leading-relaxed max-w-xs mx-auto">
                    Sin papeleos. Reserva tu coche ideal directamente desde WhatsApp.
                </p>
            </div>

            {/* Icons */}
            <div className="flex justify-center gap-8 mb-10 opacity-70">
                {[
                    {icon: 'speed', label: 'Rápido'}, 
                    {icon: 'verified_user', label: 'Seguro'}, 
                    {icon: 'chat', label: '24/7'}
                ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                        <span className="material-symbols-outlined text-2xl text-primary">{item.icon}</span>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-slate-500">{item.label}</span>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 w-full max-w-md mx-auto">
                <button onClick={onStart} className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-primary hover:bg-red-600 transition-all duration-300 shadow-lg shadow-primary/25">
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="text-white text-lg font-bold leading-normal tracking-[0.015em] flex items-center gap-2">
                        Explorar coches
                        <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </span>
                </button>
                <button className="flex w-full cursor-pointer items-center justify-center rounded-xl h-12 px-4 bg-transparent hover:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-semibold leading-normal tracking-[0.015em]">
                    <span className="truncate">¿Ya tienes cuenta? <span className="text-primary underline underline-offset-4 decoration-primary/30">Iniciar Sesión</span></span>
                </button>
            </div>
            
            <div className="mt-6 flex justify-center">
                <div className="h-1 w-1/3 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
            </div>
        </div>
    </div>
  );
};

const CatalogView = ({ onSelectCar }: { onSelectCar: (car: Car) => void }) => {
    const [filter, setFilter] = useState<CarCategory | 'Todos'>('Todos');
    const [search, setSearch] = useState('');

    const filteredCars = CARS.filter(car => {
        const matchesCategory = filter === 'Todos' || car.category === filter;
        const matchesSearch = car.name.toLowerCase().includes(search.toLowerCase()) || car.brand.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="animate-fade-in pb-20">
            <Header title="Selección de Vehículo" />
            
            {/* Search */}
            <div className="px-4 py-4 space-y-4">
                <label className="flex flex-col h-12 w-full shadow-sm">
                    <div className="flex w-full flex-1 items-stretch rounded-xl h-full overflow-hidden bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 group focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
                        <div className="text-gray-400 dark:text-[#b99d9d] flex items-center justify-center pl-4 pr-2">
                            <span className="material-symbols-outlined">search</span>
                        </div>
                        <input 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex w-full min-w-0 flex-1 resize-none bg-transparent border-none text-slate-900 dark:text-white focus:outline-0 focus:ring-0 h-full placeholder:text-gray-400 dark:placeholder:text-[#b99d9d] px-2 text-base font-normal leading-normal" 
                            placeholder="Buscar modelo (ej. Audi R8)..." 
                        />
                        <div className="flex items-center pr-2">
                            <button className="p-2 text-gray-400 dark:text-[#b99d9d]">
                                <span className="material-symbols-outlined">tune</span>
                            </button>
                        </div>
                    </div>
                </label>

                {/* Categories */}
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                    {['Todos', ...Object.values(CarCategory)].map((cat) => (
                         <button 
                            key={cat}
                            onClick={() => setFilter(cat as any)}
                            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-all active:scale-95 ${
                                filter === cat 
                                ? 'bg-primary shadow-lg shadow-primary/25 text-white' 
                                : 'bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/5 text-slate-600 dark:text-white active:bg-gray-100 dark:active:bg-white/5'
                            }`}
                        >
                            <p className="text-sm font-semibold leading-normal">{cat}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* List */}
            <div className="flex flex-col gap-5 px-4 pb-4">
                {filteredCars.map(car => (
                    <div key={car.id} onClick={() => onSelectCar(car)} className="flex flex-col items-stretch justify-start rounded-2xl bg-white dark:bg-surface-dark shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-none overflow-hidden group cursor-pointer active:scale-[0.99] transition-transform">
                        <div className="relative w-full aspect-video overflow-hidden">
                            <div className="absolute top-3 right-3 z-10">
                                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-primary transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                                </button>
                            </div>
                            <div className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105" 
                                style={{backgroundImage: `url("${car.imageUrl}")`}}>
                            </div>
                            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                                <p className="text-white font-bold text-sm">${car.price} <span className="text-xs font-normal text-gray-300">/ día</span></p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 p-4">
                            <div>
                                <p className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">{car.name}</p>
                                <p className="text-slate-500 dark:text-[#b99d9d] text-sm font-normal mt-1">{car.model} • {car.specs.transmission}</p>
                            </div>
                            <div className="flex gap-4 py-2 border-t border-b border-gray-100 dark:border-white/5">
                                <div className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-slate-400 text-[18px]">speed</span>
                                    <span className="text-xs font-medium text-slate-600 dark:text-gray-300">{car.specs.speed}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-slate-400 text-[18px]">airline_seat_recline_extra</span>
                                    <span className="text-xs font-medium text-slate-600 dark:text-gray-300">{car.specs.seats} Asientos</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-slate-400 text-[18px]">{car.specs.fuel === 'Eléctrico' ? 'electric_bolt' : 'local_gas_station'}</span>
                                    <span className="text-xs font-medium text-slate-600 dark:text-gray-300">{car.specs.fuel}</span>
                                </div>
                            </div>
                            <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl h-11 px-4 bg-primary hover:bg-red-700 transition-all text-white text-sm font-bold shadow-lg shadow-primary/20">
                                <span className="truncate">Ver Detalles</span>
                                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                ))}
                {filteredCars.length === 0 && (
                     <div className="text-center py-10 text-gray-500">
                        <span className="material-symbols-outlined text-4xl mb-2">no_crash</span>
                        <p>No se encontraron vehículos.</p>
                     </div>
                )}
            </div>

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 left-0 w-full bg-white/95 dark:bg-background-dark/95 backdrop-blur-lg border-t border-gray-200 dark:border-white/5 pb-6 pt-3 px-6 z-50">
                <ul className="flex justify-between items-end">
                    <li><button className="flex flex-col items-center gap-1 text-primary"><span className="material-symbols-outlined filled">directions_car</span><span className="text-[11px] font-semibold">Coches</span></button></li>
                    <li><button className="flex flex-col items-center gap-1 text-gray-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">calendar_month</span><span className="text-[11px] font-medium">Reservas</span></button></li>
                    <li><button className="flex flex-col items-center gap-1 text-gray-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">favorite</span><span className="text-[11px] font-medium">Favoritos</span></button></li>
                    <li><button className="flex flex-col items-center gap-1 text-gray-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">account_circle</span><span className="text-[11px] font-medium">Perfil</span></button></li>
                </ul>
            </nav>
        </div>
    );
};

const DetailsView = ({ car, onBack, onBook }: { car: Car, onBack: () => void, onBook: () => void }) => {
    return (
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-24 animate-fade-in bg-background-light dark:bg-background-dark">
             {/* Floating Header Actions */}
            <div className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 pt-12 pb-4 bg-gradient-to-b from-black/70 to-transparent pointer-events-none">
                <button onClick={onBack} className="pointer-events-auto flex size-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white transition hover:bg-white/20">
                    <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                </button>
                <button className="pointer-events-auto flex size-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white transition hover:bg-white/20 active:scale-95">
                    <span className="material-symbols-outlined text-[24px]">favorite</span>
                </button>
            </div>

            {/* Hero */}
            <div className="relative h-[55vh] w-full shrink-0">
                <div className="h-full w-full bg-cover bg-center" style={{backgroundImage: `url("${car.imageUrl}")`}}></div>
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent"></div>
                 {/* Carousel Indicators */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    <div className="h-1.5 w-6 rounded-full bg-primary shadow-[0_0_10px_rgba(236,19,19,0.5)]"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-white/40"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-white/40"></div>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 -mt-6 flex flex-col px-5">
                <div className="mb-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-sm font-semibold tracking-widest text-primary uppercase mb-1">{car.category}</h2>
                            <h1 className="text-3xl font-extrabold text-white leading-[1.1]">{car.name}</h1>
                        </div>
                        <div className="flex flex-col items-end pt-1">
                             <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg backdrop-blur-sm">
                                <span className="material-symbols-outlined text-yellow-400 text-[16px] filled">star</span>
                                <span className="text-xs font-bold text-white">{car.rating}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing */}
                <div className="mb-8 rounded-xl bg-white/5 border border-white/5 p-4 flex items-center justify-between backdrop-blur-sm">
                    <div>
                        <p className="text-gray-400 text-xs font-medium">Precio por día</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-white">${car.price}</span>
                            <span className="text-sm text-gray-500">USD</span>
                        </div>
                    </div>
                    <div className="h-8 w-[1px] bg-white/10"></div>
                    <div>
                        <p className="text-gray-400 text-xs font-medium">Depósito</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg font-semibold text-white">${car.deposit}</span>
                        </div>
                    </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-4">Especificaciones</h3>
                <div className="grid grid-cols-4 gap-3 mb-8">
                    <SpecBox icon="speed" value={car.specs.speed} label="Velocidad" />
                    <SpecBox icon="timer" value={car.specs.acceleration} label="0-100" />
                    <SpecBox icon={car.specs.fuel === 'Eléctrico' ? 'electric_bolt' : 'local_gas_station'} value={car.specs.fuel === 'Eléctrico' ? 'EV' : 'Gas'} label="Combustible" />
                    <SpecBox icon="airline_seat_recline_extra" value={car.specs.seats.toString()} label="Plazas" />
                </div>

                <div className="mb-8">
                    <h3 className="text-lg font-bold text-white mb-2">Descripción</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{car.description}</p>
                </div>

                {/* Gallery */}
                {car.gallery.length > 0 && (
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-white">Galería</h3>
                            <span className="text-xs text-primary font-medium">Ver todas</span>
                        </div>
                        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-5 px-5">
                            {car.gallery.map((img, i) => (
                                <div key={i} className="flex flex-col gap-2 min-w-[140px] shrink-0">
                                    <div className="w-full aspect-[4/3] bg-cover bg-center rounded-xl border border-white/10" style={{backgroundImage: `url("${img.url}")`}}></div>
                                    <p className="text-gray-300 text-xs font-medium pl-1">{img.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mb-8">
                    <h3 className="text-lg font-bold text-white mb-4">Características Premium</h3>
                    <div className="flex flex-wrap gap-2">
                        {car.features.map(f => (
                             <FeatureChip key={f} icon="auto_awesome" label={f} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Sticky Footer */}
             <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pt-4 pb-8 bg-background-dark/90 backdrop-blur-xl border-t border-white/10">
                <div className="flex gap-3">
                    <button className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10">
                        <span className="material-symbols-outlined text-[24px]">share</span>
                    </button>
                    <button onClick={onBook} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary text-white font-bold text-base h-14 shadow-lg shadow-primary/20 active:bg-primary/90 transition transform active:scale-[0.98]">
                        <span className="material-symbols-outlined text-[24px]">chat</span>
                        <span>Reservar Ahora</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const BookingView = ({ car, onBack }: { car: Car, onBack: () => void }) => {
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess(true);
        // Simulate API call
        setTimeout(() => {
            alert("Solicitud enviada! Te contactaremos pronto.");
            onBack();
        }, 2000);
    };

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto animate-fade-in bg-background-light dark:bg-background-dark">
             <div className="sticky top-0 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 pb-2 flex items-center border-b border-black/5 dark:border-white/5">
                <button onClick={onBack} className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </button>
                <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Reserva tu Vehículo</h2>
            </div>

            <div className="flex w-full flex-row items-center justify-center gap-2 py-4">
                <div className="h-1.5 w-8 rounded-full bg-primary shadow-[0_0_8px_rgba(236,19,19,0.5)]"></div>
                <div className="h-1.5 w-8 rounded-full bg-surface-dark"></div>
            </div>

            <main className="flex-1 flex flex-col gap-6 px-4 pb-24">
                {/* Summary */}
                <div className="group relative overflow-hidden rounded-xl bg-surface-dark shadow-lg ring-1 ring-white/5">
                    <div className="flex items-stretch justify-between gap-4 p-4">
                        <div className="flex flex-col justify-center gap-1.5 flex-[2_2_0px]">
                            <p className="text-text-muted text-xs font-medium uppercase tracking-wider">Vehículo</p>
                            <p className="text-white text-lg font-bold leading-tight">{car.name}</p>
                            <p className="text-primary text-sm font-semibold leading-normal">${car.price} <span className="text-text-muted font-normal">/ día</span></p>
                        </div>
                        <div className="w-24 h-16 bg-center bg-no-repeat bg-cover rounded-lg flex-shrink-0 shadow-inner" style={{backgroundImage: `url("${car.imageUrl}")`}}></div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <section className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 pb-1 border-b border-white/10">
                            <span className="material-symbols-outlined text-primary">person</span>
                            <h3 className="text-white text-base font-bold tracking-tight">Detalles del Conductor</h3>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-white text-sm font-medium">Nombre Completo</label>
                            <input required className="form-input w-full rounded-xl border border-white/10 bg-surface-dark h-12 px-4 text-white placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" placeholder="Ej. Alejandro García" type="text"/>
                        </div>
                        <div className="flex flex-col gap-2">
                             <label className="text-white text-sm font-medium">Teléfono</label>
                             <input required className="form-input w-full rounded-xl border border-white/10 bg-surface-dark h-12 px-4 text-white placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" placeholder="+34 600 000 000" type="tel"/>
                        </div>
                    </section>

                    <section className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 pb-1 border-b border-white/10">
                            <span className="material-symbols-outlined text-primary">calendar_clock</span>
                            <h3 className="text-white text-base font-bold tracking-tight">Fechas</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-white text-sm font-medium">Recogida</label>
                                <input required type="date" className="form-input w-full rounded-xl border border-white/10 bg-surface-dark h-12 px-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"/>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-white text-sm font-medium">Devolución</label>
                                <input required type="date" className="form-input w-full rounded-xl border border-white/10 bg-surface-dark h-12 px-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"/>
                            </div>
                        </div>
                    </section>

                     <p className="text-center text-xs text-text-muted/60 px-4">
                        Al enviar esta solicitud, aceptas nuestra Política de Privacidad y el tratamiento de tus datos para la reserva.
                    </p>

                    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background-light dark:bg-background-dark border-t border-white/5 p-4 max-w-md mx-auto">
                        <button type="submit" disabled={success} className="flex w-full items-center justify-center gap-3 rounded-full bg-primary px-6 py-4 shadow-lg shadow-primary/25 hover:bg-red-600 active:scale-[0.98] transition-all duration-200 group disabled:opacity-70 disabled:cursor-not-allowed">
                            {success ? (
                                <span className="flex items-center gap-2"><span className="material-symbols-outlined">check</span> Enviado</span>
                            ) : (
                                <>
                                    <span className="text-white font-bold text-lg tracking-wide">Enviar Solicitud</span>
                                    <span className="material-symbols-outlined text-white text-2xl group-hover:rotate-12 transition-transform">chat</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

// --- AI CHAT COMPONENT ---

const AIChatButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
        { role: 'ai', text: 'Hola, soy Velo. ¿En qué puedo ayudarte a elegir tu coche hoy?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const toggleChat = () => setIsOpen(!isOpen);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setLoading(true);

        const aiResponse = await getCarAssistantResponse(userMsg);
        
        setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
        setLoading(false);
    };

    return (
        <>
            <button 
                onClick={toggleChat}
                className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-red-500 shadow-xl shadow-primary/30 flex items-center justify-center text-white hover:scale-110 transition-transform"
            >
                <span className="material-symbols-outlined text-3xl">{isOpen ? 'close' : 'smart_toy'}</span>
            </button>

            {isOpen && (
                <div className="fixed bottom-40 right-6 z-50 w-80 md:w-96 h-96 bg-surface-dark border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
                    <div className="bg-primary/10 p-4 border-b border-white/5 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-sm">smart_toy</span>
                        </div>
                        <div>
                            <p className="text-white font-bold text-sm">Velocidad AI</p>
                            <p className="text-text-muted text-xs">Asistente Virtual</p>
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white/10 text-gray-200 rounded-tl-none'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none flex gap-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={sendMessage} className="p-3 border-t border-white/5 bg-black/20">
                        <div className="flex gap-2">
                            <input 
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder="Pregunta sobre nuestros coches..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-primary"
                            />
                            <button type="submit" className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white disabled:opacity-50" disabled={loading}>
                                <span className="material-symbols-outlined text-sm">send</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

// --- MAIN APP ---

const App = () => {
    const [view, setView] = useState<ViewState>('WELCOME');
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);

    // Scroll to top on view change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [view]);

    const handleStart = () => setView('CATALOG');
    
    const handleSelectCar = (car: Car) => {
        setSelectedCar(car);
        setView('DETAILS');
    };

    const handleBackToCatalog = () => {
        setView('CATALOG');
        setSelectedCar(null);
    };

    const handleBook = () => {
        setView('BOOKING');
    };

    const handleBackToDetails = () => {
        setView('DETAILS');
    };

    return (
        <>
            {view === 'WELCOME' && <WelcomeView onStart={handleStart} />}
            {view === 'CATALOG' && <CatalogView onSelectCar={handleSelectCar} />}
            {view === 'DETAILS' && selectedCar && <DetailsView car={selectedCar} onBack={handleBackToCatalog} onBook={handleBook} />}
            {view === 'BOOKING' && selectedCar && <BookingView car={selectedCar} onBack={handleBackToDetails} />}
            
            {/* AI Assistant is available in Catalog and Details */}
            {(view === 'CATALOG' || view === 'DETAILS') && <AIChatButton />}
        </>
    );
};

export default App;
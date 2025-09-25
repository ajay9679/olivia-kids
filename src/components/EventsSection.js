"use client"
import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabaseClient";


export default function EventsSection() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const perPage = 3;
    const totalPages = Math.ceil(events.length / perPage);
    const pagedEvents = events.slice((page - 1) * perPage, page * perPage);

    // Fetch events from Supabase
    useEffect(() => {
        async function fetchEvents(){
            setLoading(true);
            const { data, error } = await supabase.from("events").select("*").order('date', { ascending: true });
            if(!error && data) setEvents(data);
            setLoading(false);
        }
        fetchEvents();
    }, []);

    return (
        <section className="w-full my-8">
        <h3 className="text-xl font-bold text-pink-600 mb-4 text-center">Upcoming Events</h3>
        {loading ? (
            <div className="flex justify-center items-center py-12">
                <svg className="animate-spin h-8 w-8 text-pink-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {pagedEvents.map((e, idx) => (
                    <div key={e.id || idx} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
                        <div className="h-40 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                            <img src={e.image} alt={e.title} className="object-cover w-full h-full" />
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                                <div className="text-pink-600 font-bold mb-1 text-sm">{new Date(e.date).toLocaleDateString()}</div>
                                <div className="font-semibold text-blue-700 text-lg mb-1">{e.title.toUpperCase()}</div>
                                <div className="text-gray-700 text-sm">{e.description || e.desc}</div>
                                <div className="text-xs text-gray-500 mt-2 flex gap-2"><span className="font-semibold">Venue | </span><span className="bg-green-500 px-2 text-[10px] text-center text-stone-200 rounded-full flex justify-center items-center">{e.venue}</span></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
        {/* Pagination */}
        <div className="flex justify-center mt-6 gap-2">
            <button className="px-3 py-1 rounded bg-pink-100 text-pink-600 font-bold disabled:opacity-50" onClick={() => setPage(page - 1)} disabled={page === 1}>
                Prev
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} className={`px-3 py-1 rounded font-bold ${page === i + 1 ? 'bg-pink-600 text-white' : 'bg-pink-100 text-pink-600'}`} onClick={() => setPage(i + 1)} >
                    {i + 1}
                </button>
            ))}
            <button className="px-3 py-1 rounded bg-pink-100 text-pink-600 font-bold disabled:opacity-50" onClick={() => setPage(page + 1)}
          disabled={page === totalPages} >
            Next
            </button>
        </div>
    </section>
    );
}




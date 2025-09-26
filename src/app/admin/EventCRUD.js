"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";


export default function EventCRUD(){
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const pageSize = 10;
    const [form, setForm] = useState({ title: "", date: "", description: "", venue: "", image: "" });
    const [editingId, setEditingId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    
    // Fetch events
    useEffect(() => {
        fetchEvents();
    }, []);

    async function fetchEvents(){
        setLoading(true);
        const { data, error } = await supabase.from("events").select("*").order('created_at', { ascending: false });
        if (!error) setEvents(data);
        setLoading(false);
        setPage(0);
    }

    // Add event
    async function addEvent(e) {
        setSubmitting(true);
        let imageUrl = form.image;
        if(imageFile){
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
            const { data: uploadData, error: uploadError } = await supabase.storage.from('events').upload(fileName, imageFile);
            if(uploadError){
                toast.error("Image upload failed.");
                setSubmitting(false);
                return;
            }
            imageUrl = supabase.storage.from('events').getPublicUrl(fileName).data.publicUrl;
        }
        const { error } = await supabase.from("events").insert([{ ...form, image: imageUrl }]);
        if(!error) {
            toast.success("Event added successfully!");
            setForm({ title: "", date: "", description: "", venue: "", image: "" });
            setImageFile(null);
            if(fileInputRef.current) fileInputRef.current.value = "";
            fetchEvents();
        }else{
            toast.error("Failed to add event.");
        }
        setSubmitting(false);
    }

    async function updateEventHandler(e){
        setSubmitting(true);
        let imageUrl = form.image;
        if(imageFile){
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
            const { data: uploadData, error: uploadError } = await supabase.storage.from('events').upload(fileName, imageFile);
            if(uploadError){
                toast.error("Image upload failed.");
                setSubmitting(false);
                return;
            }
            imageUrl = supabase.storage.from('events').getPublicUrl(fileName).data.publicUrl;
        }
        const { error } = await supabase.from("events").update({ ...form, image: imageUrl }).eq("id", editingId);
        if(!error){
            toast.success("Event updated!");
            setEditingId(null);
            setForm({ title: "", date: "", description: "", venue: "", image: "" });
            setImageFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            fetchEvents();
        }else{
        toast.error("Failed to update event.");
    }
    setSubmitting(false);
  }
    // Update event
  function handleEdit(ev) {
    setForm({
      title: ev.title || "",
      date: ev.date || "",
      description: ev.description || "",
      venue: ev.venue || "",
      image: ev.image || ""
    });
    setEditingId(ev.id);
    setImageFile(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  }

  async function updateEvent(id, updates) {
    const { error } = await supabase.from("events").update(updates).eq("id", id);
    if(!error){
      toast.success("Event updated!");
      setEditingId(null);
      setForm({ title: "", date: "", description: "", venue: "", image: "" });
      fetchEvents();
    }else{
      toast.error("Failed to update event.");
    }
  }

    // Delete event
  async function deleteEvent(id){
    setShowDeleteModal(false);
    const { error } = await supabase.from("events").delete().eq("id", id);
    if(!error){
      toast.success("Event deleted!");
      fetchEvents();
    } else {
      toast.error("Failed to delete event.");
    }
    setDeleteId(null);
  }

  function openDeleteModal(id) {
    setDeleteId(id);
    setShowDeleteModal(true);
  }

  function closeDeleteModal() {
    setShowDeleteModal(false);
    setDeleteId(null);
  }

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") closeDeleteModal();
    }
    if (showDeleteModal) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [showDeleteModal]);

  return (
  <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
    <Toaster position="top-right" />
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col p-6">
        <div className="mb-8 flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-2">
            <span className="text-2xl font-bold text-blue-700 dark:text-blue-200">E</span>
          </div>
          <span className="font-bold text-blue-700 dark:text-blue-200 text-lg tracking-wide">Events</span>
        </div>
        <nav className="flex flex-col gap-2">
          <a href="/admin" className="px-4 py-2 rounded-lg font-semibold text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-200 transition">Dashboard</a>
          <a href="/admin/events" className="px-4 py-2 rounded-lg font-semibold text-gray-700 dark:text-gray-200 bg-blue-100 dark:bg-blue-900">Events</a>
          <a href="/admin/programs" className="px-4 py-2 rounded-lg font-semibold text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-200 transition">Programs</a>
          <a href="/admin/gallery" className="px-4 py-2 rounded-lg font-semibold text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-200 transition">Gallery</a>
          <a href="/admin/testimonials" className="px-4 py-2 rounded-lg font-semibold text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-200 transition">Testimonials</a>
          <a href="/admin/users" className="px-4 py-2 rounded-lg font-semibold text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-200 transition">Users</a>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 shadow flex items-center justify-between px-8 py-4 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-200 tracking-tight">Event Management</h1>
        </header>
        {/* Form */}
        <section className="max-w-2xl mx-auto mt-8 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full">
          <h2 className="text-xl font-bold mb-6 text-blue-700 dark:text-blue-200">Add New Event</h2>
          <form onSubmit={e => {
            e.preventDefault();
            if (editingId) {
              updateEventHandler(e);
            } else {
              addEvent(e);
            }
          }} className="space-y-4 mb-8" encType="multipart/form-data">
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1">Title</label>
              <input
                className="w-full px-3 py-2 border rounded bg-blue-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-blue-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-900 placeholder-blue-600 dark:placeholder-blue-200"
                placeholder="Title"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1">Date</label>
              <input
                className="w-full px-3 py-2 border rounded bg-blue-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-blue-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-900 placeholder-blue-600 dark:placeholder-blue-200"
                placeholder="Date"
                type="date"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1">Description</label>
              <input
                className="w-full px-3 py-2 border rounded bg-blue-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-blue-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-900 placeholder-blue-600 dark:placeholder-blue-200"
                placeholder="Description"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1">Venue</label>
              <input
                className="w-full px-3 py-2 border rounded bg-blue-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-blue-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-900 placeholder-blue-600 dark:placeholder-blue-200"
                placeholder="Venue"
                value={form.venue}
                onChange={e => setForm({ ...form, venue: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1">Event Image</label>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="w-full px-3 py-2 border rounded bg-blue-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-blue-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-900"
                onChange={e => setImageFile(e.target.files[0])}
              />
              {imageFile ? (
                <Image width={128} height={80} src={URL.createObjectURL(imageFile)} alt="New Preview" className="mt-2 h-20 w-32 object-cover rounded" />
              ) : (editingId && form.image && (
                <Image width={128} height={80} src={form.image} alt="Event Preview" className="mt-2 h-20 w-32 object-cover rounded" />
              ))}
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition flex items-center justify-center" disabled={submitting}>
              {submitting && (
                <svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
              )}
              {editingId ? (submitting ? "Updating..." : "Update Event") : (submitting ? "Adding..." : "Add Event")}
            </button>
          </form>
        </section>
        {/* Event List */}
        <section className="max-w-4xl mx-auto mt-8 p-6 bg-gray-100 dark:bg-gray-900 rounded-xl shadow-lg w-full">
          <h2 className="text-xl font-bold mb-6 text-blue-700 dark:text-blue-200">All Events</h2>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-blue-100 dark:bg-blue-900">
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200 font-semibold">Title</th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200 font-semibold">Date</th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200 font-semibold">Venue</th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200 font-semibold">Description</th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200 font-semibold">Image</th>
                    <th className="px-4 py-2 text-center text-gray-700 dark:text-gray-200 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.slice(page * pageSize, (page + 1) * pageSize).map(ev => (
                    <tr key={ev.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-2 font-bold text-blue-700 dark:text-blue-200">{ev.title}</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{ev.date}</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{ev.venue}</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-200 max-w-xs truncate">{ev.description}</td>
                      <td className="px-4 py-2 ">
                        {ev.image && (
                          <Image width={128} height={80} src={ev.image} alt="Event" className="h-16 w-28 object-cover rounded" />
                        )}
                      </td>
                      <td className="px-4 py-2 text-center flex items-center space-between">
                        <button onClick={() => handleEdit(ev)} className="p-2 text-blue-600 hover:text-blue-800 transition flex items-center" title="Update">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M16.862 3.487a2.07 2.07 0 0 1 2.93 2.93l-1.06 1.06-2.93-2.93 1.06-1.06zm-2.12 2.12l2.93 2.93-9.19 9.19a2.07 2.07 0 0 1-1.47.61H5.07v-1.17c0-.55.22-1.08.61-1.47l9.19-9.19z" fill="currentColor" />
                          </svg>
                        </button>
                        <button onClick={() => openDeleteModal(ev.id)} className="p-2 text-gray-500 hover:text-red-600 transition flex items-center" title="Delete">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 7h12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-7 0v10a2 2 0 002 2h4a2 2 0 002-2V7" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination */}
              <div className="flex justify-between items-center mt-4">
                <button
                  className="px-3 py-1 bg-blue-200 dark:bg-blue-900 rounded disabled:opacity-50"
                  onClick={() => setPage(0)}
                  disabled={page === 0}
                >
                  {"|<"}
                </button>
                <button
                  className="px-3 py-1 bg-blue-200 dark:bg-blue-900 rounded disabled:opacity-50"
                  onClick={() => setPage(p => Math.max(0, p - 1))}
                  disabled={page === 0}
                >
                  {"<"}
                </button>
                <span className="text-gray-700 dark:text-gray-200">
                  Page {page + 1} of {Math.ceil(events.length / pageSize)}
                </span>
                <button
                  className="px-3 py-1 bg-blue-200 dark:bg-blue-900 rounded disabled:opacity-50"
                  onClick={() => setPage(p => Math.min(Math.ceil(events.length / pageSize) - 1, p + 1))}
                  disabled={page >= Math.ceil(events.length / pageSize) - 1}
                >
                  {">"}
                </button>
                <button
                  className="px-3 py-1 bg-blue-200 dark:bg-blue-900 rounded disabled:opacity-50"
                  onClick={() => setPage(Math.ceil(events.length / pageSize) - 1)}
                  disabled={page >= Math.ceil(events.length / pageSize) - 1}
                >
                  {">|"}
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    {/* Delete Modal */}
    {showDeleteModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-filter backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 w-full max-w-sm relative">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Delete Event</h3>
          <p className="mb-6 text-gray-700 dark:text-gray-300">Are you sure you want to delete this event? This action cannot be undone.</p>
          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition"
              onClick={closeDeleteModal}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition"
              onClick={() => deleteEvent(deleteId)}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}

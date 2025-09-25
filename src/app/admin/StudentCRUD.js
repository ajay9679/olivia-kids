"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabaseClient";

export default function StudentCRUD() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", status: "active" });

  // Fetch students
  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    setLoading(true);
    const { data, error } = await supabase.from("students").select("*");
    if (!error) setStudents(data);
    setLoading(false);
  }

  // Add student
  async function addStudent(e) {
    e.preventDefault();
    const { data, error } = await supabase.from("students").insert([form]);
    if (!error) {
      setForm({ name: "", email: "", status: "active" });
      fetchStudents();
    }
  }

  // Update student
  async function updateStudent(id, updates) {
    const { error } = await supabase.from("students").update(updates).eq("id", id);
    if (!error) fetchStudents();
  }

  // Delete student
  async function deleteStudent(id) {
    const { error } = await supabase.from("students").delete().eq("id", id);
    if (!error) fetchStudents();
  }

  return (
    <div>
      <h2>Student CRUD</h2>
      <form onSubmit={addStudent}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <select
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button type="submit">Add Student</button>
      </form>
      <ul>
        {students.map(s => (
          <li key={s.id}>
            {s.name} ({s.email}) - {s.status}
            <button onClick={() => updateStudent(s.id, { status: s.status === "active" ? "inactive" : "active" })}>
              Toggle Status
            </button>
            <button onClick={() => deleteStudent(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

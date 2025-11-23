"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

export default function JobPostPage() {
  const route = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return; 
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      company: formData.get("company"),
      location: formData.get("location"),
      type: formData.get("type"),
      salary: formData.get("salary"),
    };

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Something went wrong");
        setLoading(false);
        return;
      }
      toast.success(result.message);
      form.reset();
      route.push("/jobs");
    } catch (err) {
      toast.error("Error");
    } finally {
      setLoading(false); 
    }
  };

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="mb-4 text-lg">You are not logged in...</p>
        <button
          onClick={() => route.push("/auth/signin")}
          className="px-4 py-1.5 bg-[#0078D4] text-white rounded"
        >
          Log in
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md ">
      <h1 className="text-2xl text-center font-bold mb-6">Post a Job</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Job Title</label>
          <input
            type="text"
            name="title"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            rows={3}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Company</label>
          <input
            type="text"
            name="company"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Location</label>
          <input
            type="text"
            name="location"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Job Type</label>
          <select name="type" className="w-full border p-2 rounded" required>
            <option value="">Select type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Salary (Optional)</label>
          <input type="text" name="salary" className="w-full border p-2 rounded" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-[#0078D4] text-white px-4 py-2 rounded w-full
            ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}

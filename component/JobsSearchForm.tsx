"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";

export default function JobsSearchForm() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    if (type) params.set("type", type);
    if (location) params.set("location", location);

    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full bg-white p-4 mb-6 rounded-lg shadow flex flex-col gap-4
                 md:flex-row md:items-center md:gap-4"
    >
      {/* Job Title */}
      <input
        type="text"
        placeholder="Job title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 border rounded focus:outline-none w-full"
      />

      {/* Job Type */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="flex-1 px-4 py-2 border rounded bg-white focus:outline-none w-full"
      >
        <option value="">Job type</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Internship">Internship</option>
        <option value="Contract">Contract</option>
      </select>

      {/* Location */}
      <input
        type="text"
        placeholder="Location..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="flex-1 px-4 py-2 border rounded focus:outline-none w-full"
      />

      {/* Search Button */}
      <button
        type="submit"
        className="px-4 py-2 bg-[#0078D4] text-white rounded flex items-center justify-center gap-2 hover:bg-gray-800 w-full md:w-auto"
      >
        <FiSearch /> Search
      </button>
    </form>
  );
}

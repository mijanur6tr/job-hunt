import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Home() {

  const jobs = await prisma.job.findMany({
    orderBy: { postedAt: "desc" },
    take: 6, 
  });

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* HERO SECTION */}
      <section className="w-full flex flex-col items-center justify-center text-center py-20 px-4 sm:px-20 gap-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#0078D4]">
          Welcome to Find Jobs
        </h1>
        <p className="text-gray-700 text-lg sm:text-xl max-w-2xl">
          Explore thousands of job listings and apply easily online. Find your next opportunity with us.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link
            href="/jobs"
            className="px-6 py-3 border border-black text-black rounded-md hover:bg-[#0078D4] hover:text-white transition"
          >
            Browse Jobs
          </Link>
          <Link
            href="/jobs/post"
            className="px-6 py-3 border border-black text-black rounded-md hover:bg-[#0078D4] hover:text-white transition"
          >
            Post a Job
          </Link>
        </div>

        {/* Hero Image */}
        <div className="w-full max-w-3xl h-64 relative mt-10">
          <Image
            src="https://unblast.com/wp-content/uploads/2021/01/Treasure-Hunter-Vector-Illustration-1536x1152.jpg" 
            alt="Job Hunting Illustration"
            fill
            className="object-contain"
          />
        </div>
      </section>

      {/* FEATURED JOBS */}
      <section className="w-full px-4 sm:px-20 mt-16">
        <h2 className="text-2xl text-[#0078D4] font-semibold mb-6 text-center">Featured Jobs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition">
              <h3 className="text-lg font-bold mb-2">{job.title}</h3>
              {job.company && <p className="text-gray-600 mb-2">Company: {job.company}</p>}
              {job.location && <p className="text-gray-600 mb-2">Location: {job.location}</p>}
              {job.description && (
                <p className="text-gray-800 mb-4 line-clamp-3">{job.description}</p>
              )}
              <Link href={`/jobs/${job.id}`} className="text-black hover:underline">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full mt-20 py-6 text-center text-gray-600">
        &copy; {new Date().getFullYear()} Job Hunt. All rights reserved.
      </footer>
    </div>
  );
}

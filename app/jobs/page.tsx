import JobsSearchForm from "@/component/JobsSearchForm";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined | string[] };
}) {
  const limit = 3;
  const page = Number(searchParams.page) || 1;

  const searchQuery = searchParams.query as string;
  const searchType = searchParams.type as string;
  const searchLocation = searchParams.location as string;

  // Fetch paginated jobs
  const jobs = await prisma.job.findMany({
    where: {
      AND: [
        searchQuery
          ? {
              OR: [
                { title: { contains: searchQuery, mode: "insensitive" } },
                { description: { contains: searchQuery, mode: "insensitive" } },
                { company: { contains: searchQuery, mode: "insensitive" } },
              ],
            }
          : {},
        searchType ? { type: searchType } : {},
        searchLocation
          ? { location: { contains: searchLocation, mode: "insensitive" } }
          : {},
      ],
    },
    orderBy: { postedAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
    include: { postedBy: true },
  });

  // Count total jobs for pagination
  const totalJobs = await prisma.job.count({
    where: {
      AND: [
        searchQuery
          ? {
              OR: [
                { title: { contains: searchQuery, mode: "insensitive" } },
                { description: { contains: searchQuery, mode: "insensitive" } },
                { company: { contains: searchQuery, mode: "insensitive" } },
              ],
            }
          : {},
        searchType ? { type: searchType } : {},
        searchLocation
          ? { location: { contains: searchLocation, mode: "insensitive" } }
          : {},
      ],
    },
  });

  const totalPages = Math.ceil(totalJobs / limit);

  // Helper to keep existing filters
  const buildQuery = (pageNum: number) => {
    const params = new URLSearchParams();

    if (searchQuery) params.set("query", searchQuery);
    if (searchType) params.set("type", searchType);
    if (searchLocation) params.set("location", searchLocation);

    params.set("page", String(pageNum));
    return `/jobs?${params.toString()}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <JobsSearchForm />

      <h1 className="text-2xl text-center font-bold mb-6">Jobs</h1>

      <div className="space-y-4">
        {jobs.length === 0 && <p>No jobs available.</p>}

        {jobs.map((job) => (
          <div key={job.id} className="p-3 border rounded shadow-sm">
            <p><strong>Title:</strong> {job.title}</p>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Type:</strong> {job.type}</p>
            {job.salary && <p><strong>Salary:</strong> {job.salary}</p>}
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Posted By:</strong> {job.postedBy.name}</p>

            <Link
              href={`/jobs/${job.id}`}
              className="inline-block mt-2 px-4 py-2 bg-[#0078D4] text-white font-semibold rounded hover:bg-blue-600 transition"
            >
              View more
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination (in the same file) */}
      <div className="flex justify-center items-center gap-3 mt-6">

        {/* Previous */}
        {page > 1 && (
          <Link
            href={buildQuery(page - 1)}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            ←
          </Link>
        )}

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Link
            key={p}
            href={buildQuery(p)}
            className={`px-3 py-1 border rounded ${
              p === page ? "bg-[#0078D4] text-white" : "hover:bg-gray-100"
            }`}
          >
            {p}
          </Link>
        ))}

        {/* Next */}
        {page < totalPages && (
          <Link
            href={buildQuery(page + 1)}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            →
          </Link>
        )}
      </div>
    </div>
  );
}

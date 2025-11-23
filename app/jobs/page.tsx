import JobsSearchForm from "@/component/JobsSearchForm";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function JobsPage(
  {searchParams}:{searchParams: Promise<{ [key:string]: string | undefined |string[]}>}
) {

  const {query,location,type} = await searchParams;

  const searchQuery = query as string;
  const searchType = type as string;
  const searchlocation = location as string;

  const jobs = await prisma.job.findMany({
    where:{
      AND:[
        searchQuery?{
          OR:[
            {title:{contains:searchQuery,mode:"insensitive"}},
            {description:{contains:searchQuery,mode:"insensitive"}},
            {company:{contains:searchQuery,mode:"insensitive"}},
          ]
        }:{},
        searchType?{"type":searchType}:{},
        searchlocation?{location:{contains:searchlocation,mode:"insensitive"}}:{},
      ]
    },
    orderBy: {
      postedAt: "desc"
    },
    include: {
      postedBy: true
    }
  })

  return (
    <div className="max-w-4xl mx-auto p-6">

    <JobsSearchForm/>

    <h1 className="text-2xl text-center font-bold mb-6">Jobs</h1>

      <div className="space-y-4">
        {jobs.length === 0 && <p>No jobs available.</p>}
        {jobs.map((job) => (
          <div key={job.id} className="p-3 border rounded">
            <p><strong>Title:</strong> {job.title}</p>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Type:</strong> {job.type}</p>
            {job.salary && <p><strong>Salary:</strong> {job.salary}</p>}
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Posted By:</strong>{job.postedBy.name}</p>
             <Link 
              href={`/jobs/${job.id}`} 
              className="inline-block mt-2 px-4 py-2 bg-[#0078D4] text-white font-semibold rounded hover:bg-blue-600 transition"
            >
              View more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

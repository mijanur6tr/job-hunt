import { auth } from "@/auth";
import DashboardTop from "@/component/DashboardTop";
import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
// import { SearchParams } from "next/dist/server/request/search-params";
import Link from "next/link";

export default async function Dashboard(
  // {searchParams}:{searchParams:{[key:string]: string | undefined | string[]}}
) {
  const session = await auth();

  // const limit = 4;
  // const page = Number(searchParams.page);

  const [application, postedJobs] = await Promise.all([
    // Jobs you applied to
    prisma.application.findMany({
      where: { userId: session?.user?.id },
      include: {
        jobs: {
          include: {
            postedBy: true,
          },
        },
      },
      // skip:(page-1)*limit,
      // take:limit,
      orderBy: { appliedAt: "desc" },
    }),
    // Jobs posted by you
    prisma.job.findMany({
      where: { postedbyId: session?.user?.id },
      include: {
        _count: {
          select: {
            applications: true,
          },
        },
      },
    // skip: (page - 1) * limit,
    // take: limit,
      orderBy: { postedAt: "desc" },
    }),
  ]);

  return (
    <div className="p-6">
    <DashboardTop />
    <div className="max-w-6xl mx-auto p-6">
      

      <div className="flex flex-col md:flex-row gap-8 ">
        {/* Posted Jobs */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4 text-center md:text-left">
            Jobs Posted by You
          </h2>
          {postedJobs.length === 0 ? (
            <p className="text-gray-500 text-center md:text-left">
              You have no posted jobs.
            </p>
          ) : (
            <div className="space-y-4">
              {postedJobs.map((job) => (
                <div
                  key={job.id}
                  className="border rounded p-4 shadow hover:shadow-md transition"
                >
                  <p>
                    <strong>Title:</strong> {job.title}
                  </p>
                  <p>
                    <strong>Applications:</strong> {job._count.applications}
                  </p>
                  <p>
                    <strong>Posted:</strong>{" "}
                    {formatDistanceToNow(new Date(job.postedAt), {
                      addSuffix: true,
                    })}
                  </p>
                  <Link
                    href={`/jobs/${job.id}`}
                    className="inline-block mt-2 px-4 py-2 bg-[#0078D4] text-white rounded hover:bg-blue-600 transition"
                  >
                    View Job
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Applied Jobs */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4 text-center md:text-left">
            Jobs You Applied To
          </h2>
          {application.length === 0 ? (
            <p className="text-gray-500 text-center md:text-left">
              You have not applied to any jobs yet.
            </p>
          ) : (
            <div className="space-y-4">
              {application.map((app) => (
                <div
                  key={app.id}
                  className="border rounded p-4 shadow hover:shadow-md transition"
                >
                  <p>
                    <strong>Title:</strong> {app.jobs.title}
                  </p>
                  <p>
                    <strong>Company:</strong> {app.jobs.company}
                  </p>
                  <p>
                    <strong>Posted By:</strong> {app.jobs.postedBy.name}
                  </p>
                  <p>
                    <strong>Applied:</strong>{" "}
                    {formatDistanceToNow(new Date(app.appliedAt), {
                      addSuffix: true,
                    })}
                  </p>
                  <Link
                    href={`/jobs/${app.jobs.id}`}
                    className="inline-block mt-2 px-4 py-2 bg-[#0078D4] text-white rounded hover:bg-blue-600 transition"
                  >
                    View Job
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import Application from "@/component/Application";

export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
  const jobId = (await params).id;
  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });

  if (!job) return notFound();

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">

      <Link href="/jobs" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        ← Back to Jobs
      </Link>

      <div className="border border-gray-200 rounded-lg p-6 bg-white">
        <h1 className="text-2xl font-bold mb-4">{job.title}</h1>

        {job.company && (
          <p className="mb-1">
            <span className="font-semibold">Company:</span> {job.company}
          </p>
        )}

        {job.location && (
          <p className="mb-1">
            <span className="font-semibold">Location:</span> {job.location}
          </p>
        )}

        {job.salary && (
          <p className="mb-1">
            <span className="font-semibold">Salary:</span> {job.salary}
          </p>
        )}

        {job.description && (
          <p className="mt-4 whitespace-pre-wrap leading-relaxed">{job.description}</p>
        )}

        <p className="mt-4 text-sm text-gray-500">
          Posted {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
        </p>
        <Application jobId={job.id}/>
      </div>
    </div>
  );
}

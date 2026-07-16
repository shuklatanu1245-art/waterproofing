import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSubmissions } from "@/lib/actions";
import LogoutButton from "./LogoutButton";

interface Submission {
  id: number;
  created_at: string;
  type: string;
  name: string;
  phone: string;
  email: string;
  property_type: string;
  problem_type: string;
  visit_date: string;
  message: string;
}

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const cookieStore = cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== "authenticated") {
    redirect("/admin");
  }

  const submissions = await getSubmissions();

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
          <LogoutButton />
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
          <div className="px-4 py-5 sm:px-6 bg-primary text-white">
            <h3 className="text-lg leading-6 font-medium">Customer Inquiries</h3>
            <p className="mt-1 max-w-2xl text-sm opacity-90">All lead generation and contact form submissions.</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submissions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                      No inquiries yet.
                    </td>
                  </tr>
                ) : (
                  (submissions as Submission[]).map((sub) => (
                    <tr key={sub.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(sub.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          sub.type === 'Inspection' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {sub.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {sub.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{sub.phone}</div>
                        <div className="text-xs">{sub.email}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {sub.type === 'Inspection' ? (
                          <>
                            <div><span className="font-medium">Property:</span> {sub.property_type}</div>
                            <div><span className="font-medium">Problem:</span> {sub.problem_type}</div>
                            {sub.visit_date && <div><span className="font-medium">Visit:</span> {sub.visit_date}</div>}
                          </>
                        ) : (
                          <div className="line-clamp-2 max-w-xs">{sub.message}</div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

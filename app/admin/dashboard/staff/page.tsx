import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getStaff, addStaff, deleteStaff } from "@/lib/actions";
import { AdminNav } from "@/components/admin/AdminNav";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export default async function AdminStaffPage() {
  const cookieStore = cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== "authenticated") {
    redirect("/admin");
  }

  const staff = await getStaff();

  async function handleAdd(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    
    await addStaff(name, username, password);
    revalidatePath("/admin/dashboard/staff");
  }

  async function handleDelete(formData: FormData) {
    "use server";
    const id = parseInt(formData.get("id") as string);
    await deleteStaff(id);
    revalidatePath("/admin/dashboard/staff");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdminNav />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Staff */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 shadow sm:rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add Staff Member</h3>
              <form action={handleAdd} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" name="name" required className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input type="text" name="username" required className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input type="text" name="password" required className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
                  <p className="text-xs text-gray-500 mt-1">This will be the password they use to login.</p>
                </div>
                <Button type="submit" variant="primary" className="w-full">Create Staff Account</Button>
              </form>
            </div>
          </div>

          {/* List Staff */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
              <div className="px-4 py-5 sm:px-6 bg-primary text-white">
                <h3 className="text-lg leading-6 font-medium">Manage Staff</h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {staff.map((user: any) => (
                  <li key={user.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                    <div>
                      <h4 className="text-md font-bold text-gray-900">{user.name}</h4>
                      <p className="text-sm text-gray-500">Username: {user.username}</p>
                    </div>
                    <form action={handleDelete}>
                      <input type="hidden" name="id" value={user.id} />
                      <Button type="submit" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                        Delete
                      </Button>
                    </form>
                  </li>
                ))}
                {staff.length === 0 && (
                  <li className="p-4 text-gray-500 text-center">No staff members found.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

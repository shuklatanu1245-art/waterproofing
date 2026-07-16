import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getServices, deleteService, addService } from "@/lib/actions";
import { AdminNav } from "@/components/admin/AdminNav";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const cookieStore = cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== "authenticated") {
    redirect("/admin");
  }

  const services = await getServices();

  async function handleAdd(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const icon = formData.get("icon") as string;
    const description = formData.get("description") as string;
    const display_order = parseInt(formData.get("display_order") as string) || 0;
    
    await addService({ title, icon, description, display_order });
    revalidatePath("/admin/dashboard/services");
    revalidatePath("/services");
    revalidatePath("/");
  }

  async function handleDelete(formData: FormData) {
    "use server";
    const id = parseInt(formData.get("id") as string);
    await deleteService(id);
    revalidatePath("/admin/dashboard/services");
    revalidatePath("/services");
    revalidatePath("/");
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <AdminNav />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Add Service Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-primary mb-4">Add New Service</h3>
              <form action={handleAdd} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input name="title" required className="mt-1 w-full p-2 border border-gray-300 rounded-md" placeholder="e.g. Roof Waterproofing" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Icon Name (Lucide React)</label>
                  <input name="icon" required className="mt-1 w-full p-2 border border-gray-300 rounded-md" placeholder="e.g. Home, Building, Droplets" />
                  <p className="text-xs text-gray-500 mt-1">Check lucide.dev for icon names.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea name="description" required rows={3} className="mt-1 w-full p-2 border border-gray-300 rounded-md" placeholder="Service description..."></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Display Order</label>
                  <input type="number" name="display_order" defaultValue="0" required className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <Button type="submit" variant="primary" className="w-full">Add Service</Button>
              </form>
            </div>
          </div>

          {/* List Services */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
              <div className="px-4 py-5 sm:px-6 bg-primary text-white">
                <h3 className="text-lg leading-6 font-medium">Manage Services</h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {(services as any[]).map((svc) => (
                  <li key={svc.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                    <div>
                      <h4 className="text-md font-bold text-gray-900">{svc.title}</h4>
                      <p className="text-sm text-gray-500">{svc.description}</p>
                      <span className="text-xs text-gray-400">Icon: {svc.icon} | Order: {svc.display_order}</span>
                    </div>
                    <form action={handleDelete}>
                      <input type="hidden" name="id" value={svc.id} />
                      <Button type="submit" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                        Delete
                      </Button>
                    </form>
                  </li>
                ))}
                {services.length === 0 && (
                  <li className="p-4 text-gray-500 text-center">No services found.</li>
                )}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

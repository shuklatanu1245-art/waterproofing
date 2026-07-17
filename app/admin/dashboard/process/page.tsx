import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getProcessSteps, deleteProcessStep, addProcessStep } from "@/lib/actions";
import { AdminNav } from "@/components/admin/AdminNav";
import { CloudinaryUpload } from "@/components/admin/CloudinaryUpload";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export default async function AdminProcessPage() {
  const cookieStore = cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== "authenticated") {
    redirect("/admin");
  }

  const steps = await getProcessSteps();

  async function handleAdd(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const displayOrder = parseInt(formData.get("displayOrder") as string) || 0;
    
    await addProcessStep(title, description, imageUrl, displayOrder);
    revalidatePath("/admin/dashboard/process");
    revalidatePath("/");
  }

  async function handleDelete(formData: FormData) {
    "use server";
    const id = parseInt(formData.get("id") as string);
    await deleteProcessStep(id);
    revalidatePath("/admin/dashboard/process");
    revalidatePath("/");
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <AdminNav />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Add Step Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-primary mb-4">Add Process Step</h3>
              <form action={handleAdd} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Step Title</label>
                  <input name="title" required className="mt-1 w-full p-2 border border-gray-300 rounded-md" placeholder="e.g. Site Inspection" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea name="description" required rows={3} className="mt-1 w-full p-2 border border-gray-300 rounded-md" placeholder="Short description of the step..."></textarea>
                </div>
                <CloudinaryUpload 
                  resourceType="image"
                  folder="process_steps"
                  label="Step Image (Glossy/AI Photo)"
                  name="imageUrl"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700">Display Order</label>
                  <input name="displayOrder" type="number" defaultValue="0" className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <Button type="submit" variant="primary" className="w-full">Add Step</Button>
              </form>
            </div>
          </div>

          {/* List Steps */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
              <div className="px-4 py-5 sm:px-6 bg-primary text-white">
                <h3 className="text-lg leading-6 font-medium">Manage Process Steps</h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {(steps as any[]).map((step) => (
                  <li key={step.id} className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-gray-50 gap-4">
                    <div className="flex gap-4 items-center">
                      {step.image_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={step.image_url} alt={step.title} className="w-16 h-16 object-cover rounded-md border" />
                      )}
                      <div>
                        <h4 className="text-md font-bold text-gray-900">
                          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs mr-2 border">Order: {step.display_order}</span>
                          {step.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                      </div>
                    </div>
                    <form action={handleDelete} className="flex-shrink-0 mt-4 md:mt-0">
                      <input type="hidden" name="id" value={step.id} />
                      <Button type="submit" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                        Delete
                      </Button>
                    </form>
                  </li>
                ))}
                {steps.length === 0 && (
                  <li className="p-4 text-gray-500 text-center">No process steps found.</li>
                )}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

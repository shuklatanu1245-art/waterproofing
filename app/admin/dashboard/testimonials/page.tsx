import { getTestimonials, addTestimonial, deleteTestimonial } from "@/lib/actions";
import { AdminNav } from "@/components/admin/AdminNav";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function TestimonialsAdmin() {
  const testimonials = await getTestimonials();

  async function handleAddTestimonial(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const text = formData.get("text") as string;
    await addTestimonial(name, role, text);
    revalidatePath("/admin/dashboard/testimonials");
  }

  async function handleDeleteTestimonial(formData: FormData) {
    "use server";
    const id = parseInt(formData.get("id") as string, 10);
    await deleteTestimonial(id);
    revalidatePath("/admin/dashboard/testimonials");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Manage Testimonials</h1>

          <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-8">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add New Testimonial</h3>
            <form action={handleAddTestimonial} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Client Name</label>
                <input required type="text" name="name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Client Role / Designation</label>
                <input required type="text" name="role" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Review Text</label>
                <textarea required name="text" rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"></textarea>
              </div>
              <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
                Add Testimonial
              </button>
            </form>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Existing Testimonials</h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {(testimonials as any[]).map((t) => (
                <li key={t.id} className="p-4 flex flex-col hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-md font-bold text-gray-900">{t.name} <span className="text-sm font-normal text-gray-500">({t.role})</span></h4>
                      <p className="text-sm text-gray-600 mt-2 italic">&quot;{t.text}&quot;</p>
                    </div>
                    <form action={handleDeleteTestimonial}>
                      <input type="hidden" name="id" value={t.id} />
                      <button type="submit" className="text-red-600 hover:text-red-900 font-medium ml-4">
                        Delete
                      </button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

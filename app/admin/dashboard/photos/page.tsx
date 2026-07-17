import { getGalleryPhotos, addGalleryPhoto, deleteGalleryPhoto } from "@/lib/actions";
import { AdminNav } from "@/components/admin/AdminNav";
import { CloudinaryUpload } from "@/components/admin/CloudinaryUpload";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function PhotosAdmin() {
  const photos = await getGalleryPhotos();

  async function handleAddPhoto(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const url = formData.get("url") as string;
    const order = parseInt(formData.get("order") as string, 10) || 0;
    await addGalleryPhoto(title, url, order);
    revalidatePath("/admin/dashboard/photos");
  }

  async function handleDeletePhoto(formData: FormData) {
    "use server";
    const id = parseInt(formData.get("id") as string, 10);
    await deleteGalleryPhoto(id);
    revalidatePath("/admin/dashboard/photos");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Manage Gallery Photos</h1>

          <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-8">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add New Photo</h3>
            <form action={handleAddPhoto} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Project Title</label>
                <input required type="text" name="title" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black" />
              </div>
              <CloudinaryUpload 
                resourceType="image"
                folder="gallery_photos"
                label="Project Image"
                name="url"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700">Display Order</label>
                <input type="number" name="order" defaultValue={0} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black" />
              </div>
              <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
                Add Photo
              </button>
            </form>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Existing Photos</h3>
            </div>
            <ul className="divide-y divide-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {(photos as any[]).map((p) => (
                <li key={p.id} className="p-4 flex flex-col hover:bg-gray-50 border-r border-b">
                  <div className="w-full h-48 bg-gray-200 rounded overflow-hidden mb-4 relative">
                    <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-md font-bold text-gray-900">{p.title}</h4>
                      <p className="text-sm text-gray-500">Order: {p.display_order}</p>
                    </div>
                    <form action={handleDeletePhoto}>
                      <input type="hidden" name="id" value={p.id} />
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

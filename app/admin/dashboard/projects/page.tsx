import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getProjects, addProject, deleteProject } from "@/lib/actions";
import { AdminNav } from "@/components/admin/AdminNav";
import { CloudinaryUpload } from "@/components/admin/CloudinaryUpload";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const cookieStore = cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== "authenticated") {
    redirect("/admin");
  }

  const projects = await getProjects();

  async function handleAdd(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const location = formData.get("location") as string;
    const service = formData.get("service") as string;
    const date = formData.get("date") as string;
    const category = formData.get("category") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const videoUrl = formData.get("videoUrl") as string;
    
    await addProject({ name, location, service, date, category, imageUrl, videoUrl });
    revalidatePath("/admin/dashboard/projects");
    revalidatePath("/projects");
  }

  async function handleDelete(formData: FormData) {
    "use server";
    const id = parseInt(formData.get("id") as string);
    await deleteProject(id);
    revalidatePath("/admin/dashboard/projects");
    revalidatePath("/projects");
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <AdminNav />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Add Project Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-primary mb-4">Add Completed Project</h3>
              <form action={handleAdd} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Project Name</label>
                  <input name="name" required className="mt-1 w-full p-2 border border-gray-300 rounded-md" placeholder="e.g. ABC Complex" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input name="location" required className="mt-1 w-full p-2 border border-gray-300 rounded-md" placeholder="e.g. Downtown City" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Service Provided</label>
                  <input name="service" required className="mt-1 w-full p-2 border border-gray-300 rounded-md" placeholder="e.g. Terrace Waterproofing" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Completion Date / Year</label>
                  <input name="date" required className="mt-1 w-full p-2 border border-gray-300 rounded-md" placeholder="e.g. March 2023" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select name="category" required className="mt-1 w-full p-2 border border-gray-300 rounded-md">
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>
                <CloudinaryUpload 
                  resourceType="image"
                  folder="projects"
                  label="Project Photo (Required)"
                  name="imageUrl"
                />
                <CloudinaryUpload 
                  resourceType="video"
                  folder="projects_videos"
                  label="Project Video (Optional)"
                  name="videoUrl"
                />
                <Button type="submit" variant="primary" className="w-full">Add Project</Button>
              </form>
            </div>
          </div>

          {/* List Projects */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
              <div className="px-4 py-5 sm:px-6 bg-primary text-white">
                <h3 className="text-lg leading-6 font-medium">Manage Completed Projects</h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {(projects as any[]).map((project) => (
                  <li key={project.id} className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-gray-50 gap-4">
                    <div className="flex gap-4">
                      {project.image_url && (
                        <img src={project.image_url} alt={project.name} className="w-24 h-24 object-cover rounded-md" />
                      )}
                      <div>
                        <h4 className="text-md font-bold text-gray-900">{project.name}</h4>
                        <p className="text-sm text-gray-500"><strong>Category:</strong> {project.category}</p>
                        <p className="text-sm text-gray-500"><strong>Location:</strong> {project.location}</p>
                        <p className="text-sm text-gray-500"><strong>Date:</strong> {project.completion_date}</p>
                        {project.video_url && (
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2">Has Video Attached</span>
                        )}
                      </div>
                    </div>
                    <form action={handleDelete} className="flex-shrink-0 mt-4 md:mt-0">
                      <input type="hidden" name="id" value={project.id} />
                      <Button type="submit" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                        Delete
                      </Button>
                    </form>
                  </li>
                ))}
                {projects.length === 0 && (
                  <li className="p-4 text-gray-500 text-center">No projects found.</li>
                )}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

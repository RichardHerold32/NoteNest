import { Trash2Icon, LoaderIcon, ArrowLeftIcon as LeftArrowIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { toast } from "react-hot-toast";
import api from "../lib/axios";
const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { id  } = useParams();
  const isEdit = new URLSearchParams(location.search).get("edit") === "1";

  useEffect(() => {
    const fetchNote = async() =>{
    try{
      const res = await api.get(`/notes/${id}`)
      setNote(res.data)
    }catch(error){
      console.log("Error fetching note", error);
      toast.error("Failed to load note");
    }finally{
      setLoading(false);
    }
    }
    fetchNote();  
  }, [id])
  useEffect(() => {
    if (!isEdit) return;
    const target = document.getElementById("edit-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isEdit]);
  const handleDelete = async () => {
    if(!window.confirm("Are you sure you want to delete this note?")) return;   
    try{
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    }catch(error){
      console.log("Error deleting note", error);
      toast.error("Failed to delete note");
    }   
  };

  const handleSave = async () => {
    if (!note?.title?.trim() || !note?.content?.trim()) {
      toast.error("Title and content cannot be empty");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, {
        title: note.title,
        content: note.content
      });
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error updating note", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }
  if (!note) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <p className="text-base-content/70">Note not found.</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost gap-2 transition-colors duration-200 hover:bg-base-200/80">
              <LeftArrowIcon className="size-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-ghost btn-sm rounded-full border border-base-300/70 text-error gap-2 transition-colors duration-200 hover:bg-error/10 hover:border-error/40">
              <Trash2Icon className="size-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100 shadow-md mb-6">
            <div className="card-body">
              <h2 className="card-title text-2xl">{note.title}</h2>
              <p className="text-base-content/80 whitespace-pre-wrap">{note.content}</p>
            </div>
          </div>

          <div id="edit-section" className="card bg-base-100 shadow-md">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="card-title text-xl">Edit Note</h3>
                  <p className="text-sm text-base-content/60 mt-1">Update your title or content.</p>
                </div>
                <span className="badge badge-outline badge-md hidden sm:inline-flex">Editing</span>
              </div>
              <div className="h-1 w-full rounded-full bg-gradient-to-r from-primary/70 via-secondary/60 to-accent/60 my-4" />
              <div className="space-y-4">
                <div className="form-control gap-2">
                  <label className="label py-1">
                    <span className="label-text font-medium">Title</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full bg-base-100/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
                    value={note.title}
                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                  />
                </div>
                <div className="form-control gap-2">
                  <label className="label py-1">
                    <span className="label-text font-medium">Content</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full h-44 bg-base-100/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
                    value={note.content}
                    onChange={(e) => setNote({ ...note, content: e.target.value })}
                  />
                </div>
              </div>

              <div className="card-actions justify-end">
                <button onClick={handleSave} disabled={saving} className="btn btn-primary transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteDetailPage

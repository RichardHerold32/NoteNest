import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import api from "../lib/axios";
const CreatePage = () => {
    const [Title, setTitle] = useState("");
    const [Content, setContent] = useState("");
    const [Loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!Title.trim() || !Content.trim()){
            toast.error("All fields are required");
            return;
        }
        setLoading(true);
        try{
            await api.post("/notes", {
                title: Title,
                content: Content
            })
            toast.success("Note Created Successfully")
            navigate("/");

        }catch(error){
            console.log("Erro creating note", error)
            toast.error("Failed to create note");

        }
        console.log("Title:", Title);
        console.log("Content:", Content);
    }; 

    return <div className="min-h-screen">
        <div className="container mx-auto px-4 py-10">
            <div className="max-w-2xl mx-auto">
            <Link to={"/"} className="btn btn-ghost mb-6 gap-2">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
            </Link>
            <div className="card bg-base-100 shadow-xl border border-base-300/60">
                <div className="card-body gap-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="card-title text-2xl">Create New Note</h2>
                            <p className="text-sm text-base-content/60 mt-1">Capture a thought, idea, or reminder.</p>
                        </div>
                        <div className="hidden sm:block">
                            <span className="badge badge-outline badge-lg">Draft</span>
                        </div>
                    </div>
                    <div className="h-1 w-full rounded-full bg-gradient-to-r from-primary/70 via-secondary/60 to-accent/60" />
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control gap-2">
                            <label className="label py-1">
                                <span className="label-text font-medium">Title</span>
                            </label>
                            <input
                            type="text"
                            className="input input-bordered w-full bg-base-100/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
                            placeholder="Give your note a name"
                            value={Title}
                            onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-control gap-2">
                            <label className="label py-1">
                                <span className="label-text font-medium">Content</span>
                            </label>
                            <textarea
                            placeholder="Write your note here..."
                            className="textarea textarea-bordered w-full h-44 bg-base-100/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
                            value={Content}
                            onChange = {(e) => setContent(e.target.value)}
                            />
                        </div>

                        <div className="card-actions justify-end">
                             <button type="submit" className="btn btn-primary btn-lg shadow-md" disabled={Loading} >
                                {Loading? "Creating..." : "Create Note" }
                             </button>
                        </div>

                    </form>

                </div>
            </div>
            </div>

        </div>
    </div>
};
export default CreatePage

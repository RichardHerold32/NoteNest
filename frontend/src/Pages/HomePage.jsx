import {useState, useEffect} from "react";
import api from "../lib/axios.jsx";
import RateLimitedUI from "../components/RateLimitedUI";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard.jsx";
import NotesNotFound from "../components/NotesNotFound.jsx";
const HomePage = () => {
    const [isRateLimitedUI, setIsRateLimitedUI] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [sortOrder, setSortOrder] = useState("newest");
    const [confirmOpen, setConfirmOpen] = useState(false);

    useEffect(() => {
        const fetchNotes = async () =>{
            try{
            const res = await api.get("/notes");
            console.log(res.data);
            setNotes(res.data);
            setIsRateLimitedUI(false);
            }catch(error){
                console.log("Error fetching notes", error)
                if(error.response?.status === 429){
                    setIsRateLimitedUI(true);
                }
                else{
                    toast.error("Failed to load notes")
                }
            }
            finally{
                setLoading(false);
            }
        };
        fetchNotes();
    }, []);

    const sortedNotes = [...notes].sort((a, b) => {
        const aTime = new Date(a.createdAt).getTime();
        const bTime = new Date(b.createdAt).getTime();
        return sortOrder === "newest" ? bTime - aTime : aTime - bTime;
    });

    const toggleSelect = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedIds.length === sortedNotes.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(sortedNotes.map((n) => n._id));
        }
    };

    const handleDeleteSelected = async () => {
        if (selectedIds.length === 0) return;
        try {
            await Promise.all(selectedIds.map((id) => api.delete(`/notes/${id}`)));
            setNotes((prev) => prev.filter((n) => !selectedIds.includes(n._id)));
            setSelectedIds([]);
            toast.success("Selected notes deleted");
        } catch (error) {
            console.log("Error deleting selected notes", error);
            toast.error("Failed to delete selected notes");
        }
    };

    const openConfirm = () => {
        if (selectedIds.length === 0) return;
        setConfirmOpen(true);
    };

    const closeConfirm = () => setConfirmOpen(false);

    return <div className="min-h-screen">
        {isRateLimitedUI && <RateLimitedUI />}
        <div className="max-w-7xl mx-auto p-4 mt-6">
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                    <button
                        className={`btn btn-sm transition-colors duration-200 hover:bg-base-200/80 ${selectionMode ? "btn-primary" : "btn-ghost"}`}
                        onClick={() => {
                            setSelectionMode((prev) => !prev);
                            setSelectedIds([]);
                        }}
                    >
                        {selectionMode ? "Selection On" : "Select"}
                    </button>
                    {selectionMode && (
                        <>
                            <button
                                className="btn btn-sm btn-ghost transition-colors duration-200 hover:bg-base-200/80"
                                onClick={handleSelectAll}
                            >
                                {selectedIds.length === sortedNotes.length ? "Clear All" : "Select All (Page)"}
                            </button>
                            <button
                                className="btn btn-sm btn-error btn-outline transition-colors duration-200 hover:bg-error/10"
                                onClick={openConfirm}
                                disabled={selectedIds.length === 0}
                            >
                                Delete Selected
                            </button>
                            <span className="text-sm text-base-content/60">
                                {selectedIds.length} selected
                            </span>
                        </>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-base-content/60">Sort</span>
                    <select
                        className="select select-bordered select-sm"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="newest">Newest first</option>
                        <option value="oldest">Oldest first</option>
                    </select>
                </div>
            </div>
            {loading && <div className="text-center text-primary py-10">Loading notes...</div>}
            {notes.length === 0 && !isRateLimitedUI && <NotesNotFound />}
            {notes.length > 0 && !isRateLimitedUI && (
                <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedNotes.map((note) => (
                                <NoteCard
                                    key={note._id}
                                    note={note}
                                    setNotes={setNotes}
                                    selectionMode={selectionMode}
                                    selected={selectedIds.includes(note._id)}
                                    onToggleSelect={toggleSelect}
                                />
                    ))}

                </div>

            )}

        </div>
        {confirmOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                <div className="w-full max-w-md rounded-2xl bg-base-100 shadow-xl border border-base-300/60">
                    <div className="p-6">
                        <h3 className="text-lg font-semibold">Delete selected notes?</h3>
                        <p className="mt-2 text-sm text-base-content/70">
                            This will permanently delete {selectedIds.length} note(s). This action can’t be undone.
                        </p>
                        <div className="mt-6 flex items-center justify-end gap-2">
                            <button className="btn btn-ghost btn-sm" onClick={closeConfirm}>
                                Cancel
                            </button>
                            <button
                                className="btn btn-error btn-sm"
                                onClick={async () => {
                                    await handleDeleteSelected();
                                    closeConfirm();
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
};

export default HomePage

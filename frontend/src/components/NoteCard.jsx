import { Link, useNavigate } from "react-router";
import { ClipboardPen, Trash2 } from "lucide-react";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";

const NoteCard = ({ note, setNotes, selectionMode, selected, onToggleSelect }) => {
    const navigate = useNavigate();
    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
         try{
            await api.delete(`/notes/${note._id}`)
            setNotes((prev) => prev.filter((n) => n._id !== note._id))
            toast.success("Note deleted successfully");
            window.location.reload();
         }catch(error){
            console.log("Error deleting note", error);
            toast.error("Failed to delete note");
         }
         setConfirmOpen(false);
    };

    const handleClipboardClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/note/${note._id}?edit=1`);
    };

    const handleSelectClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggleSelect?.(note._id);
    };

  return (
    <>
        <Link to={`/note/${note._id}`}
        className="card bg-base-100 shadow-md hover:shadow-xl 
        transition-shadow duration-200 border-t-4 border-solid border-black">
            <div className="card-body">
                <h3 className="card-title text-base-content">{note.title}</h3>
                <p className="text-base-content/70 line-clamp-3">{note.content}</p>
                <div className="card-actions justify-between text-center mt-4">
                    <div className="flex items-center gap-2">
                        {selectionMode && (
                            <input
                                type="checkbox"
                                className="checkbox checkbox-sm"
                                checked={!!selected}
                                onChange={handleSelectClick}
                                onClick={handleSelectClick}
                            />
                        )}
                        <span className="text-md text-base-content/60">
                            {formatDate(new Date(note.createdAt))}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                            <button className="btn btn-ghost btn-xs transition-colors duration-200 hover:bg-base-200/80" onClick={handleClipboardClick}>
                                <ClipboardPen className="size-4" />
                            </button>
                            <button className="btn btn-ghost btn-xs text-error transition-colors duration-200 hover:bg-error/10" onClick={handleClick}>
                                <Trash2 className="size-4" />
                            </button>
                    </div>
                </div>
            </div>
        </Link>
        {confirmOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                <div className="w-full max-w-md rounded-2xl bg-base-100 shadow-xl border border-base-300/60">
                    <div className="p-6">
                        <h3 className="text-lg font-semibold">Delete this note?</h3>
                        <p className="mt-2 text-sm text-base-content/70">
                            This action can’t be undone.
                        </p>
                        <div className="mt-6 flex items-center justify-end gap-2">
                            <button className="btn btn-ghost btn-sm" onClick={() => setConfirmOpen(false)}>
                                Cancel
                            </button>
                            <button className="btn btn-error btn-sm" onClick={handleConfirmDelete}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
  )
}

export default NoteCard

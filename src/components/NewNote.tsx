import { NoteForm } from "./NoteForm";
import { type NewNoteProps } from "../types.d";

export function NewNote({ onSubmit, onAddTag, availableTags }: NewNoteProps) {
    return(
        <>
            <h1 className="mb-4">New Note</h1>
            <NoteForm 
                onSubmit={onSubmit} 
                onAddTag={onAddTag} 
                availableTags={availableTags}/>
        </>
    )
}
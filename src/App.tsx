import "bootstrap/dist/css/bootstrap.min.css"
import { Navigate, Route, Routes } from "react-router-dom"
import { type RawNote, type Tag, type NoteData } from "./types.d"
import { NewNote } from "./components/NewNote"
import { Container } from "react-bootstrap"
import { useLocalStorage } from "./assets/hooks/useLocalStorage"
import { useMemo } from "react"
import { v4 as uuidV4 } from "uuid"
import { NoteList } from "./components/NoteList"
import { NoteLayout } from "./components/NoteLayout"
import { Note } from "./components/Note"
import { EditNote } from "./components/EditNote"

// import './App.css'

function App() {    
    const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
    const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

    const notesWithTags = useMemo(() => {
        return notes.map(note => {
            return {...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
        })
    }, [notes, tags])

    function onCreateNote({ tags, ...data }: NoteData) {
        setNotes(prevNotes => {
            return [
                ...prevNotes,
                { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) },
            ]
        })
    }
    function onUpdateNote(id: string, { tags, ...data }: NoteData) {
        setNotes(prevNotes => {
            return prevNotes.map(note => {
                if (note.id === id) {
                    return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
                } else {
                    return note
                }
            })
        })
    }
    function addTag(tag: Tag) {
        setTags(prev => [...prev, tag])
    }

    return (
        <>
            <Container className="my-4">
                <Routes>
                    <Route 
                        path="/" 
                        element={<NoteList  notes={notesWithTags} 
                            availableTags={tags}/>} 
                    />
                    <Route 
                        path="/new" 
                        element={<NewNote onSubmit={onCreateNote} 
                            onAddTag={addTag} 
                            availableTags={tags}/>} 
                    />
                    <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
                        <Route index element={<Note />} />
                        <Route 
                            path="edit" 
                            element={
                                <EditNote
                                    onSubmit={onUpdateNote}
                                    onAddTag={addTag}
                                    availableTags={tags}
                                />
                            } 
                        />
                    </Route>
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Container>
            
        </>
    )
}

export default App

import { useOutletContext } from "react-router-dom";
import { Note } from "../../types.d";

export function useNote () {
    return useOutletContext<Note>()
}
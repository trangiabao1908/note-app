import { useEffect, useState } from 'react';
import { ContentState, convertFromHTML, convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useLoaderData, useSubmit, useLocation } from 'react-router-dom';
// import { debounce } from '@mui/material';
import { useDebounce } from '../../hooks/useDebounce';
export default function Note() {
   const { note } = useLoaderData();
   const submit = useSubmit();
   const location = useLocation();

   const [editorState, setEditorState] = useState(() => {
      return EditorState.createEmpty();
   });

   const [rawHTML, setRawHTML] = useState(note.content);

   useEffect(() => {
      const blocksFromHTML = convertFromHTML(note.content);
      const state = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
      setEditorState(EditorState.createWithContent(state));
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [note.id]);
   const debounceValue = useDebounce(rawHTML, 1000);

   useEffect(() => {
      if (rawHTML === note.content) {
         return;
      }
      console.log(rawHTML);
      submit(
         {
            ...note,
            content: rawHTML,
         },
         { method: 'POST', action: location.pathname },
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [debounceValue]);
   // useEffect(() => {
   //    debouncedMemorized(rawHTML, note, location.pathname);
   //    // eslint-disable-next-line react-hooks/exhaustive-deps
   // }, [rawHTML, location.pathname]);

   // const debouncedMemorized = useMemo(() => {
   //    return debounce((rawHTML, note, pathname) => {
   //       if (rawHTML === note.content) return;

   //       submit(
   //          { ...note, content: rawHTML },
   //          {
   //             method: 'post',
   //             action: pathname,
   //          },
   //       );
   //    }, 1000);
   //    // eslint-disable-next-line react-hooks/exhaustive-deps
   // }, []);

   useEffect(() => {
      setRawHTML(note.content);
   }, [note.content]);

   const handleOnChange = (e) => {
      setEditorState(e);
      setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())));
   };

   return <Editor editorState={editorState} onEditorStateChange={handleOnChange} placeholder="Write something!" />;
}

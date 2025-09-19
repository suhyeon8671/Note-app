import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  FormatBold, FormatItalic, FormatUnderlined, FormatListBulleted, FormatListNumbered, FormatQuote, Code
} from '@mui/icons-material';
import { Box, IconButton, ToggleButton, Divider } from '@mui/material';
import './Editor.css';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <Box className="menu-bar">
      <ToggleButton value="bold" aria-label="bold" onClick={() => editor.chain().focus().toggleBold().run()} selected={editor.isActive('bold')}>
        <FormatBold />
      </ToggleButton>
      <ToggleButton value="italic" aria-label="italic" onClick={() => editor.chain().focus().toggleItalic().run()} selected={editor.isActive('italic')}>
        <FormatItalic />
      </ToggleButton>
      <ToggleButton value="underline" aria-label="underline" onClick={() => editor.chain().focus().toggleStrike().run()} selected={editor.isActive('strike')}>
        <FormatUnderlined />
      </ToggleButton>
      <Divider flexItem orientation="vertical" sx={{ mx: 1 }}/>
      <ToggleButton value="bulletList" aria-label="bullet list" onClick={() => editor.chain().focus().toggleBulletList().run()} selected={editor.isActive('bulletList')}>
        <FormatListBulleted />
      </ToggleButton>
      <ToggleButton value="orderedList" aria-label="ordered list" onClick={() => editor.chain().focus().toggleOrderedList().run()} selected={editor.isActive('orderedList')}>
        <FormatListNumbered />
      </ToggleButton>
      <Divider flexItem orientation="vertical" sx={{ mx: 1 }}/>
      <ToggleButton value="blockquote" aria-label="blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()} selected={editor.isActive('blockquote')}>
        <FormatQuote />
      </ToggleButton>
      <ToggleButton value="code" aria-label="code" onClick={() => editor.chain().focus().toggleCodeBlock().run()} selected={editor.isActive('codeBlock')}>
        <Code />
      </ToggleButton>
    </Box>
  );
};

const Editor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose',
      },
    }
  });

  return (
    <Box className="editor-container">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="editor-content"/>
    </Box>
  );
};

export default Editor;

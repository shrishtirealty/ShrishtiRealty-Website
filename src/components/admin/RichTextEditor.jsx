import { useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import Highlight from '@tiptap/extension-highlight'
import {
  FiBold, FiItalic, FiUnderline, FiLink, FiImage, FiAlignLeft, FiAlignCenter, FiAlignRight,
  FiList, FiMinus, FiCornerUpLeft, FiCornerUpRight, FiCode,
} from 'react-icons/fi'
import { FaListOl, FaQuoteLeft, FaStrikethrough } from 'react-icons/fa'
import { adminApi } from '../../utils/adminApi'

const FONTS = ['Inter', 'Playfair Display', 'Georgia', 'Arial', 'Times New Roman']
const HIGHLIGHTS = ['#fef08a', '#bbf7d0', '#bfdbfe', '#fecaca', '#e9d5ff']

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result.split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function ToolbarButton({ onClick, active, disabled, children, title }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} title={title}
      className={`w-8 h-8 rounded-md grid place-items-center transition-colors duration-200 ${active ? 'bg-dark-green text-white' : 'text-gray-500 hover:bg-gray-100'} disabled:opacity-30 disabled:cursor-not-allowed`}>
      {children}
    </button>
  )
}

export default function RichTextEditor({ content, onChange }) {
  const fileInputRef = useRef(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Image,
      Link.configure({ openOnClick: false }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Color,
      FontFamily,
      Highlight.configure({ multicolor: true }),
    ],
    content: content || '',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: { class: 'prose prose-neutral max-w-none min-h-[360px] focus:outline-none px-5 py-4' },
    },
  })

  if (!editor) return null

  const insertImage = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    try {
      const data = await fileToBase64(file)
      const res = await adminApi('upload', { method: 'POST', body: { filename: file.name, data } })
      editor.chain().focus().setImage({ src: res.url }).run()
    } catch (err) {
      alert('Image upload failed: ' + err.message)
    }
  }

  const setLink = () => {
    const prev = editor.getAttributes('link').href
    const url = window.prompt('Link URL', prev || 'https://')
    if (url === null) return
    if (url === '') { editor.chain().focus().extendMarkRange('link').unsetLink().run(); return }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-100 bg-gray-50/60">
        <select onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()} defaultValue=""
          className="text-[0.78rem] border border-gray-200 rounded-md px-2 py-1.5 mr-1 bg-white text-gray-600">
          <option value="" disabled>Font</option>
          {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>

        {[1, 2, 3].map((level) => (
          <ToolbarButton key={level} title={`Heading ${level}`} active={editor.isActive('heading', { level })}
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}>
            <span className="text-[0.72rem] font-bold">H{level}</span>
          </ToolbarButton>
        ))}

        <div className="w-px h-5 bg-gray-200 mx-1" />

        <ToolbarButton title="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}><FiBold size={14} /></ToolbarButton>
        <ToolbarButton title="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}><FiItalic size={14} /></ToolbarButton>
        <ToolbarButton title="Underline" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}><FiUnderline size={14} /></ToolbarButton>
        <ToolbarButton title="Strikethrough" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}><FaStrikethrough size={12} /></ToolbarButton>

        <div className="w-px h-5 bg-gray-200 mx-1" />

        <input type="color" title="Text color" onChange={(e) => editor.chain().focus().setColor(e.target.value).run()} className="w-7 h-7 rounded cursor-pointer border border-gray-200" />
        <div className="flex items-center gap-0.5 ml-1">
          {HIGHLIGHTS.map((c) => (
            <button key={c} type="button" title="Highlight" onClick={() => editor.chain().focus().toggleHighlight({ color: c }).run()}
              className="w-4 h-4 rounded-full border border-black/10" style={{ background: c }} />
          ))}
        </div>

        <div className="w-px h-5 bg-gray-200 mx-1" />

        <ToolbarButton title="Align left" active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()}><FiAlignLeft size={14} /></ToolbarButton>
        <ToolbarButton title="Align center" active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()}><FiAlignCenter size={14} /></ToolbarButton>
        <ToolbarButton title="Align right" active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()}><FiAlignRight size={14} /></ToolbarButton>

        <div className="w-px h-5 bg-gray-200 mx-1" />

        <ToolbarButton title="Bullet list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}><FiList size={14} /></ToolbarButton>
        <ToolbarButton title="Numbered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}><FaListOl size={13} /></ToolbarButton>
        <ToolbarButton title="Blockquote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}><FaQuoteLeft size={12} /></ToolbarButton>
        <ToolbarButton title="Code block" active={editor.isActive('codeBlock')} onClick={() => editor.chain().focus().toggleCodeBlock().run()}><FiCode size={14} /></ToolbarButton>

        <div className="w-px h-5 bg-gray-200 mx-1" />

        <ToolbarButton title="Link" active={editor.isActive('link')} onClick={setLink}><FiLink size={14} /></ToolbarButton>
        <ToolbarButton title="Image" onClick={() => fileInputRef.current?.click()}><FiImage size={14} /></ToolbarButton>
        <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={insertImage} />
        <ToolbarButton title="Horizontal rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}><FiMinus size={14} /></ToolbarButton>

        <div className="w-px h-5 bg-gray-200 mx-1" />

        <ToolbarButton title="Undo" onClick={() => editor.chain().focus().undo().run()}><FiCornerUpLeft size={14} /></ToolbarButton>
        <ToolbarButton title="Redo" onClick={() => editor.chain().focus().redo().run()}><FiCornerUpRight size={14} /></ToolbarButton>
      </div>

      <EditorContent editor={editor} />
    </div>
  )
}

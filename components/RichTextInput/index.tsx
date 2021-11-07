// this module looks for document when ssr so we need to add this check here
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false
import "react-quill/dist/quill.snow.css"

const modules = {
  toolbar: [
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["clean"]
  ],
  clipboard: {
    matchVisual: false
  }
}

const formats = [
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent"
]

export function RichTextInput({ value, onChange }) {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      placeholder={"Write your letter..."}
    />
  )
}

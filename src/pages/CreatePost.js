import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Navigate } from 'react-router-dom';
import Editor from "../Editor";



function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content] = useState("");
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  async function createNewPost(ev) {
      const data = new FormData();
      data.set('title', title);
      data.set('summary', summary);
      data.set('content', content);
      data.set('file', files[0]);

      ev.preventDefault();
      const response = await fetch('https://blog-app-mern-back-dri3.onrender.com/post', {
        method: 'POST',
        body: data,
        credentials: 'include',
      })

      if (response.ok) {
        setRedirect(true)
      }

  }

  if(redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={createNewPost}>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={ev => setTitle(ev.target.value)}
      />
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={ev => setSummary(ev.target.value)}

      />
      <input
        className="relative m-0 block w-full min-w-0 flex-auto rounded-lg border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
        type="file"
        onChange={ev => setFiles(ev.target.files)}
      />

      <Editor />
      <button className="text-white bg-gray-800 hover:bg-gray-900  font-medium rounded-lg  px-5 py-2.5 mb-2 w-full ">
        Create Post
      </button>
    </form>
  );
}

export default CreatePost;

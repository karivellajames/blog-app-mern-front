import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";

function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const [ redirect, setRedirect ] = useState(false);
  useEffect(() => {
    fetch(`https://blog-app-mern-back-dri3.onrender.com/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
    // eslint-disable-next-line
  }, []);

  if (!postInfo) return "";

  async function deletePost() {
    await fetch(`https://blog-app-mern-back-dri3.onrender.com/post/${id}`, {
      method: "DELETE",
      credentials: "include",
    }).then((response) => {
      response.json().then((info) => {
        setRedirect(true);
        // console.log(info)
      });
    });
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div>
      <h1 className="font-bold text-3xl text-center mb-3">{postInfo.title}</h1>
      <time className="block text-center text-[#aaa]">
        {formatISO9075(new Date(postInfo.createdAt))}
      </time>
      <div className="text-center mb-4 font-bold">
       by @{postInfo.author.username}
      </div>
      {userInfo && postInfo && userInfo.id === postInfo.author._id &&  (
        <div className="flex justify-center items-center gap-4">
          <div className="text-center m-4">
            <Link
              className="bg-[#333] text-white px-7 py-3 inline-flex items-center rounded-md gap-1"
              to={`/edit/${postInfo._id}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              Edit Post
            </Link>
          </div>
          <div>
            <button
              className="bg-[#333] text-white px-5 py-3 inline-flex items-center rounded-md gap-1"
              onClick={deletePost}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
              Delete Post
            </button>
          </div>
        </div>
      )}
      <div className="max-h-52 flex overflow-hidden">
        <img
          src={`http://localhost:4000/${postInfo.cover}`}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div
        className="mt-5 leading-7"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
}

export default PostPage;

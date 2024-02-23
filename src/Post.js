import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

function Post({_id, title, summary, cover, content, createdAt, author }) {
  return (
    <div className="grid grid-cols-[100%] gap-5 mb-7 sm:grid-cols-[40%,60%]">
      <div>
        <Link to={`/post/${_id}`}>
          <img
            src={"https://blog-app-mern-back-dri3.onrender.com/" + cover}
            alt=""
            className="h-full"
          />
        </Link>
      </div>
      <div>
        <Link to={`/post/${_id}`}>
          <h1 className="font-bold text-3xl mb-1">{title}</h1>
        </Link>
        <p className="mb-1 text-[#888] font-bold text-lg flex gap-3">
          <a className="text-[#333]">{author.username}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="leading-6">{summary}</p>
      </div>
    </div>
  );
}

export default Post;

import { useState } from "react";

export default function NewPost() {
  const [postType, setPostType] = useState("Question");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [abstract, setAbstract] = useState("");
  const [articleText, setArticleText] = useState("");
  const [tags, setTags] = useState("");

  const handlePost = (event) => {
    event.preventDefault();

    const tagList = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }

    if (postType === "Question" && !description.trim()) {
      alert("Please describe your problem.");
      return;
    }

    if (postType === "Article") {
      if (!abstract.trim()) {
        alert("Please enter an abstract.");
        return;
      }

      if (!articleText.trim()) {
        alert("Please enter the article text.");
        return;
      }
    }

    if (tagList.length > 3) {
      alert("Please enter no more than 3 tags.");
      return;
    }

    if (tagList.some((tag) => tag.length > 30)) {
      alert("Each tag must be 30 characters or fewer.");
      return;
    }

    if (tagList.some((tag) => !/^[a-zA-Z0-9+#.-]+$/.test(tag))) {
      alert("Tags can contain letters, numbers, +, #, . and -.");
      return;
    }

    alert("Your post has been sent successfully!");
  };

  const inputStyle =
    "w-full border border-gray-500 bg-white px-2 py-1 text-sm outline-blue-500";

  const labelStyle = "mb-1 block text-sm";

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-5 text-black">
      <h2 className="mb-3 bg-gray-200 px-2 py-1 text-sm font-bold">
        New Post
      </h2>

      <form onSubmit={handlePost}>
        <div className="mb-5 flex flex-wrap items-center gap-8 text-sm">
          <span>Select Post Type:</span>

          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="postType"
              value="Question"
              checked={postType === "Question"}
              onChange={() => setPostType("Question")}
            />
            Question
          </label>

          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="postType"
              value="Article"
              checked={postType === "Article"}
              onChange={() => setPostType("Article")}
            />
            Article
          </label>
        </div>

        <h3 className="bg-gray-200 px-2 py-1 text-sm font-bold">
          What do you want to ask or share
        </h3>

        

        <div className="mb-4">
          <label className={labelStyle} htmlFor="title">
            Title
          </label>
          <input
            id="title"
            className={inputStyle}
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder={
              postType === "Question"
                ? "Start your question with how, what, why, etc."
                : "Enter a descriptive title"
            }
            maxLength={150}
            required
          />
        </div>

        {postType === "Question" ? (
          <div className="mb-3">
            <label className={labelStyle} htmlFor="description">
              Describe your problem
            </label>
            <textarea
              id="description"
              className={`${inputStyle} min-h-64 resize-y`}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              maxLength={10000}
              required
            />
          </div>
        ) : (
          <>
            <div className="mb-3">
              <label className={labelStyle} htmlFor="abstract">
                Abstract
              </label>
              <textarea
                id="abstract"
                className={`${inputStyle} min-h-14 resize-y`}
                value={abstract}
                onChange={(event) => setAbstract(event.target.value)}
                placeholder="Enter a 1-paragraph abstract"
                maxLength={2000}
                required
              />
            </div>

            <div className="mb-4">
              <label className={labelStyle} htmlFor="articleText">
                Article Text
              </label>
              <textarea
                id="articleText"
                className={`${inputStyle} min-h-40 resize-y`}
                value={articleText}
                onChange={(event) => setArticleText(event.target.value)}
                placeholder="Enter your article text"
                maxLength={20000}
                required
              />
            </div>
          </>
        )}

        <div className="mb-6 flex flex-wrap items-center gap-2">
          <label htmlFor="tags" className="text-sm">
            Tags
          </label>
          <input
            id="tags"
            className={inputStyle}
            type="text"
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            placeholder={`Please add up to 3 tags to describe what your ${
              postType === "Question" ? "question" : "article"
            } is about e.g., Java`}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="min-w-36 bg-gray-400 px-8 py-1 text-sm hover:bg-gray-500"
          >
            Post
          </button>
        </div>
      </form>
    </main>
  );
}

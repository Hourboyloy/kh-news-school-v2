import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useGlobalContext } from "../context/GlobalContext";
import { FaThumbsUp, FaThumbsDown, FaReply } from "react-icons/fa";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";

const CommentSection = ({ openAuthModal, newsId, ListComments }) => {
  const { isLogin, user, token } = useGlobalContext();
  const FocusReplyMainComment = useRef([]);
  const FocusReplyChildComment = useRef([]);
  const [listComments, setListComments] = useState(ListComments);
  const [showorHideComment, setShowOrHide] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [activeReply, setActiveReply] = useState(null);
  const [activeReplyinReply, setActiveReplyinReply] = useState(null);
  const [ReplyInReplyloading, setReplyInReplyLoading] = useState(false);
  const [addCommentloading, setAddCommentLoading] = useState(false);
  const [replyMainCommentloading, setReplyMainCommentLoading] = useState(false);
  const [replyMainCommentText, setReplyMainCommentText] = useState("");
  const [replyChildCommentText, setReplyChildCommentText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const sortedComments = [...listComments].sort((a, b) => {
      return (b.like?.length || 0) - (a.like?.length || 0); // Sort comments by number of likes (desc)
    });

    // Sort replies for each comment by the number of likes
    const sortedCommentsWithReplies = sortedComments.map((comment) => {
      const sortedReplies = [...comment.replies].sort((a, b) => {
        return (b.like?.length || 0) - (a.like?.length || 0); // Sort replies by number of likes (desc)
      });
      return { ...comment, replies: sortedReplies }; // Add sorted replies to the comment
    });

    setListComments(sortedCommentsWithReplies); // Set the sorted list to state
  }, [ListComments]); // Sort whenever ListComments prop changes

  const handleFocus = () => setIsFocused(true);

  const handleClickReply = (rpMainOrclild, commentId, commentIndex) => {
    if (rpMainOrclild === "main") {
      // Toggle active reply for the main comment
      setActiveReply((prev) => (prev === commentId ? null : commentId));

      // Check if the reference exists after a slight delay
      setTimeout(() => {
        if (FocusReplyMainComment.current[commentIndex]) {
          FocusReplyMainComment.current[commentIndex].focus(); // Focus on the main comment input
        }
      }, 0); // Use a small timeout to allow the component to mount
    } else if (rpMainOrclild === "child") {
      setActiveReplyinReply((prev) => (prev === commentId ? null : commentId));
      setTimeout(() => {
        if (FocusReplyChildComment.current[commentIndex]) {
          FocusReplyChildComment.current[commentIndex].focus();
        }
      }, 0);
    }
  };

  const handleclearFocus = (typeofComment) => {
    if (typeofComment === "mainreply") {
      setActiveReply(null);
      setReplyMainCommentText("");
    } else if (typeofComment === "addcomment") {
      setIsFocused(false);
      setCommentText("");
    } else if (typeofComment === "childreply") {
      setActiveReplyinReply(null);
      setReplyChildCommentText("");
    }
  };

  const commentCount = listComments.length;
  const replyCount = listComments.reduce((total, comment) => {
    return total + (comment.replies ? comment.replies.length : 0);
  }, 0);
  // Total comments and replies count
  const totalCommentsAndReplies = commentCount + replyCount;

  const generateColorFromName = (name) => {
    let hash = 0;
    for (let i = 0; i < name?.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash % 360}, 50%, 70%)`;
  };

  const getInitials = (name) => {
    return name?.trim().slice(0, 1).toUpperCase(); // Show only the first character of the username
  };

  const handleAddComment = async () => {
    if (isLogin !== "1" && !user) {
      openAuthModal();
      return;
    }

    if (!commentText.trim()) {
      return;
    }

    if (addCommentloading) return;

    setAddCommentLoading(true);
    setIsFocused(false);

    try {
      const res = await axios.post(
        `https://api-news-dot-school.vercel.app/api/news/${newsId}/comments`,
        {
          userId: user._id,
          username: user?.username,
          commentText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setListComments((prev) => [res.data.comment, ...prev]);
        setAddCommentLoading(false);
        setCommentText("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReplyInReply = async (parentId, replyText, replyToUsername) => {
    if (isLogin !== "1" && !user) {
      openAuthModal();
      return;
    }

    if (!replyText.trim()) return alert("Reply cannot be empty!");
    if (ReplyInReplyloading) return;
    setReplyInReplyLoading(true);

    try {
      const response = await axios.post(
        `https://api-news-dot-school.vercel.app/api/news/${newsId}/comments/${parentId}/reply`,
        {
          userId: user._id,
          username: user?.username,
          replyText,
          replyToUsername,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setListComments((prev) =>
          prev.map((comment) =>
            comment._id === parentId
              ? {
                  ...comment, // Spread the existing properties of the comment
                  replies: [
                    ...comment.replies, // Include existing replies
                    response.data.comment.replies.at(-1), // Add the new reply
                  ],
                }
              : comment
          )
        );

        setActiveReplyinReply(null);
        setReplyChildCommentText("");
        setReplyInReplyLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to post reply.");
    }
  };

  const handleReply = async (parentId, replyText) => {
    if (isLogin !== "1" && !user) {
      openAuthModal();
      return;
    }

    if (!replyText.trim()) return alert("Reply cannot be empty!");
    if (replyMainCommentloading) return;
    setReplyMainCommentLoading(true);

    try {
      const response = await axios.post(
        `https://api-news-dot-school.vercel.app/api/news/${newsId}/comments/${parentId}/reply`,
        {
          userId: user._id,
          username: user?.username,
          replyText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setListComments((prev) =>
          prev.map((comment) =>
            comment._id === parentId
              ? {
                  ...comment,
                  replies: [
                    response.data.comment.replies.at(-1),
                    ...comment.replies,
                  ],
                }
              : comment
          )
        );
        setReplyMainCommentLoading(false);
        setActiveReply(null); // Close reply input
        setReplyMainCommentText("");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to post reply.");
      setReplyMainCommentLoading(false);
    }
  };

  const handleLikeDislikeComment = async (commentId, action) => {
    if (isLogin !== "1" && !user) {
      openAuthModal();
      return;
    }

    if (!["like", "dislike", "clearLike", "clearDislike"].includes(action)) {
      console.error(
        "Invalid action. Must be 'like', 'dislike', 'clearLike', or 'clearDislike'."
      );
      return;
    }

    try {
      setListComments((prev) =>
        prev.map((comment) => {
          if (comment._id === commentId) {
            const isLiked = comment.like.some(
              (like) => like.userid === user._id
            );
            const isDisliked = comment.dislike.some(
              (dislike) => dislike.userid === user._id
            );

            // Handle the like action
            if (action === "like") {
              if (isDisliked) {
                // Remove the dislike if it exists
                comment.dislike = comment.dislike.filter(
                  (dislike) => dislike.userid !== user._id
                );
              }
              if (!isLiked) {
                // Add the like if it doesn't exist
                comment.like.push({
                  userid: user._id,
                  username: user?.username,
                  createdAt: new Date(),
                });
              }
            }

            // Handle the dislike action
            if (action === "dislike") {
              if (isLiked) {
                // Remove the like if it exists
                comment.like = comment.like.filter(
                  (like) => like.userid !== user._id
                );
              }
              if (!isDisliked) {
                // Add the dislike if it doesn't exist
                comment.dislike.push({
                  userid: user._id,
                  username: user?.username,
                  createdAt: new Date(),
                });
              }
            }

            // Handle the clearLike action
            if (action === "clearLike" && isLiked) {
              // Remove the like if it exists
              comment.like = comment.like.filter(
                (like) => like.userid !== user._id
              );
            }

            // Handle the clearDislike action
            if (action === "clearDislike" && isDisliked) {
              // Remove the dislike if it exists
              comment.dislike = comment.dislike.filter(
                (dislike) => dislike.userid !== user._id
              );
            }

            return { ...comment }; // Return updated comment
          }
          return comment; // Return unchanged comment
        })
      );

      // After updating the state, call the API to update the server-side data
      await axios.post(
        `https://api-news-dot-school.vercel.app/api/news/${newsId}/comments/${commentId}/like-dislike`,
        {
          action,
          userId: user._id,
          username: user?.username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleReplyReaction = async (commentId, replyId, action) => {
    if (isLogin !== "1" && !user) {
      openAuthModal();
      return;
    }
    if (!["like", "dislike", "clearLike", "clearDislike"].includes(action)) {
      console.log(
        "Invalid action. Must be 'like', 'dislike', 'clearLike', or 'clearDislike'."
      );
      return;
    }

    // Update the frontend state immediately for better UX
    setListComments((prev) =>
      prev.map((comment) => {
        if (comment._id === commentId) {
          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply._id === replyId) {
                const alreadyLiked = reply.like.some(
                  (like) => like.userid === user._id
                );
                const alreadyDisliked = reply.dislike.some(
                  (dislike) => dislike.userid === user._id
                );

                if (action === "like") {
                  // Remove from dislike if currently disliked
                  if (alreadyDisliked) {
                    reply.dislike = reply.dislike.filter(
                      (dislike) => dislike.userid !== user._id
                    );
                  }
                  // Add to like if not already liked
                  if (!alreadyLiked) {
                    reply.like.push({
                      userid: user._id,
                      username: user?.username,
                    });
                  }
                } else if (action === "dislike") {
                  // Remove from like if currently liked
                  if (alreadyLiked) {
                    reply.like = reply.like.filter(
                      (like) => like.userid !== user._id
                    );
                  }
                  // Add to dislike if not already disliked
                  if (!alreadyDisliked) {
                    reply.dislike.push({
                      userid: user._id,
                      username: user?.username,
                    });
                  }
                } else if (action === "clearLike") {
                  if (alreadyLiked) {
                    reply.like = reply.like.filter(
                      (like) => like.userid !== user._id
                    );
                  }
                } else if (action === "clearDislike") {
                  if (alreadyDisliked) {
                    reply.dislike = reply.dislike.filter(
                      (dislike) => dislike.userid !== user._id
                    );
                  }
                }

                return { ...reply };
              }
              return reply;
            }),
          };
        }
        return comment;
      })
    );

    try {
      // Call the backend API to persist the reaction
      await axios.post(
        `https://api-news-dot-school.vercel.app/api/news/${newsId}/comments/${commentId}/replies/${replyId}/like-dislike`,
        {
          userId: user._id,
          username: user?.username,
          action,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating reply reaction:", error);
    }
  };

  return (
    <div className="bg-white mt-8">
      <h2 className="text-xl text-gray-700 mb-4">
        {totalCommentsAndReplies} មតិយោបល់
      </h2>

      {addCommentloading ? (
        <div className="flex items-center justify-center pt-4 pb-8">
          <div className="dot-spinner">
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
          </div>
        </div>
      ) : (
        <div className="mb-5">
          <div className="flex items-center w-full">
            <div className="">
              <p
                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold"
                style={{
                  backgroundColor: generateColorFromName(user?.username),
                }}
              >
                {getInitials(user?.username)} {/* Display only one character */}
              </p>
            </div>

            <div className="w-full pl-3">
              <input
                type="text"
                className="w-full h-10 text-gray-600 outline-none focus:outline-none"
                placeholder="បញ្ចូលមតិ..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onFocus={() => handleFocus()}
              />
              <div className="border-t border-gray-200 w-full"></div>
            </div>
          </div>

          {isFocused && (
            <div className="flex items-center justify-end space-x-2.5 mt-2.5">
              <button
                className="rounded-full transition-all duration-100 ease-in-out hover:bg-[#e5e5e5] px-5 py-2 outline-none focus:outline-none"
                onClick={() => handleclearFocus("addcomment")}
              >
                បោះបង់
              </button>

              <button
                className={`rounded-full bg-[#F2F2F2] px-5 py-2 outline-none focus:outline-none  ${
                  commentText !== ""
                    ? " bg-blue-600 text-white"
                    : "bg-[#F2F2F2] text-gray-400"
                }`}
                onClick={handleAddComment}
                disabled={commentText !== "" ? false : true}
              >
                ផ្ដល់​មតិ
              </button>
            </div>
          )}
        </div>
      )}

      <ul className=" space-y-5">
        {listComments.map((comment, index) => {
          return (
            <li key={comment._id || index} alter="" className="py-2">
              <div className="flex items-start relative">
                <button className="absolute top-0 -right-4 hover:bg-gray-100 transition-all duration-300 rounded-full p-2.5 outline-none focus:outline-none select-none">
                  <CiMenuKebab />
                </button>

                {/* <div className="flex flex-col absolute top-9 left-[95%] rounded-xl shadow bg-white py-1 w-36">
                  <button className="select-none focus:outline-none outline-none w-full py-1 hover:bg-gray-50 bg-white">
                    កែសម្រួល
                  </button>
                  <button className="select-none focus:outline-none outline-none w-full py-1 hover:bg-gray-50 bg-white">
                    លុប
                  </button>
                </div> */}

                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold mr-4"
                  style={{
                    backgroundColor: generateColorFromName(comment.username),
                  }}
                >
                  {getInitials(comment.username)}{" "}
                  {/* Display only one character */}
                </div>

                {/*main comment */}
                <div className="flex-1">
                  <p className="font-medium">{comment.username}</p>
                  <p className="text-gray-700">{comment.comment}</p>
                  <div className="flex items-center text-sm text-gray-500 space-x-4 mt-2">
                    <button
                      className="flex items-center space-x-1 transition duration-300 ease-in-out hover:text-blue-500"
                      onClick={() =>
                        handleLikeDislikeComment(
                          comment._id,
                          comment.like?.some(
                            (e) => e.username === user?.username
                          )
                            ? "clearLike"
                            : "like"
                        )
                      }
                      // disabled={loading || userHasLiked}
                    >
                      <FaThumbsUp
                        className={`${
                          comment.like?.some(
                            (e) => e.username === user?.username
                          )
                            ? "text-blue-500"
                            : ""
                        }`}
                      />
                      <span>{comment.like?.length || 0}</span>
                    </button>

                    <button
                      className="flex items-center space-x-1 transition duration-300 ease-in-out hover:text-red-500"
                      onClick={() =>
                        handleLikeDislikeComment(
                          comment._id,
                          comment.dislike?.some(
                            (e) => e.username === user?.username
                          )
                            ? "clearDislike"
                            : "dislike"
                        )
                      }
                      // disabled={loading || userHasDisliked}
                    >
                      <FaThumbsDown
                        className={`${
                          comment.dislike?.some(
                            (e) => e.username === user?.username
                          )
                            ? "text-red-500"
                            : ""
                        }`}
                      />
                      <span>{comment.dislike?.length || 0}</span>
                    </button>

                    <button
                      className="flex items-center space-x-1 transition duration-300 ease-in-out hover:text-gray-600"
                      onClick={() =>
                        handleClickReply("main", comment._id, index)
                      }
                    >
                      <FaReply /> <span>Reply</span>
                    </button>
                  </div>

                  {/* reply main comment */}
                  {activeReply === comment._id &&
                    (replyMainCommentloading ? (
                      <div className="flex items-center justify-center pb-4 pt-4">
                        <div className="dot-spinner">
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-5">
                        <div className="flex items-center w-full">
                          <div className="">
                            <p
                              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                              style={{
                                backgroundColor: generateColorFromName(
                                  user?.username
                                ),
                              }}
                            >
                              {getInitials(user?.username)}{" "}
                              {/* Display only one character */}
                            </p>
                          </div>

                          <div className="w-full pl-3">
                            <input
                              // ref={FocusReplyMainComment}
                              ref={(el) =>
                                (FocusReplyMainComment.current[index] = el)
                              }
                              type="text"
                              className="w-full h-10 text-gray-600 outline-none focus:outline-none"
                              placeholder="បញ្ចូលមតិ..."
                              value={replyMainCommentText}
                              onChange={(e) =>
                                setReplyMainCommentText(e.target.value)
                              }
                            />
                            <div className="border-t border-gray-200 w-full"></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-end space-x-2.5 mt-2.5">
                          <button
                            className="rounded-full transition-all duration-100 ease-in-out hover:bg-[#e5e5e5] px-5 py-2 outline-none focus:outline-none"
                            // onClick={handleclearFocus}
                            onClick={() => handleclearFocus("mainreply")}
                          >
                            បោះបង់
                          </button>

                          <button
                            className={`rounded-full bg-[#F2F2F2] px-5 py-2 outline-none focus:outline-none  ${
                              replyMainCommentText !== ""
                                ? " bg-blue-600 text-white"
                                : "bg-[#F2F2F2] text-gray-400"
                            }`}
                            // onClick={handleAddComment}
                            disabled={
                              replyMainCommentText !== "" ? false : true
                            }
                            onClick={() =>
                              handleReply(comment._id, replyMainCommentText)
                            }
                          >
                            ផ្ដល់​មតិ
                          </button>
                        </div>
                      </div>
                    ))}

                  {/* child comment  */}
                  {comment?.replies && comment?.replies.length > 0 ? (
                    showorHideComment.includes(comment._id) ? (
                      <>
                        <button
                          onClick={() =>
                            setShowOrHide((prev) =>
                              prev.filter((id) => id !== comment._id)
                            )
                          }
                          className="mt-2 px-5 pb-2 pt-2.5 text-blue-600 text-sm rounded-full hover:bg-blue-500 hover:bg-opacity-15 transition-all outline-none focus:outline-none flex items-center space-x-1"
                        >
                          <IoIosArrowUp />{" "}
                          <p className="pl-0.5">ការឆ្លើយតបចំនួន</p>{" "}
                          <p>{comment?.replies.length}</p>
                        </button>

                        <ul className="mt-4 space-y-5 border-l pl-2">
                          {comment.replies.map((reply) => (
                            <li key={reply._id} className="mt-2">
                              <div className="relative">
                                <div className="flex">
                                  <p
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3"
                                    style={{
                                      backgroundColor: generateColorFromName(
                                        reply.username
                                      ),
                                    }}
                                  >
                                    {getInitials(reply.username)}
                                  </p>
                                  <div className="flex-1">
                                    <div className="flex items-center font-semibold text-gray-700 space-x-3">
                                      <p className="">{reply.username}</p>

                                      {reply.replyToUsername !== "" && (
                                        <div className="flex items-center space-x-3">
                                          <p className="font-normal">
                                            reply to
                                          </p>
                                          <p className="">
                                            {reply.replyToUsername}
                                          </p>
                                        </div>
                                      )}
                                    </div>

                                    <p className="text-gray-700">
                                      {reply.comment}
                                    </p>

                                    <div className="flex items-center text-sm text-gray-500 space-x-4 mt-2">
                                      <button
                                        className="flex items-center space-x-1 transition duration-300 ease-in-out hover:text-blue-500"
                                        onClick={() =>
                                          handleReplyReaction(
                                            comment._id,
                                            reply._id,
                                            reply.like?.some(
                                              (e) =>
                                                e.username === user?.username
                                            )
                                              ? "clearLike"
                                              : "like"
                                          )
                                        }
                                        // disabled={loading || userHasLiked}
                                      >
                                        <FaThumbsUp
                                          className={`${
                                            reply.like?.some(
                                              (e) =>
                                                e.username === user?.username
                                            )
                                              ? "text-blue-500"
                                              : ""
                                          }`}
                                        />
                                        <span>{reply.like?.length || 0}</span>
                                      </button>

                                      <button
                                        className="flex items-center space-x-1 transition duration-300 ease-in-out hover:text-red-500"
                                        onClick={() =>
                                          handleReplyReaction(
                                            comment._id,
                                            reply._id,
                                            reply.dislike?.some(
                                              (e) =>
                                                e.username === user?.username
                                            )
                                              ? "clearDislike"
                                              : "dislike"
                                          )
                                        }
                                      >
                                        <FaThumbsDown
                                          className={`${
                                            reply.dislike?.some(
                                              (e) =>
                                                e.username === user?.username
                                            )
                                              ? "text-red-500"
                                              : ""
                                          }`}
                                        />
                                        <span>
                                          {reply.dislike?.length || 0}
                                        </span>
                                      </button>

                                      <button
                                        className="flex items-center space-x-1 transition duration-300 ease-in-out hover:text-gray-600"
                                        onClick={() =>
                                          handleClickReply(
                                            "child",
                                            reply._id,
                                            index
                                          )
                                        }
                                      >
                                        <FaReply /> <span>Reply</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <button className="absolute top-0 -right-4 hover:bg-gray-100 transition-all duration-300 rounded-full p-2.5 outline-none focus:outline-none select-none">
                                  <CiMenuKebab />
                                </button>

                                {/* <div className="flex flex-col absolute z-10 top-14 left-[95%] rounded-xl shadow bg-white py-1 w-36">
                                    <button className="select-none focus:outline-none outline-none w-full py-1 hover:bg-gray-50 bg-white">
                                      កែសម្រួល
                                    </button>
                                    <button className="select-none focus:outline-none outline-none w-full py-1 hover:bg-gray-50 bg-white">
                                      លុប
                                    </button>
                                  </div> */}
                              </div>

                              {activeReplyinReply === reply._id && (
                                <div>
                                  {ReplyInReplyloading ? (
                                    <div className="flex items-center justify-center pb-4 pt-4">
                                      <div className="dot-spinner">
                                        <div className="dot-spinner__dot"></div>
                                        <div className="dot-spinner__dot"></div>
                                        <div className="dot-spinner__dot"></div>
                                        <div className="dot-spinner__dot"></div>
                                        <div className="dot-spinner__dot"></div>
                                        <div className="dot-spinner__dot"></div>
                                        <div className="dot-spinner__dot"></div>
                                        <div className="dot-spinner__dot"></div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="mt-5">
                                      <div className="flex items-center w-full">
                                        <div className="">
                                          <p
                                            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                                            style={{
                                              backgroundColor:
                                                generateColorFromName(
                                                  user?.username
                                                ),
                                            }}
                                          >
                                            {getInitials(user?.username)}{" "}
                                            {/* Display only one character */}
                                          </p>
                                        </div>

                                        <div className="w-full pl-3">
                                          <input
                                            ref={(el) =>
                                              (FocusReplyChildComment.current[
                                                index
                                              ] = el)
                                            }
                                            placeholder="Reply..."
                                            type="text"
                                            value={replyChildCommentText}
                                            onChange={(e) =>
                                              setReplyChildCommentText(
                                                e.target.value
                                              )
                                            }
                                            className="w-full h-10 text-gray-600 outline-none focus:outline-none"
                                          />
                                          <div className="border-t border-gray-200 w-full"></div>
                                        </div>
                                      </div>

                                      <div className="flex items-center justify-end space-x-2.5 mt-2.5">
                                        <button
                                          className="rounded-full transition-all duration-100 ease-in-out hover:bg-[#e5e5e5] px-5 py-2 outline-none focus:outline-none"
                                          onClick={() =>
                                            handleclearFocus("childreply")
                                          }
                                        >
                                          បោះបង់
                                        </button>

                                        <button
                                          className={`rounded-full bg-[#F2F2F2] px-5 py-2 outline-none focus:outline-none  ${
                                            replyChildCommentText !== ""
                                              ? " bg-blue-600 text-white"
                                              : "bg-[#F2F2F2] text-gray-400"
                                          }`}
                                          onClick={() =>
                                            handleReplyInReply(
                                              comment._id,
                                              replyChildCommentText,
                                              comment.username
                                            )
                                          }
                                          disabled={ReplyInReplyloading}
                                        >
                                          ផ្ដល់​មតិ
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <button
                        onClick={() =>
                          setShowOrHide((prev) => [...prev, comment._id])
                        }
                        className="mt-2 px-5 pb-2 pt-2.5 text-blue-600 text-sm rounded-full hover:bg-blue-500 hover:bg-opacity-15 transition-all outline-none focus:outline-none flex items-center space-x-1"
                      >
                        <IoIosArrowDown />{" "}
                        <p className="pl-0.5">ការឆ្លើយតបចំនួន</p>{" "}
                        <p>{comment?.replies.length}</p>
                      </button>
                    )
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CommentSection;

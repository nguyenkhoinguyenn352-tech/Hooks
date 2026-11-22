import { useEffect, useState } from "react";
import { useLike } from "../Hooks/apiHooks";
import { useUserContext } from "../Hooks/contextHooks";

const Likes = ({ item }) => {
    const [likeCount, setLikeCount] = useState(0);
    const [userLike, setUserLike] = useState(null);
    const { postLike, deleteLike, getLikeCountByMediaId, getLikeByUser } =
        useLike();
    const { user } = useUserContext();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!item?.media_id) return;

        const fetchLikes = async () => {
            try {
                const countResult = await getLikeCountByMediaId(item.media_id);
                setLikeCount(countResult.count ?? countResult);

                if (token) {
                    try {
                        const existingLike = await getLikeByUser(item.media_id, token);
                        setUserLike(existingLike || null);
                    } catch {
                        setUserLike(null);
                    }
                } else {
                    setUserLike(null);
                }
            } catch (e) {
                console.log(e.message);
            }
        };

        fetchLikes();
    }, [item?.media_id, token]);

    const handleLikeClick = async () => {
        if (!user || !token) return;

        try {
            if (userLike) {
                const likeId = userLike.like_id ?? userLike.id;
                await deleteLike(likeId, token);
                setUserLike(null);
                setLikeCount((prev) => Math.max(0, prev - 1));
            } else {
                const created = await postLike(item.media_id, token);
                setUserLike(created.data ?? created);
                setLikeCount((prev) => prev + 1);
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <div className="flex items-center gap-3 my-3">
            <button
                type="button"
                disabled={!user}
                onClick={handleLikeClick}
                className={`px-3 py-1.5 rounded text-sm font-medium ${
                    !user
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : userLike
                            ? "bg-pink-600 text-white hover:bg-pink-700 cursor-pointer"
                            : "bg-slate-800 text-white hover:bg-slate-700 cursor-pointer"
                }`}
            >
                {userLike ? "♥ Liked" : "♡ Like"}
            </button>
            <span className="text-sm font-medium">Likes: {likeCount}</span>
        </div>
    );
};

export default Likes;
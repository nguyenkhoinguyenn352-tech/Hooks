import { useEffect, useState } from "react";
import { fetchData } from "../fetchData";

const useMedia = () => {
    const [mediaArray, setMediaArray] = useState([]);

    const getMedia = async () => {
        try {
            const mediaData = await fetchData(
                import.meta.env.VITE_MEDIA_API + "/media"
            );
            setMediaArray(mediaData);
        } catch (error) {
            console.error("Error fetching media:", error);
        }
    };

    useEffect(() => {
        getMedia();
    }, []);

    const postMedia = async (fileData, inputs, token) => {
        const mediaPayload = {
            ...inputs,
            filename: fileData.filename,
            filesize: fileData.filesize,
            media_type: fileData.media_type,
        };

        const fetchOptions = {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mediaPayload),
        };

        return await fetchData(
            import.meta.env.VITE_MEDIA_API + "/media",
            fetchOptions
        );
    };

    const modifyMedia = async (id, inputs, token) => {
        const fetchOptions = {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputs),
        };

        return await fetchData(
            import.meta.env.VITE_MEDIA_API + "/media/" + id,
            fetchOptions
        );
    };

    const deleteMedia = async (id, token) => {
        const fetchOptions = {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
            },
        };

        return await fetchData(
            import.meta.env.VITE_MEDIA_API + "/media/" + id,
            fetchOptions
        );
    };

    return { mediaArray, postMedia, modifyMedia, deleteMedia };
};

const useFile = () => {
    const postFile = async (file, token) => {
        const formData = new FormData();
        formData.append("file", file);

        const fetchOptions = {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
            },
            body: formData,
        };

        return await fetchData(
            import.meta.env.VITE_UPLOAD_SERVER + "/upload",
            fetchOptions
        );
    };

    return { postFile };
};

const useLike = () => {
    const postLike = async (media_id, token) => {
        const fetchOptions = {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ media_id }),
        };

        return await fetchData(
            import.meta.env.VITE_MEDIA_API + "/likes",
            fetchOptions
        );
    };

    const deleteLike = async (id, token) => {
        const fetchOptions = {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
            },
        };

        return await fetchData(
            import.meta.env.VITE_MEDIA_API + "/likes/" + id,
            fetchOptions
        );
    };

    const getLikeCountByMediaId = async (media_id) => {
        return await fetchData(
            import.meta.env.VITE_MEDIA_API + "/likes/count/" + media_id
        );
    };

    const getLikeByUser = async (media_id, token) => {
        const fetchOptions = {
            headers: {
                Authorization: "Bearer " + token,
            },
        };

        return await fetchData(
            import.meta.env.VITE_MEDIA_API + "/likes/bymedia/user/" + media_id,
            fetchOptions
        );
    };

    return {
        postLike,
        deleteLike,
        getLikeCountByMediaId,
        getLikeByUser,
    };
};

export { useMedia, useFile, useLike };
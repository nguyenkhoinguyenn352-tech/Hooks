import { useEffect, useState } from "react";
import { fetchData } from "../fetchData";

const useMedia = () => {
    const [mediaArray, setMediaArray] = useState([]);

    const getMedia = async () => {
        try {
            const mediaData = await fetchData(
                import.meta.env.VITE_MEDIA_API + "/media"
            );
            const authApiUrl = import.meta.env.VITE_AUTH_SERVER;
            const newData = await Promise.all(
                mediaData.map(async (item) => {
                    const data = await fetchData(authApiUrl + "/users/" + item.user_id);
                    return { ...item, username: data.username };
                })
            );
            setMediaArray(newData);
        } catch (error) {
            console.error("error", error);
        }
    };

    useEffect(() => {
        getMedia();
    }, []);

    const postMedia = async (file, inputs, token) => {
        const mediaData = {
            ...inputs,
            ...file,
        };

        const fetchOptions = {
            method: "POST",
            headers: {
                Authorization: "Bearer: " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mediaData),
        };

        return await fetchData(
            import.meta.env.VITE_MEDIA_API + "/media",
            fetchOptions
        );
    };

    return { mediaArray, postMedia };
};

const useAuthentication = () => {
    const postLogin = async (inputs) => {
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputs),
        };
        return await fetchData(
            import.meta.env.VITE_AUTH_SERVER + "/auth/login",
            fetchOptions
        );
    };

    return { postLogin };
};

const useUser = () => {
    const postUser = async (inputs) => {
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputs),
        };
        return await fetchData(
            import.meta.env.VITE_AUTH_SERVER + "/users",
            fetchOptions
        );
    };

    const getUserByToken = async (token) => {
        const fetchOptions = {
            headers: {
                Authorization: "Bearer: " + token,
            },
        };
        return await fetchData(
            import.meta.env.VITE_AUTH_SERVER + "/users/token",
            fetchOptions
        );
    };

    return { getUserByToken, postUser };
};

const useFile = () => {
    const postFile = async (file, token) => {
        const formData = new FormData();
        formData.append("file", file);

        const fetchOptions = {
            method: "POST",
            headers: {
                Authorization: "Bearer: " + token,
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

export { useMedia, useAuthentication, useUser, useFile };
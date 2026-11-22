import { useUserContext } from "./Hooks/contextHooks";

const MediaRow = ({ item, setSelectedItem }) => {
    const { user } = useUserContext();

    const canModifyOrDelete =
        user && (user.user_id === item.user_id || user.level_name === "Admin");

    return (
        <tr className="border-b border-gray-200 text-sm">
            <td className="p-2">
                <img
                    src={item.thumbnail || item.filename}
                    alt={item.title}
                    className="w-24 h-16 object-cover rounded"
                />
            </td>
            <td className="p-2 font-medium">{item.title}</td>
            <td className="p-2">{item.description}</td>
            <td className="p-2">
                {item.created_at ? new Date(item.created_at).toLocaleString() : ""}
            </td>
            <td className="p-2">{item.filesize}</td>
            <td className="p-2">{item.media_type}</td>
            <td className="p-2">{item.user_id}</td>
            <td className="p-2">
                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={() => setSelectedItem(item)}
                        className="px-2.5 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                    >
                        Show
                    </button>

                    {canModifyOrDelete && (
                        <>
                            <button
                                type="button"
                                onClick={() => console.log("modify", item)}
                                className="px-2.5 py-1 rounded bg-amber-600 text-white hover:bg-amber-700 cursor-pointer"
                            >
                                Modify
                            </button>
                            <button
                                type="button"
                                onClick={() => console.log("delete", item)}
                                className="px-2.5 py-1 rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                            >
                                Delete
                            </button>
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default MediaRow;
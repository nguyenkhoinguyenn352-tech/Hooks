import { useState } from "react";
import { useMedia } from "./Hooks/apiHooks";
import MediaRow from "./MediaRow";
import Single from "./Single";

const Home = () => {
    const { mediaArray } = useMedia();
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <>
            {selectedItem && (
                <Single item={selectedItem} setSelectedItem={setSelectedItem} />
            )}
            <h2>Media</h2>
            <table>
                <thead>
                <tr>
                    <th>Thumbnail</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Created</th>
                    <th>Size</th>
                    <th>Type</th>
                    <th>Owner</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {mediaArray.map((item) => (
                    <MediaRow
                        key={item.media_id}
                        item={item}
                        setSelectedItem={setSelectedItem}
                    />
                ))}
                </tbody>
            </table>
        </>
    );
};

export default Home;
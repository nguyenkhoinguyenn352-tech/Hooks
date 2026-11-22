const fetchData = async (url, options = {}) => {
    const response = await fetch(url, options);
    const json = await response.json();
    if (!response.ok) {
        const message = json.message || "Error fetching data";
        throw new Error(message);
    }
    return json;
};

export { fetchData };
export default fetchData;
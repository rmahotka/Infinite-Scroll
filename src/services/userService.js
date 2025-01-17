/**
 * Loads the user cache from `sessionStorage`.
 * @returns A record of cached users, indexed by page number.
 */
const loadCache = () => {
    const cache = sessionStorage.getItem('cacheUser');
    return cache ? JSON.parse(cache) : {};
};
/**
 * Saves the user cache to `sessionStorage`.
 * @param cache - The cache object containing user data indexed by page number.
 */
const saveCache = (cache) => sessionStorage.setItem('cacheUser', JSON.stringify(cache));
/**
 * Fetches user data from the external API for a given page.
 * @param page - The page number to fetch users for.
 * @returns A promise that resolves with the raw data from the API.
 * @throws An error if the API request fails.
 */
const fetchUserFromApi = async (page) => {
    const response = await fetch(`https://randomuser.me/api/?results=26&page=${page}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch users for page ${page}`);
    }
    return response.json();
};
/**
 * Fetches and returns a list of users for the specified page.
 * It uses cached data if available, otherwise fetches data from the API.
 * @param page - The page number to fetch users for.
 * @returns A promise that resolves with a list of `IUserCompact` objects.
 */
export const fetchUsers = async (page) => {
    const cache = loadCache();
    if (cache[page]) {
        return cache[page];
    }
    const data = await fetchUserFromApi(page);
    const compactData = data.results.map((user) => ({
        id: user?.login?.uuid,
        name: `${user?.name?.first} ${user?.name?.last}`,
        email: user?.email,
        picture: user?.picture?.large,
    }));
    cache[page] = compactData;
    saveCache(cache);
    return compactData;
};

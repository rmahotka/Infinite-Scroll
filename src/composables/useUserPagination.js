import { fetchUsers } from "@/services/userService";
import { ref, watch } from "vue";
/**
* Custom hook displaying pagination for user uploads
* @param initPage - The initial page number to start from (default is 1).
* @return An object containing the users, loading state, current page, and a function to load users for a specific page.
*/
export function useUserPagination(initPage = 1) {
    /** List of users for the current page  */
    const users = ref([]);
    /** Download status for fetch users */
    const loading = ref(false);
    /** Current page number */
    const page = ref(initPage);
    /**
     * Loads the users for the specified page number.
     * @param pageNumber - The page number for which to load the users.
     */
    const loadPageUsers = async (pageNumber) => {
        loading.value = true;
        try {
            const pageUsers = await fetchUsers(pageNumber);
            users.value.push(...pageUsers);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            loading.value = false;
        }
    };
    /** watch method that watches for page number changes, and in case of change executes the `loadPageUsers` request
     * and changes the page number in the url
     */
    watch(page, async (newPage) => {
        await loadPageUsers(newPage);
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set("page", newPage.toString());
        window.history.pushState({}, "", currentUrl);
    });
    return { users, loading, page, loadPageUsers };
}

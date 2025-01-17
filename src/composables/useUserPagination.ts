import {fetchUsers} from "@/services/userService";
import type {IUserCompact} from '@/type/User'
import {Ref, ref, watch} from "vue";

 /**
 * Custom hook displaying pagination for user uploads
 * @param initPage - The initial page number to start from (default is 1).
 * @return An object containing the users, loading state, current page, and a function to load users for a specific page.
 */
export function useUserPagination (initPage:number = 1):{
    /** List of users for the current page */
    users: Ref<IUserCompact[]>;
    /** Download status for fetch users */
    loading: Ref<boolean>;
    /** Current page number */
    page: Ref<number>;
    /** User upload function for a specific page */
    loadPageUsers: (pageNumber: number) => Promise<void>;
}  {
    /** List of users for the current page  */
    const users = ref<IUserCompact[]>([])
    /** Download status for fetch users */
    const loading = ref<boolean>(false)
    /** Current page number */
    const page = ref<number>(initPage);

    /**
     * Loads the users for the specified page number.
     * @param pageNumber - The page number for which to load the users.
     */
    const loadPageUsers = async (pageNumber:number):Promise<void> => {
        loading.value = true
        try {
            const pageUsers = await fetchUsers(pageNumber)
            users.value.push(...pageUsers)
        } catch (e:unknown) {
            console.error(e)
        } finally {
            loading.value = false
        }
    }

    /** watch method that watches for page number changes, and in case of change executes the `loadPageUsers` request
     * and changes the page number in the url
     */
    watch(page, async (newPage: number) => {
        await loadPageUsers(newPage);
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set("page", newPage.toString());
        window.history.pushState({}, "", currentUrl);
    });

    return {users, loading, page, loadPageUsers}
}

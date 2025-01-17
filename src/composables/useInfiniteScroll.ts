import {onMounted, onUnmounted} from "vue";

/**
 * Custom hook for implementing infinite scroll functionality.
 * @param callback - A function to be called when the scroll reaches the bottom of the page.
 * @param offset - The offset from the bottom of the page to trigger the callback (default is 50).
 * @param delay - The debounce delay in milliseconds (default is 200).
 */
export function useInfiniteScroll (callback: ()=>void, offset:number = 50, delay:number = 200)  {

    /**
     * Creates a debounced version of the provided function.
     * @param func - The function to debounce.
     * @param wait - The delay in milliseconds before invoking the function.
     * @returns A debounced function.
     */
    const debounce = (func: ()=> void, wait: number):()=>void => {
        let timer: number | undefined;
        return () => {
            clearTimeout(timer);
            timer = setTimeout(() => func(), wait);
        };
    };

    /**
     * Handles the scroll event and triggers the callback if the scroll reaches the specified offset from the bottom.
     */
    const handleScroll = ():void => {
        const scrollTop:number = document.documentElement.scrollTop;
        const scrollHeight:number = document.documentElement.scrollHeight;
        const clientHeight:number = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight - offset) {
            callback()
        }
    };

    /** Debounced version of the `handleScroll` function. */
    const debouncedHandleScroll = debounce(handleScroll, delay);

    /** Adds the debounced scroll event listener when the component is mounted. */
    onMounted( () => {
        window.addEventListener("scroll", debouncedHandleScroll);
    });

    /** Removes the scroll event listener when the component is unmounted. */
    onUnmounted(() => {
        window.removeEventListener("scroll", debouncedHandleScroll);
    });
}
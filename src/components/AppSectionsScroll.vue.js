import UserCard from "@/components/UserCard.vue";
import { useInfiniteScroll } from '@/composables/useInfiniteScroll';
import { useUserPagination } from "@/composables/useUserPagination";
import { onMounted } from "vue";
/** Pagination setup */
const { users, page, loading, loadPageUsers } = useUserPagination();
/** Load next page of users */
const loadNextPage = () => {
    page.value++;
};
/** Infinite scrolling */
useInfiniteScroll(loadNextPage, 50, 200);
/** Initial data download. Gets the URL and substitutes it into page if not, substitutes 1.
 * After that it executes the download request
 */
onMounted(async () => {
    const currentUrl = new URL(window.location.href);
    const pageUrlQuery = Number(currentUrl.searchParams.get("page")) || 1;
    page.value = pageUrlQuery;
    await loadPageUsers(page.value);
});
; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    ['block',];
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
        ...{ class: ("block") },
        ...{ class: (({ 'block-loading': __VLS_ctx.loading })) },
    });
    for (const [user] of __VLS_getVForSourceType((__VLS_ctx.users))) {
        // @ts-ignore
        /** @type { [typeof UserCard, ] } */ ;
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(UserCard, new UserCard({
            key: ((user.id)),
            user: ((user)),
            ...{ class: ("block__item") },
        }));
        const __VLS_1 = __VLS_0({
            key: ((user.id)),
            user: ((user)),
            ...{ class: ("block__item") },
        }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    }
    if (__VLS_ctx.loading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p)({
            ...{ class: ("loader-item") },
        });
    }
    ['block', 'block-loading', 'block__item', 'loader-item',];
    var __VLS_slots;
    var $slots;
    let __VLS_inheritedAttrs;
    var $attrs;
    const __VLS_refs = {};
    var $refs;
    var $el;
    return {
        attrs: {},
        slots: __VLS_slots,
        refs: $refs,
        rootEl: $el,
    };
}
;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            UserCard: UserCard,
            users: users,
            loading: loading,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */

import { ref } from "vue";
const __VLS_props = defineProps();
/** Tracking image loading status */
const imageLoaded = ref(false);
/** Tracking the status of an error when loading an image */
const imageError = ref(false);
/** Silent picture */
const defaultImage = '/not_user.webp';
; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    ['user-card', 'user-card__email',];
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("user-card") },
    });
    if (!__VLS_ctx.imageLoaded) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div)({
            ...{ class: ("skeleton") },
        });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({
        ...{ onLoad: (...[$event]) => {
                __VLS_ctx.imageLoaded = true;
            } },
        ...{ onError: (...[$event]) => {
                __VLS_ctx.imageError = true;
            } },
        ...{ class: ("user-card__image") },
        src: ((__VLS_ctx.imageError ? __VLS_ctx.defaultImage : __VLS_ctx.user?.picture || __VLS_ctx.defaultImage)),
        alt: ((__VLS_ctx.user?.name)),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: ("user-card__name") },
    });
    (__VLS_ctx.user?.name);
    __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
        ...{ class: ("user-card__email") },
        href: ((`mailto:${__VLS_ctx.user?.email}`)),
    });
    (__VLS_ctx.user?.email);
    ['user-card', 'skeleton', 'user-card__image', 'user-card__name', 'user-card__email',];
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
            imageLoaded: imageLoaded,
            imageError: imageError,
            defaultImage: defaultImage,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */

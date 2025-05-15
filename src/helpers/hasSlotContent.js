import { Comment, Text, } from 'vue';
export function hasSlotContent(slot, slotProps = {}) {
    if (!slot)
        return false;
    return slot(slotProps).some((vnode) => {
        if (vnode.type === Comment)
            return false;
        if (Array.isArray(vnode.children) && !vnode.children.length)
            return false;
        return (vnode.type !== Text
            || (typeof vnode.children === 'string' && vnode.children.trim() !== ''));
    });
}
//# sourceMappingURL=hasSlotContent.js.map
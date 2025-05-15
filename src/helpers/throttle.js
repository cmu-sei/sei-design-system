export default function throttle(callback, delay) {
    let isWaiting = false;
    return (...args) => {
        if (!isWaiting) {
            callback(...args);
            isWaiting = true;
            setTimeout(() => {
                isWaiting = false;
            }, delay);
        }
    };
}
//# sourceMappingURL=throttle.js.map
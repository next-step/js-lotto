/**
 * @param {string} message
 * @param {function=} ok
 */
async function alert(message, ok) {
    window.alert(message);
    if (!ok) {
        return Promise.resolve();
    }

    try {
        await ok();
    } catch (e) {
        return Promise.reject(e);
    }
    return Promise.resolve();
}

export default {
    alert,
};

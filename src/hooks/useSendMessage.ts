export function useSendMessage() {
    const sendMessage = async (type: string, cb?: () => void, payload?: string) => {
        await chrome.runtime.sendMessage({type, payload})
        cb?.()
    }

    return {sendMessage}
}
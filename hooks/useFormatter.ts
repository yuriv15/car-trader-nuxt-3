export function useFormatter() {
    function toTitleCase(text: string) {
        return text.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substring(1);
        });
    }

    return {
        toTitleCase,
    };
}

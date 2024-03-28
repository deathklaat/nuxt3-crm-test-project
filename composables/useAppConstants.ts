export function useAppConstants() {
    const config = useRuntimeConfig();
    return Object.fromEntries(Object.entries(config.public).map(([key, val]) => [key, `${val}`]));
}

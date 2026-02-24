export const $api = <T>(
    path: string,
    options: Parameters<typeof $fetch<T>>[1] = {}
) => {
    const config = useRuntimeConfig()
    const xsrfToken = useCookie('XSRF-TOKEN')

    return $fetch<T>(path, {
        baseURL: config.public.apiBase,
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            ...(xsrfToken.value ? {'X-XSRF-TOKEN': xsrfToken.value} : {}),
        },
        ...options,
    })
}

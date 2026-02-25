export const useApiData = <T>(
    url: string | Ref<string>,
    options: Parameters<typeof useFetch<T>>[1] = {}
) => {
    const config = useRuntimeConfig()
    const xsrfToken = useCookie('XSRF-TOKEN')
    const requestHeaders = useRequestHeaders(['cookie'])

    return useFetch<T>(url, {
        baseURL: config.public.apiBase,
        credentials: 'include',
        watch: false,
        server: false,
        headers: computed(() => ({
            Accept: 'application/json',
            ...requestHeaders,
            ...(xsrfToken.value ? {'X-XSRF-TOKEN': xsrfToken.value} : {}),
        })),
        onResponseError({response}) {
            if (response.status === 401) {
                navigateTo('/auth/login')
            }
        },
        ...options,
    })
}

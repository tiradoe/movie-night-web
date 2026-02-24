export const useAuth = () => {
    const config = useRuntimeConfig()
    const router = useRouter()

    const login = async (email: string, password: string) => {
        await $fetch('/sanctum/csrf-cookie', {
            baseURL: config.public.apiBase,
            credentials: 'include',
        })
        await $api('/api/login', {method: 'POST', body: {email, password}})
        await router.push('/')
    }

    const logout = async () => {
        await $api('/api/logout', {method: 'POST'})
        await router.push('/')
    }

    return {login, logout}
}

export const useAuth = () => {
    const config = useRuntimeConfig()

    const login = async (email: string, password: string) => {
        await $fetch('/sanctum/csrf-cookie', {
            baseURL: config.public.apiBase,
            credentials: 'include',
        })
        await $api('/api/login', {method: 'POST', body: {email, password}})
        await navigateTo('/')
    }

    const logout = async () => {
        await $api('/api/logout', {method: 'POST'})
        await navigateTo('/auth/login')
    }

    return {login, logout}
}

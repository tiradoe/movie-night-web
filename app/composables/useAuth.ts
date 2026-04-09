export const useAuth = () => {
    const config = useRuntimeConfig()

    const login = async (email: string, password: string) => {
        await $fetch('/sanctum/csrf-cookie', {
            baseURL: config.public.apiBase,
            credentials: 'include',
        })
        await $api('/api/login', {method: 'POST', body: {email, password}})
        await navigateTo('/lists')
    }

    const register = async (email: string, username: string) => {
        await $fetch('/sanctum/csrf-cookie', {
            baseURL: config.public.apiBase,
            credentials: 'include',
        })
        await $api('/api/register', {method: 'POST', body: {email, username}})
        await navigateTo('/auth/login')
    }

    const resetPassword = async (password: string, passwordConfirmation: string, token: string, email: string) => {
        await $fetch('/sanctum/csrf-cookie', {
            baseURL: config.public.apiBase,
            credentials: 'include',
        })
        await $api('/api/reset-password', {
            method: 'POST',
            body: {
                password,
                password_confirmation: passwordConfirmation,
                token,
                email
            },
            onResponseError: (context) => {
                if (context.response.status === 401) {
                    throw new Error('TOKEN_EXPIRED')
                }
            }
        })
        await navigateTo('/lists')
    }

    const xsrfToken = useCookie('XSRF-TOKEN')

    const logout = async () => {
        await $fetch('/api/logout', {
            baseURL: config.public.apiBase,
            method: 'POST',
            credentials: 'include',
            headers: {
                ...(xsrfToken.value ? {'X-XSRF-TOKEN': xsrfToken.value} : {}),
            },
        }).catch(() => {
            alert("Failed to logout. Please try again.")
        })

        useCookie('XSRF-TOKEN').value = ''
        navigateTo('/auth/login')
    }

    return {login, register, resetPassword, logout}
}

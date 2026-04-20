export default defineNuxtRouteMiddleware((to) => {
    const publicRoutes = [
        'auth-login',
        'auth-register',
        'auth-reset-password-token',
        'auth-forgot-password',
        'invitations-token-accept',
        'invitations-token-decline',
    ]
    if (publicRoutes.includes(String(to.name))) return

    const xsrfToken = useCookie('XSRF-TOKEN')
    if (!xsrfToken.value) {
        return navigateTo('/auth/login')
    }
})

export default defineNuxtRouteMiddleware((to) => {
    const publicRoutes = ['/auth/login']
    if (publicRoutes.includes(to.path)) return

    const xsrfToken = useCookie('XSRF-TOKEN')
    if (!xsrfToken.value) {
        return navigateTo('/auth/login')
    }
})

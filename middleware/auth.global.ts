export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = await useSupabaseUser()
    
    if(await user.value && to.meta.auth == false) {
        return navigateTo(to.redirectedFrom?.fullPath) || navigateTo(from.fullPath) || navigateTo('/home')
    }
})
  
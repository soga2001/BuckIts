export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = await useSupabaseUser()
    
    if(await user.value && to.meta.auth === false) {
        if(from.query.redirect) {
            return navigateTo({path: from.query.redirect as string, query: {}})
        }
        return navigateTo('/home')
    }
    else if (!await user.value && to.meta.auth === true) {
        return navigateTo({
            path: '/',
            query: {
              login: 'true',
              redirect: to.fullPath
            },
            replace: true
          })
    }
})
  
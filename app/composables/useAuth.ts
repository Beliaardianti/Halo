export const useAuth = () => {
  const { $supabase } = useNuxtApp()
  const user = useState<any>('auth-user', () => null)
  const isLoggedIn = computed(() => !!user.value)

  const checkAuth = async () => {
    const { data: { user: currentUser } } = await $supabase.auth.getUser()
    user.value = currentUser
  }

  const logout = async () => {
    await $supabase.auth.signOut()
    user.value = null
    navigateTo('/login')
  }

  return {
    user,
    isLoggedIn,
    checkAuth,
    logout
  }
}
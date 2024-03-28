interface IAuthStore {
	email: string
	name: string
	status: boolean
}

const initialValue: { user: IAuthStore } = {
	user: {
		email: '',
		name: '',
		status: false,
	},
}

export const useAuthStore = defineStore('auth', {
	state: () => initialValue,
	getters: {
		isAuth: state => state.user.status,
	},
	actions: {
		clear() {
			this.$patch(initialValue)
		},
		set(input: IAuthStore) {
			this.$patch({ user: input })
		},
	},
})

export const useIsLoadingStore = defineStore('isLoading', {
	state: () => ({
		isLoading: true,
	}),
	actions: {
		set(data: boolean) {
			this.$patch({ isLoading: data })
		},
	},
})

import type { ICard } from '~/composables/kanban/kanban.types'

const initialValue: { card: ICard | null; isOpen: boolean } = {
	card: null,
	isOpen: false,
}

export const useDealSlideStore = defineStore('deal-slide', {
	state: () => initialValue,
	actions: {
		clear() {
			this.$patch(initialValue)
		},
		set(card: ICard) {
			this.$patch({ card, isOpen: true })
		},
		toggle() {
			this.isOpen = !this.isOpen
		},
	},
})

<script lang="ts" setup>
import { useDealSlideStore } from '@/store/deal-slide.store';

const store = useDealSlideStore();

const isOpened = computed({
	get: () => store.isOpen,
	set: value => store.isOpen = value,
});

const cardSettings = {
    background: 'bg-[#351e50]',
    body: { base: 'flex-1' },
    ring: '',
    divide: 'divide-y divide-border',
};
</script>

<template>
	<div>
		<USlideover
            v-model="isOpened"
            :ui="{
                overlay: {
                    background: 'bg-black/40 dark:bg-black/40'
                }
            }"
        >
			<UCard
				class="flex flex-col flex-1 overflow-y-auto"
				:ui="cardSettings"
			>
				<template #header>
					<KanbanSlideoverTop />
				</template>

				<KanbanSlideoverComments />
			</UCard>
		</USlideover>
	</div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { useDealSlideStore } from '@/store/deal-slide.store'

const store = useDealSlideStore();
</script>

<template>
	<div class="border-border bg-black/20 rounded p-3">
		<div class="uppercase bold text-xl mb-4">About this deal</div>
		<KanbanSlideoverLabelText label-text="Deal subject">
			<h2>
				{{ store.card?.name }}
			</h2>
		</KanbanSlideoverLabelText>
		<KanbanSlideoverLabelText label-text="Price">
			{{ convertCurrency(store.card?.price || 0) }}
		</KanbanSlideoverLabelText>
		<KanbanSlideoverLabelText label-text="Status">
			<UiBadge variant="outline">
				{{ store.card?.status }}
			</UiBadge>
		</KanbanSlideoverLabelText>
		<KanbanSlideoverLabelText label-text="Client">
			{{ store.card?.companyName }}
		</KanbanSlideoverLabelText>
		<KanbanSlideoverLabelText label-text="Creation date">
			{{ dayjs(store.card?.$createdAt).format('DD MMMM YYYY') }}
		</KanbanSlideoverLabelText>
	</div>
</template>

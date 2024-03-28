<script lang="ts" setup>
import { generateColumnStyle } from '@/utils/generateGradient';
import { useKanbanQuery } from '@/composables/kanban/useKanbanQuery';
import { convertCurrency } from '@/utils/convertCurrency';
import { useMutation } from '@tanstack/vue-query';
import dayjs from 'dayjs';
import type { ICard, IColumn } from '@/composables/kanban/kanban.types';
import { useDealSlideStore } from '@/store/deal-slide.store';
import type { EnumStatus } from '@/types/deals.types';

const { COLLECTION_DEALS, DB_ID } = useAppConstants();

useSeoMeta({ title: 'Home | CRM System' });

const dragCardRef = ref<ICard | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);
const { data, isLoading, refetch } = useKanbanQuery();
const store = useDealSlideStore();

type MutationVariables = {
    docId: string
    status?: EnumStatus
}

const { mutate } = useMutation({
    mutationKey: ['move card'],
    mutationFn: ({ docId, status }: MutationVariables) => DB.updateDocument(DB_ID, COLLECTION_DEALS, docId, { status }),
    onSuccess: () => refetch(),
})

function handleDragStart(card: ICard, column: IColumn) {
    dragCardRef.value = card;
    sourceColumnRef.value = column;
}

function handleDragOver(event: DragEvent) {
    event.preventDefault()
}

function handleDrop(targetColumn: IColumn) {
    if (!dragCardRef.value || !sourceColumnRef.value) return;
    mutate({ docId: dragCardRef.value.id, status: targetColumn.id });
}
</script>

<template>
    <div class="p-10">
        <h1 class="font-bold text-2xl mb-10">CRM System</h1>
        <div v-if="isLoading">Loading...</div>
        <div v-else>
            <div class="grid grid-cols-5 gap-16">
                <div
                    v-for="(column, index) in data as IColumn[]"
                    :key="column.id"
                    class="min-h-screen"
                    @dragover="handleDragOver"
                    @drop="handleDrop(column)"
                >
                    <div
                        :style="generateColumnStyle(+index, data?.length)"
                        class="rounded bg-slate-700 py-1 px-5 mb-2 text-center"
                    >
                        {{ column.name }}
                    </div>
                    <div>
                        <KanbanCreateDeal :refetch="refetch" :status="column.id" />
                        <UiCard
                            v-for="card in column.items"
                            :key="card.id"
                            class="mb-5"
                            draggable="true"
                            @dragstart="handleDragStart(card, column)"
                        >
                            <UiCardHeader role="button" @click="store.set(card)">
                                <UiCardTitle>{{ card.name }}</UiCardTitle>
                                <UiCardDescription class="mt-2 block">
                                    {{ convertCurrency(card.price) }}
                                </UiCardDescription>
                            </UiCardHeader>
                            <UiCardContent class="text-xs">
                                <div>Company</div>
                                {{ card.companyName }}
                            </UiCardContent
                            >
                            <UiCardFooter>
                                {{ dayjs(card.$createdAt).format('DD MMMM YYYY') }}
                            </UiCardFooter>
                        </UiCard>
                    </div>
                </div>
            </div>
            <KanbanSlideover />
        </div>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import type { IDeal } from '@/types/deals.types';
import { useComments } from '@/composables/comments/useComments';
import { useCreateComment } from '@/composables/comments/useCreateComment';

const { data, refetch, isLoading } = useComments();
const { commentRef, writeComment } = useCreateComment({ refetch });

const card = computed(() => data as unknown as IDeal);
</script>

<template>
    <UiInput
        v-model="commentRef"
        placeholder="Leave a comment"
        @keyup.enter="writeComment"
        class="border-white"
    />

    <UiSkeleton v-if="isLoading" class="w-full h-[76px] rounded mt-5" />
    <div v-else-if="card">
        <div
            v-for="comment in card?.comments"
            :key="comment.$id"
            class="flex items-start mt-5"
        >
            <Icon class="mr-3 mt-1" name="radix-icons:chat-bubble" size="20" />
            <div class="border-border bg-black/20 rounded p-3 w-full">
                <div class="mb-2 text-sm">
                    Comment {{ dayjs(comment.$createdAt).format('HH:mm') }}
                </div>
                <p>{{ comment.text }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query';
import type { ICustomer } from '@/types/deals.types';

const { COLLECTION_CUSTOMERS, DB_ID } = useAppConstants();

useSeoMeta({ title: 'Customers | CRM System' });

const { data, isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: () => DB.listDocuments(DB_ID, COLLECTION_CUSTOMERS),
});

const customers = computed(() => data.value?.documents as unknown as ICustomer[]);

function getCustomerLink(customer: ICustomer) {
    return `/customers/edit/${customer.$id}`;
}
</script>

<template>
    <div class="p-10">
        <h1 class="font-bold text-2xl mb-10">Our clients</h1>
        <div v-if="isLoading">Loading...</div>
        <UiTable v-else>
            <UiTableHeader>
                <UiTableRow>
                    <UiTableHead class="w-[200px]">Logo</UiTableHead>
                    <UiTableHead class="w-[300px]">Name</UiTableHead>
                    <UiTableHead class="w-[200px]">Email</UiTableHead>
                    <UiTableHead>Ref</UiTableHead>
                </UiTableRow>
            </UiTableHeader>
            <UiTableBody>
                <UiTableRow v-for="customer in customers" :key="customer.$id">
                    <UiTableCell>
                        <NuxtLink :href="getCustomerLink(customer)">
                            <NuxtImg
                                :alt="customer.name"
                                :src="customer.avatar_url"
                                class="rounded-full"
                                height="50"
                                width="50"
                            />
                        </NuxtLink>
                    </UiTableCell>
                    <UiTableCell class="font-medium">
                        {{ customer.name }}
                    </UiTableCell>
                    <UiTableCell>{{ customer.email }}</UiTableCell>
                    <UiTableCell>{{ customer.from_source }}</UiTableCell>
                </UiTableRow>
            </UiTableBody>
        </UiTable>
    </div>
</template>

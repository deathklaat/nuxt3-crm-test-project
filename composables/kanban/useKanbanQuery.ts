import { useQuery } from '@tanstack/vue-query';
import type { IDeal } from '@/types/deals.types';
import { KANBAN_DATA } from '@/composables/kanban/kanban.data';
import type { IColumn } from '@/composables/kanban/kanban.types';

export function useKanbanQuery() {
    const { COLLECTION_DEALS, DB_ID } = useAppConstants();

    return useQuery({
        queryKey: ['deals'],
        queryFn: () => DB.listDocuments(DB_ID, COLLECTION_DEALS),
        select(data) {
            const newBoard: IColumn[] = structuredClone(KANBAN_DATA);
            const deals = data.documents as unknown as IDeal[];

            for (const deal of deals) {
                const column = newBoard.find(col => col.id === deal.status)
                column?.items.push({
                    $createdAt: deal.$createdAt,
                    id: deal.$id,
                    name: deal.name,
                    price: deal.price,
                    companyName: deal.customer.name,
                    status: column.name,
                });
            }

            return newBoard;
        },
    });
}

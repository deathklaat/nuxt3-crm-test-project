import { useQuery } from '@tanstack/vue-query';

export function useComments() {
    const { COLLECTION_DEALS, DB_ID } = useAppConstants();
	const store = useDealSlideStore();
	const cardId = store.card?.id || '';

	return useQuery({
		queryKey: ['deal', cardId],
		queryFn: () => DB.getDocument(DB_ID, COLLECTION_DEALS, cardId),
	});
}

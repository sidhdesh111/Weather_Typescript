import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Use_local_storage } from "./Use_local_storage";

interface SearchHistoryType {
  id: string;
  query: string;
  lat: number;
  lon: number;
  name: string;
  country: string;
  state?: string;
  searchedAt: number;
}

export function Use_SearchHistory() {
  const { storedValue, setStoredValue } = Use_local_storage<
    SearchHistoryType[]
  >("search-history", []);

  const queryClient = useQueryClient();

  const StorageQuery = useQuery({
    queryKey: ["search-history"],
    queryFn: () => storedValue,
    initialData: storedValue,
  });

  const AddStorage = useMutation({
    mutationFn: async (
      search: Omit<SearchHistoryType, "id" | "searchedAt">,
    ) => {
      const newSearch: SearchHistoryType = {
        ...search,
        id: `${search.lat}-${search.lon}=${Date.now()}`,
        searchedAt: Date.now(),
      };

      const FilterStoredData = storedValue.filter(
        (item) => !(item.lat === search.lat && item.lon === search.lon),
      );

      const newStoredValue = [newSearch, ...FilterStoredData].slice(0, 10);

      setStoredValue(newStoredValue);

      return newStoredValue;
    },

    onSuccess: (newStoredValue) => {
      queryClient.setQueryData(["search-history"], newStoredValue);
    },
  });

  const ClearStorage = useMutation({
    mutationFn: async () => {
      setStoredValue([]);
      return [];
    },

    onSuccess: () => {
      queryClient.setQueryData(["search-history"], []);
    },
  });

  return {
    history: StorageQuery.data ?? [],
    AddStorage,
    ClearStorage,
  };
}

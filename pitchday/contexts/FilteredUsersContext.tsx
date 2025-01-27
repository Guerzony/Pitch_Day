import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

type FilteredUsersContextPropsT = {
  filteredUsers: string[];
  setFilteredUsers: Dispatch<SetStateAction<string[]>>;
  favoritedUsers: any[];
  setFavoritedUsers: Dispatch<SetStateAction<any[]>>;
};

const FilteredUsersContext = createContext<FilteredUsersContextPropsT>(
  {} as FilteredUsersContextPropsT
);

export function FilteredUsersContextProvider({ children }: PropsWithChildren) {
  const [filteredUsers, setFilteredUsers] = useState<string[]>([]);
  const [favoritedUsers, setFavoritedUsers] = useState<any[]>([]);

  return (
    <FilteredUsersContext.Provider
      value={{
        filteredUsers,
        setFilteredUsers,
        favoritedUsers,
        setFavoritedUsers,
      }}
    >
      {children}
    </FilteredUsersContext.Provider>
  );
}

export function useFilteredUsersContext() {
  return useContext(FilteredUsersContext);
}

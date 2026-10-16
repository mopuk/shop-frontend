import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/src/shared/components/ui/combobox";

const sortingOptions = [
  { value: "newest", label: "Сначала новинки" },
  { value: "price_asc", label: "Цена: по возрастанию" },
  { value: "price_desc", label: "Цена: по убыванию" },
  { value: "name_asc", label: "Название: А-Я" },
  { value: "name_desc", label: "Название: Я-А" },
];

const limitOptions = [
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 50, label: "50" },
];

export default function CatalogHeader({
  dataLength,
  sortingOption,
  limitOption,
  handleOnSortingChange,
  handleOnLimitChange,
}: {
  dataLength: number;
  sortingOption: string;
  limitOption: number;
  handleOnSortingChange: (value: string) => void;
  handleOnLimitChange: (value: number) => void;
}) {
  return (
    <div className="flex justify-between items-center py-1">
      <h2 className="hidden md:block font-hanken font-bold text-xs text-neutral">
        Показано товаров: {dataLength}
      </h2>
      <div className="flex items-center gap-2">
        <span className="text-[12px] md:text-sm font-hanken text-neutral">
          Товаров на странице:{" "}
        </span>
        <Combobox
          items={limitOptions}
          itemToStringValue={(item) => item.label}
          value={
            limitOptions.find((option) => option.value === limitOption) ?? null
          }
          onValueChange={(item) => {
            if (item) handleOnLimitChange(item?.value);
          }}
        >
          <ComboboxInput
            placeholder="Кол-во"
            className="w-20 text-[11px] md:text-[12px] placeholder:text-[10px] font-hanken text-secondary"
          />
          <ComboboxContent>
            <ComboboxEmpty>Ничего не найдено.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem
                  key={item.value}
                  value={item}
                  className="text-[12px] md:text-sm"
                >
                  {item.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <span className="text-[12px] md:text-sm font-hanken text-neutral">
          Сортировка по{" "}
        </span>
        <Combobox
          items={sortingOptions}
          itemToStringValue={(item) => item.label}
          value={
            sortingOptions.find((option) => option.value === sortingOption) ??
            null
          }
          onValueChange={(item) => {
            if (item) handleOnSortingChange(item?.value);
          }}
        >
          <ComboboxInput
            placeholder="Выберите сортировку"
            className="font-hanken text-black w-fit "
          />
          <ComboboxContent className="text-[10px] md:text-sm ">
            <ComboboxEmpty>Ничего не найдено.</ComboboxEmpty>
            <ComboboxList className="text-[12px] md:text-sm">
              {(item) => (
                <ComboboxItem
                  key={item.value}
                  value={item}
                  className="text-[12px] md:text-sm"
                >
                  {item.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </div>
  );
}

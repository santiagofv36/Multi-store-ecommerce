'use client';

import React from 'react';
import { IStore } from '@packages/models';
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '..';
import { useStoreModal } from '@admin/hooks/use-store-modal';
import { useParams, useRouter } from 'next/navigation';
import { Check, ChevronsUpDown, PlusCircle, Store } from 'lucide-react';
import { cn } from '@admin/lib/utils';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: IStore[];
}

export function StoreSwitcher({ items = [], className }: StoreSwitcherProps) {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value?.toString() === params._id
  );

  const [open, setOpen] = React.useState<boolean>(false);

  const onStoreSelect = (store: { label: string; value: string }) => {
    setOpen(false);
    router.push(`/dashboard/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a Store"
          className={cn('w-[200px] justify-between', className)}
        >
          <Store className="mr-2 size-4" />
          <span className="truncate text-sm">{currentStore?.label}</span>
          <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search store..." />
          <CommandList>
            <CommandEmpty>No Store found.</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map((item) => (
                <CommandItem
                  key={item.value?.toString()}
                  onSelect={() =>
                    onStoreSelect(
                      item as unknown as { label: string; value: string }
                    )
                  }
                >
                  <Store className="mr-2 size-4" />
                  {item.label}
                  <Check
                    className={cn(
                      'ml-auto size-4',
                      currentStore?.value === item.value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.open();
                }}
                className="cursor-pointer"
              >
                <PlusCircle className="mr-2 size-5" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

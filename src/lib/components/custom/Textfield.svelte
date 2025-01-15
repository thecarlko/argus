<script lang="ts">
    import { Input } from "$lib/components/ui/input";
    import type { WithElementRef } from "bits-ui";
    import type { HTMLInputAttributes } from "svelte/elements";
    import { Label } from "$lib/components/ui/label";

    interface Props extends WithElementRef<HTMLInputAttributes> {
        label?: string;
        leadIcon?:  () => any;
        trailingIcon?:  () => any;
    }

    let {
		value = $bindable(),
        label,
        leadIcon,
        trailingIcon,
        ...restProps
	}: Props = $props();

    // const id = crypto.randomUUID().slice(0, 8).toLocaleLowerCase();

    const id = Math.random().toString(36).substring(2, 15);

</script>


<div class="flex flex-col gap-1">
    {#if label }
        <Label class="text-sm w-full pb-[0.1rem]" for={ id }>{ label }</Label>
    {/if}
    <label for={ id } class="border flex items-center gap-2 w-full rounded-xl py-1 px-3 bg-background">
        {#if leadIcon}
            <span class="w-6 h-6 p-[0.1rem]">{@render leadIcon()}</span>
        {/if}
        <Input id={ id } class="focus:border-none focus:ring-0 rounded-xl border-none h-9 px-0" bind:value {...restProps} />
        {#if trailingIcon}
            <span class="w-6 h-6 p-[0.1rem]">{@render trailingIcon()}</span>
        {/if}
    </label>
</div>
<script setup lang="ts">
defineProps<{
    title: string
    text: string
    dot?: 'cyan' | 'green' | 'yellow' | 'pink'
}>()

const dotClass = (d?: string) => {
    if (d === 'green') return 'bg-emerald-500'
    if (d === 'yellow') return 'bg-amber-400'
    if (d === 'pink') return 'bg-rose-500'
    return 'bg-cyan-500'
}
</script>

<template>
    <div class="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
        <div class="flex items-start gap-4">
        <div class="mt-1 h-3.5 w-3.5 shrink-0 rounded-full" :class="dotClass(dot)"></div>
        <div>
            <div class="text-base font-extrabold text-slate-900">{{ title }}</div>
            <p class="mt-2 text-sm font-semibold text-slate-600">{{ text }}</p>
        </div>
        </div>
    </div>
</template>
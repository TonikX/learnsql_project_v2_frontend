<script setup lang="ts">
type Variant = 'info' | 'success' | 'warning' | 'danger' | 'neutral'
type Size = 'sm' | 'md'

const props = withDefaults(defineProps<{
    variant?: Variant
    size?: Size
}>(), {
    variant: 'neutral',
    size: 'sm',
})

const classes = () => {
    const base = props.size === 'md' ? 'px-3 py-1 text-sm' : 'px-2.5 py-1 text-xs'
    const color =
        props.variant === 'info' ? 'bg-primary-50 text-primary-700' :
        props.variant === 'success' ? 'bg-emerald-50 text-emerald-700' :
        props.variant === 'warning' ? 'bg-amber-50 text-amber-700' :
        props.variant === 'danger' ? 'bg-rose-50 text-rose-700' :
        'bg-slate-100 text-slate-700'
    return `${base} ${color} inline-flex items-center rounded-full font-semibold`
}
</script>

<template>
    <span :class="classes()"><slot /></span>
</template>
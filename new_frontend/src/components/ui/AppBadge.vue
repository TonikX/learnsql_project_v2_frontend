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
        props.variant === 'info' ? 'bg-status-progress-bg text-status-progress-text' :
        props.variant === 'success' ? 'bg-status-success-bg text-status-success-text' :
        props.variant === 'warning' ? 'bg-panel text-app-text' :
        props.variant === 'danger' ? 'bg-card-muted text-danger' :
        'bg-panel text-app-muted'
    return `${base} ${color} inline-flex items-center rounded-full font-semibold`
}
</script>

<template>
    <span :class="classes()"><slot /></span>
</template>

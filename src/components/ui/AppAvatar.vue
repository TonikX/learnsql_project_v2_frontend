<script setup lang="ts">
const props = withDefaults(defineProps<{
    src?: string
    name?: string
    size?: 'sm' | 'md' | 'lg'
}>(), {
    size: 'md',
})

const sizeClass = () => props.size === 'sm' ? 'h-8 w-8' : props.size === 'lg' ? 'h-12 w-12' : 'h-10 w-10'

const initials = () => {
    const n = (props.name || '').trim()
    if (!n) return 'U'
    const parts = n.split(' ')
    return (parts[0]?.[0] || 'U') + (parts[1]?.[0] || '')
}
</script>

<template>
    <div :class="['rounded-full bg-primary-50 text-primary-700 flex items-center justify-center font-extrabold', sizeClass()]">
        <img v-if="src" :src="src" class="h-full w-full rounded-full object-cover" />
        <span v-else class="text-sm">{{ initials() }}</span>
    </div>
</template>
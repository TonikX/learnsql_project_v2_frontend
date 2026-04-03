<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(defineProps<{
    variant?: Variant
    size?: Size
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    loading?: boolean
    to?: string
    href?: string
}>(), {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    loading: false,
})

const base = 'inline-flex items-center justify-center gap-2 rounded-xl font-bold transition active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none'

const sizes = computed(() => {
    if (props.size === 'sm') return 'h-9 px-4 text-sm'
    if (props.size === 'lg') return 'h-12 px-6 text-base'
    return 'h-11 px-5 text-sm'
})

const variants = computed(() => {
    switch (props.variant) {
        case 'secondary':
            return 'bg-white text-slate-800 ring-2 ring-primary-100 hover:ring-primary-200'
        case 'ghost':
            return 'bg-transparent text-slate-800 hover:bg-slate-100'
        case 'danger':
            return 'bg-rose-500 text-white hover:bg-rose-600'
        default:
            return 'bg-primary-500 text-white hover:bg-primary-600'
    }
})
</script>

<template>
    <component
        :is="to ? RouterLink : href ? 'a' : 'button'"
        :to="to"
        :href="href"
        :type="to || href ? undefined : type"
        :class="[base, sizes, variants]"
        :disabled="disabled || loading"
    >
        <slot name="leftIcon" />
        <span>
        <slot />
        </span>
        <slot name="rightIcon" />

        <span v-if="loading" class="ml-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white"></span>
    </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
    firstname?: string
    lastname?: string
    username?: string
    size?: "sm" | "md" | "lg"
}>(), {
    size: "md"
})

const initials = computed(() => {
    if (props.firstname && props.lastname)
        return (props.firstname.slice(0, 1) + props.lastname.slice(0, 1)).toUpperCase()

    return props.username?.slice(0, 2).toUpperCase() ?? "UB"
})

const base = "flex shrink-0 items-center justify-center bg-primary-gradient leading-none"

const style = computed(() => {
    switch (props.size) {
    case "sm":
        return "h-6 w-6 rounded-md text-sm"
    case "md":
        return "h-10 w-10 rounded-lg text-base"
    case "lg":
        return "h-[80px] w-[80px] rounded-[16px] text-[28px] sm:h-[86px] sm:w-[86px] sm:rounded-[18px] sm:text-[32px]"
    }
})
</script>

<template>
<div :class="[base, style]">
    {{ initials }}
</div>
</template>
<script setup lang="ts">
import AppIcon from './AppIcon.vue';

const props = withDefaults(defineProps<{
    title: string
    subtitle?: string
    icon?: string
    align?: 'left' | 'center'
}>(), {
    align: 'left',
})

let titleStyle = "flex gap-4 text-2xl font-bold"
const secTitleStyle = "mt-3 text-base font-semibold text-slate-600"

if (props.align == "center") {
    titleStyle += "justify-center"
}
</script>

<template>
<div>
    <div :class="titleStyle">
        <AppIcon v-if="icon" :name="icon"></AppIcon> 
        {{ title }}
    </div>

    <p v-if="subtitle" :class="secTitleStyle">{{ subtitle }}</p>
</div>
</template>
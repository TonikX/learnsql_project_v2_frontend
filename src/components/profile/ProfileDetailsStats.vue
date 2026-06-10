<script setup lang="ts">
defineProps<{
    leftRows: Array<{ label: string; value: string }>
    rightRows: Array<{ label: string; value: string }>
}>()
</script>

<template>
    <section class="rounded-[10px] border border-app-border bg-profile-card-gradient p-5 text-app-text sm:p-7">
        <h2 class="text-[22px] leading-none sm:text-[28px]">
            <span class="text-profile-prompt">&gt;_</span>
            Статистика_обучения
        </h2>

        <div class="mt-6 overflow-hidden border-t border-app-border bg-transparent">
            <div class="grid md:grid-cols-2">
                <div class="md:border-r md:border-app-border">
                    <div
                        v-for="row in leftRows"
                        :key="row.label"
                        class="flex min-h-[52px] items-center justify-between gap-4 border-b border-app-border px-4 py-3"
                    >
                        <span class="text-[13px] text-app-text sm:text-[15px]">{{ row.label }}</span>
                        <span class="text-right text-[15px] sm:text-[17px]">{{ row.value }}</span>
                    </div>
                </div>
                <div>
                    <div
                        v-for="row in rightRows"
                        :key="row.label"
                        class="flex min-h-[52px] items-center justify-between gap-4 border-b border-app-border px-4 py-3"
                    >
                        <span class="text-[13px] text-app-text sm:text-[15px]">{{ row.label }}</span>
                        <span class="text-right text-[15px] sm:text-[17px]">{{ row.value }}</span>
                    </div>
                </div>
            </div>
        </div>

        <p class="mt-5 text-[13px] text-app-text sm:text-[15px]">
            SELECT * FROM personal_stats LIMIT 8;
        </p>
    </section>
</template>

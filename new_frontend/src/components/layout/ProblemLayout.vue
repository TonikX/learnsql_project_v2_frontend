<template>
<div class="flex flex-col-reverse md:flex-row items-start gap-8">
    <div class="w-full md:basis-3/4 flex flex-col gap-8">
        <slot name="content" />
    </div>

    <div class="w-full md:basis-1/4">
        <slot name="description" />
    </div>
</div>
</template>
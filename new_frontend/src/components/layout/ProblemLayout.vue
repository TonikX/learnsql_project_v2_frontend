<template>
<div class="flex items-start gap-8">
    <div class="basis-3/4 flex flex-col gap-8">
        <slot name="content"/>
    </div>
    <div class="basis-1/4">
        <slot name="description" />
    </div>
</div>
</template>
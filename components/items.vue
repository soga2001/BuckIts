<template>
    <div class="item w-full flex items-center justify-between p-4 cursor-pointer">
        <div class="flex items-center space-x-4">
            <slot v-if="$slots['icon-left']" name="icon-left"/>
            <div class="flex flex-col gap-1">
                <span v-if="$slots['title']" class="font-medium">
                    <slot name="title"/>
                </span>
                <span v-if="$slots['description']" class="text-tertiary text-sm">
                    <slot v-if="$slots['description']" class="text-tertiary text-sm" name="description"/>
                </span>
            </div>
        </div>
         <slot v-if="$slots['icon-right']" name="icon-right"/>
    </div>
</template>

<style lang="scss" scoped>
.item {
    &:hover {
        background: var(--hover-background-color);
    }
}
</style>
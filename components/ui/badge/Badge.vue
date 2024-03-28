<script lang="ts" setup>
import type { VariantProps } from 'class-variance-authority'
import { badgeVariants } from '.'
import { cn } from '@/utils'

interface BadgeVariantProps extends VariantProps<typeof badgeVariants> {
}

interface Props {
    variant?: BadgeVariantProps['variant']
}

defineProps<Props>()
</script>

<template>
    <div :class="cn(badgeVariants({ variant }), $attrs.class as string ?? '')">
        <slot />
    </div>
</template>

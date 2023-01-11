<template>
    <a :href="props.href"
        class="font-medium focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 focus:ring-offset-white dark:focus:ring-offset-black text-base px-4 py-2 relative text-white gradient-border-2 border-gradient-br-gradient-gray-900 hover:border-gradient-br-gradient-black before:absolute before:transition before:duration-200 before:rounded-lg before:opacity-0 hover:before:opacity-75 before:-inset-0.5 before:bg-gradient-to-r before:from-green-400 before:via-teal-400 before:to-teal-600 before:blur-md before:z-[-1] inline-flex items-center rounded-lg focus-visible:ring-2">
        <span class="text-left break-all line-clamp-1">
            Get started
        </span>
    </a>
</template>
<style scoped>
a {
    font-feature-settings: normal;
    position: relative;
    display: inline-flex;
    align-items: center;
    border-radius: .5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: .5rem;
    padding-top: .5rem;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 500;
    --tw-text-opacity: 1;
    color: rgb(255 255 255/var(--tw-text-opacity));
    background: linear-gradient(90deg, #18181b, #18181b),
        linear-gradient(to bottom right, #00dc82, #36e4da, #16a79e);
    background-clip: padding-box,
        border-box;
    background-origin: padding-box,
        border-box;
    border: 2px solid transparent;
}
</style>
<script setup lang="ts">
type ButtonEffect = 'glow' | 'jump' | 'smoke';
type Props = {
    href: string | "#";
    text: string
    variant: 'solid' | 'outline' | 'ghost' | 'link';
    effect?: ButtonEffect;
    size?: 'small' | 'medium' | 'large';
}
const props = defineProps({
    config: {
        type: Object,
        required: true,
    },
})
</script>
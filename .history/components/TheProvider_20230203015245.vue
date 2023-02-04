<script lang="ts" setup>
import { useMessage } from 'naive-ui'
const nuxtApp = useNuxtApp()

nuxtApp.provide('$message', useMessage())
window.$message = useMessage()
</script>

<template />

<script lang="ts" setup>
// Worley Noise
// Coding in the Cabana
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingInTheCabana/004-worley-noise.html
// https://youtu.be/4066MndcyCk
// big props to https://editor.p5js.org/codingtrain/sketches/QsiCWVczZ

// TODO: Needs optimization
// TODO: Make loop start from 0 again and not result in black at end

const points = []

function setup() {
    createCanvas(600, 600)
    pixelDensity(1)
    for (let i = 0; i < 8; i++)
        points[i] = createVector(random(width), random(height), 100)
}

function draw() {
    loadPixels()
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const distances = []
            for (let i = 0; i < points.length; i++) {
                const v = points[i]
                const z = frameCount
                const d = dist(x, y, z, v.x, v.y, v.z)
                distances[i] = d
            }

            // sort the distances
            const sorted = sort(distances)

            const r = map(sorted[0], 0, 255, 255, 0)
            const g = map(sorted[1], 0, 100, 255, 0)
            const b = map(sorted[2], 0, 255, 120, 0)
            const index = (x + y * width) * 4
            pixels[index + 0] = r
            pixels[index + 1] = g
            pixels[index + 2] = b
            pixels[index + 3] = 255
        }
    }
    updatePixels()
}
</script>

<template />

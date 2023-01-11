export const useAnimationManager = () => {
    const animations = ref([]);


    const add = (animation) => {
        animations.value.push(animation);
    }

    const remove = (animation) => {
        animations.value = animations.value.filter((a) => a !== animation);
    }

    const pause = () => {
        animations.value.forEach((animation) => animation.pause());
    }

    const resume = () => {
        animations.value.forEach((animation) => animation.resume());
    }
    
    const stop = () => {
        animations.value.forEach((animation) => animation.stop());  
    }




}
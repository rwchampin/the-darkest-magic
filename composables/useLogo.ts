let logo = false;
export const theLogo = () => {
    if (logo) {
        return logo;
    }
    onMounted(() => {
        logo = window.assets.logoAlt;
        debugger
    });
};
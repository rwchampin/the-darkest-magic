 
interface UIElement {
    node: HTMLDivElement | HTMLCanvasElement | undefined;
    element: string;
    name: string;
}

export const useUIManager = (nuxtApp:any) => {

    let UIElements: UIElement[] = [
        
        {
            node: undefined,
            name: "debugger",
            element: ".debugger",
        },
        
        {
            node: undefined,
            name: "mainCanvas",
            element: "canvas",
            children: [
                ".haburger",
                ".menu-float",
            ]
        },
        {
            node: undefined,
            name: "loader-canvas",
            element: ".loader-canvas",
        },
    ];
    

    const addUIElement = (element: UIElement, position: number) => {
        if (position) {
            if(nuxtApp.$appStore.debug.value === true) {
                nuxtApp.$messageApi.info(`UIElement ${element.name} added at position ${position}`);
            }
            UIElements.splice(position, 0, element);
            return;
        }
        UIElements.push(element);
    }

    const removeUIElement = (element: UIElement) => {
        UIElements = UIElements.filter((el) => el !== element);
    }

    const getUIElements = () => {
        return UIElements;
    }

    const observeDOMchanges = (element: HTMLElement) => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "childList") {
                    if (mutation.addedNodes.length) {
                        mutation.addedNodes.forEach((node) => {
                            if (node.nodeType === 1) {
                                // addUIElement(node);
                            }
                        });
                    }
                    if (mutation.removedNodes.length) {
                        mutation.removedNodes.forEach((node) => {
                            if (node.nodeType === 1) {
                                // removeUIElement(node);
                            }
                        });
                    }
                }
            });
        });
        observer.observe(element, {
            childList: true,
            subtree: true,
        });
    }


    const buildUI = (): void => {
        let documentStr:string = '';
        UIElements.forEach((UIElement, idx) => {
            let el = undefined;
            
            const { element, name } = UIElement;
            if(element === "canvas"){
                const canvas = document.createElement('canvas');
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                canvas.setAttribute('id', name);
                canvas.setAttribute('class', 'ui-canvas');
                canvas.style.zIndex =  (idx+1) * 100;

                const context = canvas.getContext('2d');
                if(context){
                    context.fillStyle = 'black';
                    context.fillRect(0, 0, canvas.width, canvas.height);
                }

                UIElement.node = canvas;
                documentStr += UIElement.node.outerHTML;
                return
            }else{
                const node = document.querySelector(element);
                if (node) {
                    node.setAttribute('id', name);
                    node.style.zIndex =  idx;
                    UIElement.node = node;
                }
                return;
            }
                
            // observeDOMchanges(UIElement.node);
        });

        document.body.innerHTML += documentStr;
        window.localStorage.setItem('UIElements', JSON.stringify(UIElements));
    };


    return {
        addUIElement,
        removeUIElement,
        getUIElements,
        observeDOMchanges,
        buildUI
    }

};
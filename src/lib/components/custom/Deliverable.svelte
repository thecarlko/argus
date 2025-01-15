<script lang="ts">
    export let image : string;
    export let active: boolean;
    export let title : string = "";

    // export let zindex: number = 0;
</script>

<style lang="scss">


    @use "$lib/styles/variables" as app;

    div.deliverable {

        position: absolute;
        top: 50%;
        left: 50%;
        width: calc(100% - 4rem);
        max-width: 32rem;

        aspect-ratio: 16/11;

        box-shadow: 0rem 0rem 1.5rem rgba(40, 42, 54, 0.08);

        @keyframes primary-in {
            0% {
                transform:  translateX(-200%) translateY(60%) rotateZ(180deg);
            }

            100% {
                transform: translateX(-53%) translateY(-50%) rotateZ(368deg);
            }

        }

        @keyframes primary-out {
            0% {
                transform: translateX(-54%) translateY(-50%) rotateZ(368deg);
            }

            50% {
                transform: translateX(-143%) translateY(20%) rotateZ(244deg);
            }

            100% {
                transform:  translateX(-200%) translateY(60%) rotateZ(180deg);
            }
        }

        @keyframes secondary-in {
            0% {
                transform:  translateX(-180%) translateY(60%) rotateZ(180deg);
            }

            100% {
                transform: translateX(-50%) translateY(-54%) rotateZ(350deg);
            }
        }   

        @keyframes secondary-out {
            0% {
                transform: translateX(-54%) translateY(-54%) rotateZ(350deg);
            }

            50% {
                transform: translateX(-143%) translateY(20%) rotateZ(244deg);
            }

            100% {
                transform:  translateX(-200%) translateY(60%) rotateZ(180deg);
            }
        }

        @keyframes tertiary-in {
            0% {
                transform:  translateX(-200%) translateY(60%) rotateZ(180deg);
            }

            100% {
                transform: translateX(-42%) translateY(-50%) rotateZ(374deg);
            }

        }

        @keyframes tertiary-out {
            0% {
                transform: translateX(-54%) translateY(-50%) rotateZ(368deg);
            }

            50% {
                transform: translateX(-143%) translateY(20%) rotateZ(244deg);
            }

            100% {
                transform:  translateX(-200%) translateY(60%) rotateZ(180deg);
            }
        }

        @keyframes quaternary-in {
            0% {
                transform:  translateX(-180%) translateY(60%) rotateZ(180deg);
            }

            100% {
                transform: translateX(-50%) translateY(-44%) rotateZ(364deg);
            }
        }   

        @keyframes quaternary-out {
            0% {
                transform: translateX(-54%) translateY(-54%) rotateZ(350deg);
            }

            50% {
                transform: translateX(-143%) translateY(20%) rotateZ(244deg);
            }

            100% {
                transform:  translateX(-200%) translateY(60%) rotateZ(180deg);
            }
        }
        

        // Design Card
        &:nth-child(1) {
            animation-name: primary-out;
            animation-timing-function: linear;
            animation-duration: 500ms;
            animation-fill-mode: forwards;

            z-index: 1;

            &.active {
                animation-name: primary-in;
                animation-timing-function: ease-in-out;
                animation-duration: 500ms;
                animation-fill-mode: forwards;
            }
        }


        // Development card
        &:nth-child(2) {
            animation-name: secondary-out;
            animation-timing-function: linear;
            animation-duration: 500ms;
            animation-fill-mode: forwards;

            z-index: 2;

            &.active {
                animation-name: secondary-in;
                animation-timing-function: ease-in-out;
                animation-duration: 500ms;
                animation-fill-mode: forwards;
            }
        }

        // Design Card
        &:nth-child(3) {
            animation-name: tertiary-out;
            animation-timing-function: linear;
            animation-duration: 500ms;
            animation-fill-mode: forwards;

            z-index: 3;

            &.active {
                animation-name: tertiary-in;
                animation-timing-function: ease-in-out;
                animation-duration: 500ms;
                animation-fill-mode: forwards;
            }
        }


        // Development card
        &:nth-child(4) {
            animation-name: quaternary-out;
            animation-timing-function: linear;
            animation-duration: 500ms;
            animation-fill-mode: forwards;

            z-index: 4;

            &.active {
                animation-name: quaternary-in;
                animation-timing-function: ease-in-out;
                animation-duration: 500ms;
                animation-fill-mode: forwards;
            }
        }

        border-radius: 1.5rem;
        overflow: hidden;


        > span.navbar {
            position: absolute;
            top: 0px;
            left: 0px;
            right: 0px;

            z-index: 1;

            display: grid;
            grid-template-columns: 2rem auto 2rem;

            background-color: hsl(218, 27%, 92%);
            padding: 0.5rem 0.8rem;

            > div {
                display: flex;
                align-items: center; 
                gap: 0.2rem; 
                height: 100%;
                
                > span {
                    opacity: 0%;

                    width: 0.4rem;
                    height: 0.4rem;
                    border-radius: 1rem;

                    background-color: hsl(210, 5%, 82%);

                    // &:nth-child(1) { background-color: #FF5F56; }
                    // &:nth-child(2) { background-color: #FEBC2E; }
                    // &:nth-child(3) { background-color: #27C840; }
                };
            }

            > p { width: 100%; font-size: 80%; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        }

        > img { width: 100%; height: 100%; object-fit: cover; }
    }
</style>

<div class={ `bg-background deliverable${ active ? " active" : "" }` }>
    
    {#if title != ""}
    <span class="navbar">
        <div><span></span><span></span><span></span></div>
        <p>{ title }</p>
    </span>
    {/if}

    <img src={ image } alt="">
</div>
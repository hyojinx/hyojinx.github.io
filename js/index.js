Vue.config.devtools = true;

Vue.component('card', {
    template: `
                <div class="card-wrap"
                    @mousemove="handleMouseMove"
                    @mouseenter="handleMouseEnter"
                    @mouseleave="handleMouseLeave"
                    @click="handleClick"
                    ref="card">
                    <div class="card"
                        :style="cardStyle">
                        <div class="card-bg" :style="[cardBgTransform, cardBgImage]"></div>
                        <div class="card-info">
                            <slot name="header"></slot>
                            <slot name="content"></slot>
                        </div>
                    </div>
                </div>`,
    mounted() {
        this.width = this.$refs.card.offsetWidth;
        this.height = this.$refs.card.offsetHeight;
    },
    props: ['dataImage', 'dataId'],
    data() {
        return {
            width: 0,
            height: 0,
            mouseX: 0,
            mouseY: 0,
            mouseLeaveDelay: null
        };
    },
    computed: {
        mousePX() {
            return this.mouseX / this.width;
        },
        mousePY() {
            return this.mouseY / this.height;
        },
        cardBgImage() {
            return {
                backgroundImage: `url(${this.dataImage})`
            };
        }
    },
    methods: {
        handleMouseMove(e) {
            this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width / 2;
            this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height / 2;
        },
        handleMouseEnter() {
            clearTimeout(this.mouseLeaveDelay);
        },
        handleMouseLeave() {
            this.mouseLeaveDelay = setTimeout(() => {
                this.mouseX = 0;
                this.mouseY = 0;
            }, 1000);
        },
        handleClick() {
            window.location.href = `project.html#${this.dataId}`;
        }
    }
});

const app = new Vue({
    el: '#app'
});
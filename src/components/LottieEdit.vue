<template>
<div style = "background-color: white; width: 100%; height: 100vh; display: flex; flex-flow: row; justify-content:center">
    <!-- i am aware that i hacked together veutify to make it work for my quick UI -->
    <v-card
        class="pa-5"
        color="gray"
        flat
        v-draggable
    >
        <v-card class="d-inline-block elevation-12">
            <v-navigation-drawer
                floating
                permanent
                stateless
                dark
                value="true"
            >
                <v-toolbar flat>
                    <v-list>
                        <v-list-tile>
                        <v-list-tile-title class="title">
                            Drag me!!
                        </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-toolbar>
                <v-list>
                    <v-list-tile
                        v-for="(color,index) in colors" 
                        :key="index" 
                        v-if="color"
                    >
                        <v-list-tile-action>
                            {{ color['color'] }}
                        </v-list-tile-action>
                        <v-list-tile-content>   
                            <v-btn
                                @click="toggleColorPicker(color)"
                                color="white"
                                class="white--text"
                                :style="`background:${color['color']} !important`"
                                >
                            </v-btn>
                            
                        </v-list-tile-content>
                        <v-list-tile-action>
                            rgb({{ color['r'] }}, {{ color['g']}}, {{ color['b']}})
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
        </v-card>
    </v-card>
    <div ref="lottie" class = "lottie-container"> </div>
    <v-dialog
      v-model="showingColorPicker"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Color Picker
        </v-card-title>

        <chrome-picker v-model="currentColor" />

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="selectedColor()"
          >
            Accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-fab-transition>
        <v-btn
            v-show="!fabHidden"
            color="dark"
            fab
            dark
            medium
            absolute
            bottom
            right
            style="bottom:5%"
            @click="this.window.open('https://paypal.me/cgberlin')"
        >
            <v-icon>favorite</v-icon>
        </v-btn>
    </v-fab-transition>
    <v-fab-transition>
        <v-btn
            v-show="!fabHidden"
            color="dark"
            fab
            dark
            medium
            absolute
            bottom
            right
            style="bottom:13%"
            @click="this.window.open('https://github.com/cgberlin/jsonanimationeditor.com')"
        >
        <!-- change to repo -->
            <img 
                :src="require('../assets/github-logo.png')" 
                style="height:50%;width:50%"
            />
        </v-btn>
    </v-fab-transition>
    <v-fab-transition>
        <v-btn
            v-show="!fabHidden"
            color="dark"
            fab
            dark
            medium
            absolute
            bottom
            right
            style="bottom:21%"
            @click="this.window.open('mailto:cody@codyberlin.com')"
        >
            <v-icon>mail</v-icon>
        </v-btn>
    </v-fab-transition>
    <v-btn
      color="black"
      class="white--text"
      id="downloadButton"
    >
      Download
      <v-icon right dark>cloud_download</v-icon>
    </v-btn>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Chrome } from 'vue-color'
import { Draggable } from 'draggable-vue-directive'

export default {
    created() {
        this.jsonAnimation = this.$store.state.jsonAnimation
        this.$colors(this.jsonAnimation, this.colorResponse)
        setTimeout(() => {
            this.fabHidden = false
        }, 1000)
    },
    mounted() {
        this.anim = lottie.loadAnimation({
            autoplay: true,
            loop: true,
            animationData: this.jsonAnimation,
            renderer: 'svg',
            container: this.$refs['lottie']
        })
    },
    components: {
       'chrome-picker': Chrome
    },
    directives: {
        Draggable
    },
    data() {
        return {
            jsonAnimation: {},
            colors: [],
            currentColor: '#3d3d3d',
            showingColorPicker: false,
            fabHidden: true,
            currentColorDetails: {},
            anim: {}
        }
    },
    computed: {
        
    },
    methods: {
        colorResponse(color) {
            this.colors[color['i']] = color
        },
        toggleColorPicker(color) {
            this.currentColorDetails = color
            this.currentColor = color['color']
            this.showingColorPicker = true
        },
        selectedColor() {
            let { currentColorDetails, currentColor, showingColorPicker, jsonAnimation } = this
            let details = currentColorDetails
            jsonAnimation.layers[details.i].shapes[details.j].it[details.k].c.k = [
                    this.$toVector(currentColor['rgba']['r']),
                    this.$toVector(currentColor['rgba']['g']),
                    this.$toVector(currentColor['rgba']['b']),
                    currentColor['rgba']['a']
            ]
            this.$store.dispatch('updateJsonAnimation', jsonAnimation)
            this.$colors(jsonAnimation, this.colorResponse)
            this.showingColorPicker = false
            this.anim.destroy()
            this.anim = lottie.loadAnimation({
                autoplay: true,
                loop: true,
                animationData: this.jsonAnimation,
                renderer: 'svg',
                container: this.$refs['lottie']
            })
        }
    },
}

</script>

<style scoped>
.vc-chrome {
    width: 100% !important;
    box-shadow: none !important;
}
.v-navigation-drawer {
   background: black;
}
.pa-5 {
    z-index: 100;
    position: absolute;
    left:0;
    background-color: transparent;
}
.lottie-container {
    width: 100%;
    height: 100%;   
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    position: absolute;
}
#downloadButton {
    align-self: flex-end;
    margin: 0;
    margin-bottom:2%;
}
.white--text, .v-list {
    font-family: 'Open Sans', sans-serif;
}
</style>

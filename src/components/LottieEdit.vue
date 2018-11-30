<template>
<div style = "background-color: white; width: 100%; height: 100vh; display: flex; flex-flow: row">
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
                                @click="toggleColorPicker(color['color'])"
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
    <div class = "lottie-container">
        <lottie :options="lottieOptions" :height="400" :width="400"/>
    </div>
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
            @click="showingColorPicker = false"
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
    <v-fab-transition>
        <v-btn
            v-show="!fabHidden"
            color="dark"
            fab
            dark
            medium
            absolute
            top
            left
            style="top: 1.5%"
            @click="goBack()"
        >
            <v-icon>arrow_back</v-icon>
        </v-btn>
    </v-fab-transition>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Lottie from 'vue-lottie'
import { Chrome } from 'vue-color'
import { Draggable } from 'draggable-vue-directive'

export default {
    created() {
        this.jsonAnimation = this.$store.state.jsonAnimation
        this.lottieOptions.animationData = this.$store.state.jsonAnimation
        this.$colors(this.lottieOptions.animationData, this.colorResponse)
        setTimeout(() => {
            this.fabHidden = false
        }, 1000)
    },
    components: {
       'lottie': Lottie,
       'chrome-picker': Chrome
    },
    directives: {
        Draggable
    },
    data() {
        return {
            jsonAnimation: {},
            lottieOptions: {
                animationData: {}
            },
            colors: [],
            currentColor: '#3d3d3d',
            showingColorPicker: false,
            fabHidden: true
        }
    },
    computed: {
        
    },
    methods: {
        colorResponse(color) {
            console.log(color)
            this.colors[color['i']] = color
            console.log(this.colors)
        },
        toggleColorPicker(color) {
            this.currentColor = color
            this.showingColorPicker = true
        },
        goBack() {
            console.log('going back')
            window.location.href='/'
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
    align-self: flex-end;
    z-index: 100;
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
</style>

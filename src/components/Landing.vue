<template>
<div style = "background-color: white; width: 100vw; height: 100vh;display:flex;align-items:center;justify-content:flex-start;flex-direction:column">
    <h1 id="title">
        JSON Animation Editor
    </h1>
    <h3 id="description">
        Drag, drop, or click the box below to upload your file
    </h3>
    <v-card id="dropzoneContainer">
        <vue-dropzone 
            ref="jsonDropzone" 
            id="dropzone" 
            :options="dropzoneOptions"
            @vdropzone-file-added="fileAdded" 
            @vdropzone-success="uploadSuccess"
        ></vue-dropzone>
      </v-card>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import axios from 'axios'

export default {
    created() {
       
    },
    components: {
        vueDropzone: vue2Dropzone
    },
    data() {
        return {
            isToggled: false,
            sideBar: null,
            dropzoneOptions: {
                thumbnailWidth: 150,
                maxFiles: 1,
                url:"https://httpbin.org/post"
            }
        }
    },
    computed: {
        
    },
    methods: {
        fileAdded(file) {
            
        },
        uploadSuccess(file) {
           
            const reader = new FileReader()
           
            reader.onload = e => this.parseFile(file, file.name, e);

            reader.readAsText(file);
        },
        parseFile(source, fileName, e) {
            console.log(source)
            console.log(`filename:${fileName}`)
            console.log(JSON.parse(e.target.result))
            if (!e.target || !e.target.result || e.target.result == '') {
                alert('Whoops')
                return
            }
            let jsonAnimation = JSON.parse(e.target.result)
            this.$store.dispatch('updateJsonAnimation', jsonAnimation)
            this.$router.push('lottie-edit')
            console.log(this.$store.state.jsonAnimation)
        }
        
    },
}

</script>

<style scoped>
#dropzone {
    height: 100%;
    width: 100%;
}
#dropzoneContainer {
    width: 40%;
    height: 40%;
    margin-top: 10%;
}
#title {
    font-family: 'Lobster', cursive;
    margin-top:10%;
    font-size: 3.5rem;
}
#description {
    font-family: 'Open Sans', sans-serif;
    margin-top: 2%;
}
</style>

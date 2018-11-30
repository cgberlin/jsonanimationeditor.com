<template>
<div style = "background-color: LightGrau; width: 100%; height: 100%">
    <vue-dropzone 
        ref="jsonDropzone" 
        id="dropzone" 
        :options="dropzoneOptions"
         @vdropzone-file-added="fileAdded" 
         @vdropzone-success="uploadSuccess"
    ></vue-dropzone>
    
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

</style>

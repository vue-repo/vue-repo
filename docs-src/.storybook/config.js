import { configure } from '@storybook/vue'
require('../src/main.scss')

import Vue from 'vue'

import ContentPage from '@components/content-page.vue'
Vue.component('content-page', ContentPage);

import "prismjs";
import "prismjs/themes/prism.css";
import VuePrismEditor from "vue-prism-editor";
import "vue-prism-editor/dist/VuePrismEditor.css"; // import the styles
Vue.component("prism", VuePrismEditor);

import VCode from '@components/v-code'
Vue.component("v-code", VCode);

function loadStories() {
    require('../src/stories/introduction')
    require('../src/stories/store-module')
    require('../src/stories/crud-repo')
}

configure(loadStories, module)

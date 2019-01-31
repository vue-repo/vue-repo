import Vue from 'vue';

import { storiesOf } from '@storybook/vue';

import WhatIsVueStore from '@pages/intro/what-is-vue-repo';
import Installation from '@pages/intro/installation';

storiesOf('Introduction', module)
    .add('Quick start', () => WhatIsVueStore)
    .add('Installation', () => Installation)

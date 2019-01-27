import Vue from 'vue';

import { storiesOf } from '@storybook/vue';

import WhatIsVueStore from '@pages/intro/what-is-vue-repo';
import QuickStart from '@pages/intro/quick-start';

storiesOf('Introduction', module)
    .add('What is vue-store?', () => WhatIsVueStore)
    .add('Quick start', () => QuickStart)

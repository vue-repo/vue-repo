import Vue from 'vue';

import { storiesOf } from '@storybook/vue';

import WhatIsVueStore from '@pages/store-module/what-is-store-module';
import Options from '@pages/store-module/options';
import Middlewares from '@pages/store-module/middlewares';

storiesOf('Store module', module)
    .add('What is store-module?', () => WhatIsVueStore)
    .add('Options', () => Options)
    .add('Middlewares', () => Middlewares)

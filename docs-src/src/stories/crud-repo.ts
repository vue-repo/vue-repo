import Vue from 'vue';

import { storiesOf } from '@storybook/vue';

import WhatIsCrudRepo from '@pages/crud-repo/what-is-crud-repo';
import Implementing from '@pages/crud-repo/implementing';
import ListState from '@pages/crud-repo/list-state';
import ActiveState from '@pages/crud-repo/active-state';
import LocalState from '@pages/crud-repo/local-state';
import RemoteState from '@pages/crud-repo/remote-state';
import Synchronizing from '@pages/crud-repo/synchronizing';
import SmartMethods from '@pages/crud-repo/smart-methods';

storiesOf('CRUD repository', module)
    .add('What is crud repository?', () => WhatIsCrudRepo)
    .add('Implementing', () => Implementing)
    .add('List state', () => ListState)
    .add('Active state', () => ActiveState)
    .add('Local state', () => LocalState)
    .add('Remote state', () => RemoteState)
    .add('Synchronizing of local and remote states', () => Synchronizing)
    .add('Smart methods', () => SmartMethods)

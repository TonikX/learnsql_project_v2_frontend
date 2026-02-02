import React from 'react';
import {Provider} from "react-redux";

import Routers from './routes';

export default ({ store }) => (
    <Provider store={store}>
      <Routers />
    </Provider>
);

// Copyright 2022 @paritytech/contracts-ui authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { Buffer } from 'buffer';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';
import App from 'ui/components/App';
import './styles/main.css';
import '@polkadot/api-augment';
import {
  AddContract,
  Contract,
  Homepage,
  Instantiate,
  SelectCodeHash,
  Settings,
  NotFound,
} from 'ui/pages';

globalThis.Buffer = Buffer;

const root = document.getElementById('app-root');

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Homepage />} />
        <Route path="add-contract" element={<AddContract />} />
        <Route path="hash-lookup" element={<SelectCodeHash />} />
        <Route path="/instantiate" element={<Instantiate />}>
          <Route path=":codeHash" />
        </Route>
        <Route path="/contract/:address/" element={<Contract />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </HashRouter>,
  root
);

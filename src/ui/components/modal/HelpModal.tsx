// Copyright 2021 @paritytech/contracts-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/outline';
import { BookOpenIcon } from '@heroicons/react/solid';
import { GithubLogo, StackExchangeLogo, ElementLogo } from './Logos';
import { ModalBase as Modal } from './ModalBase';
import type { ModalProps } from './ModalBase';

export const HelpModal = ({ isOpen, setIsOpen }: Omit<ModalProps, 'title'>) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Help">
      <ul className="text-gray-300 text-sm">
        <li className="flex w-full justify-between items-center border-b border-gray-800">
          <div className="flex py-4">
            <div className="w-5 mr-2" style={{ position: 'relative', top: 2 }}>
              <BookOpenIcon className="h-4 w-4 " aria-hidden="true" />
            </div>
            <a
              href="https://paritytech.github.io/ink-docs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h5>ink! Docs</h5>
              <span className="text-gray-400">
                Read more about the ink! smart contract language.
              </span>
            </a>
          </div>
          <ChevronRightIcon className="h-4 w-4 text-gray-400" />
        </li>
        <li className="flex w-full justify-between items-center border-b border-gray-800">
          <div className="flex py-4">
            <div className="w-5 mr-2" style={{ position: 'relative', top: 2 }}>
              <StackExchangeLogo />
            </div>
            <a
              href="https://substrate.stackexchange.com/questions/tagged/smart-contract?sort=Newest"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h5>Stack Exchange</h5>
              <span className="text-gray-400">Browse through common questions. </span>
            </a>
          </div>
          <ChevronRightIcon className="h-4 w-4 text-gray-400" />
        </li>
        <li className="flex w-full justify-between items-center border-b border-gray-800">
          <div className="flex py-4">
            <div className="w-5 mr-2" style={{ position: 'relative', top: 2 }}>
              <ElementLogo />
            </div>
            <a
              href="https://matrix.to/#/#ink:matrix.parity.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h5>Element Channel</h5>
              <span className="text-gray-400">Ask questions and help others. </span>
            </a>
          </div>
          <ChevronRightIcon className="h-4 w-4 text-gray-400" />
        </li>
        <li className="flex w-full justify-between items-center">
          <div className="flex py-4">
            <div className="w-5 mr-2 relative" style={{ position: 'relative', top: 2 }}>
              <GithubLogo />
            </div>
            <a
              href="https://github.com/paritytech/contracts-ui"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h5>Github Repo</h5>
              <span className="text-gray-400">Let us know if there is an issue. </span>
            </a>
          </div>
          <ChevronRightIcon className="h-4 w-4 text-gray-400" />
        </li>
      </ul>
    </Modal>
  );
};

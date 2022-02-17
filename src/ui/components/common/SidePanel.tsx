// Copyright 2021 @paritytech/contracts-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  header: React.ReactNode;
  emptyView?: React.ReactNode;
}

export const SidePanel = ({ children, header, emptyView = '' }: Props) => {
  return (
    <div className="mb-8 border rounded-md border-gray-200 dark:border-gray-700">
      <div className="text-sm rounded-t-md border-b text-gray-300 border-gray-200 dark:border-gray-700 bg-elevation-1 p-4">
        {header}
      </div>
      <div>
        {children}
        {(!children || (children as unknown[]).length === 0) && (
          <p className="p-4 text-gray-400 text-xs">{emptyView || ''}</p>
        )}
      </div>
    </div>
  );
};

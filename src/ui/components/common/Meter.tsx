// Copyright 2021 @paritytech/contracts-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { classes } from 'ui/util';

interface Props {
  percentage: number;
  label: React.ReactNode;
  accessory?: React.ReactNode;
  withAccessory?: boolean;
}

export function Meter({ accessory, label, percentage, withAccessory }: Props) {
  return (
    <div className="relative pt-2">
      <div className="text-gray-500 text-xs pb-2">
        {label}
        {withAccessory && <div className="float-right">{accessory}</div>}
      </div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
        <div
          style={{ width: `${percentage}%` }}
          className={classes(
            'shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center',
            percentage <= 100 ? 'bg-green-400' : 'bg-red-400'
          )}
        ></div>
      </div>
    </div>
  );
}

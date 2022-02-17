// Copyright 2021 @paritytech/contracts-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Big from 'big.js';
import React, { useMemo } from 'react';
import { isNumber } from '@polkadot/util';
import { Meter, Switch } from '../common';
import { InputBalance } from './InputBalance';
import { getValidation } from './FormField';
import type { SimpleSpread } from 'types';
import { classes } from 'ui/util';
import type { UseStorageDepositLimit } from 'ui/hooks/useStorageDepositLimit';

type Props = SimpleSpread<
  React.HTMLAttributes<HTMLDivElement>,
  UseStorageDepositLimit & {
    isActive?: boolean;
    toggleIsActive: () => void;
  }
>;

export function InputStorageDepositLimit({
  className,
  isActive = false,
  maximum,
  onChange,
  toggleIsActive,
  value,
  ...props
}: Props) {
  const percentage = useMemo((): number | null => {
    if (!maximum) {
      return null;
    }
    return 100 * new Big(value.toString()).div(new Big(maximum.toString())).toNumber();
  }, [maximum, value]);

  return (
    <div className={classes(className)} {...props}>
      <div className="flex items-center">
        <InputBalance
          className="flex-1"
          value={value}
          id="storageDepositLimit"
          isDisabled={!isActive}
          onChange={onChange}
          placeholder={isActive ? '1000' : 'None'}
          {...getValidation(props)}
        />
        <div className="flex justify-center items-center w-18">
          <Switch value={isActive} onChange={toggleIsActive} />
        </div>
      </div>
      {isActive && (
        <Meter
          label={isNumber(percentage) ? `${percentage.toFixed(2)}% of free balance` : null}
          percentage={isNumber(percentage) ? percentage : 100}
        />
      )}
    </div>
  );
}

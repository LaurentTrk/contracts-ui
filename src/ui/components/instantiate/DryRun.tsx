// Copyright 2022 @paritytech/contracts-ui authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import React from 'react';
import { formatBalance, formatNumber } from '@polkadot/util';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/outline';
import { SidePanel } from '../common/SidePanel';
import { Account } from '../account/Account';
import { useApi, useInstantiate } from 'ui/contexts';
// import { fromSats } from 'api';
// import { fromSats } from 'api';

export function DryRun() {
  const { api } = useApi();
  const { dryRunResult } = useInstantiate();

  return (
    <SidePanel className="instantiate-outcome" header="Predicted Outcome">
      <div className="body">
        <div className="row">
          <div>Gas Required:</div>
          <div>{dryRunResult?.gasRequired && <>{formatNumber(dryRunResult.gasRequired)}</>}</div>
        </div>
        <div className="row">
          <div>Gas Consumed:</div>
          <div>{dryRunResult?.gasConsumed && <>{formatNumber(dryRunResult.gasConsumed)}</>}</div>
        </div>
        <div className="row">
          <div>Storage Deposit:</div>
          <div>
            {dryRunResult?.storageDeposit &&
              (() => {
                if (dryRunResult.storageDeposit.isCharge) {
                  if (dryRunResult.storageDeposit.asCharge.eqn(0)) {
                    return 'None';
                  }

                  return formatBalance(dryRunResult.storageDeposit.asCharge, { decimals: 12 });
                }

                return 'None';
              })()}
          </div>
        </div>
        <div className="row h-8">
          <div>Contract Address:</div>
          <div>
            {dryRunResult?.result.isOk ? (
              <Account size={26} value={dryRunResult?.result.asOk.accountId.toString()} />
            ) : (
              'None'
            )}
          </div>
        </div>
        <div>
          {dryRunResult?.result.isOk && (
            <div className="validation success font-bold">
              <CheckCircleIcon className="mr-3" />
              The instantiation will be successful.
            </div>
          )}
          {dryRunResult?.result.isErr && dryRunResult?.result.asErr.isModule && (
            <>
              <div className="validation error text-mono font-bold">
                <ExclamationCircleIcon className="mr-3" />
                {api.registry.findMetaError(dryRunResult?.result.asErr.asModule).name}
              </div>
              {dryRunResult.debugMessage.length > 0 && (
                <div className="validation error block text-mono break-words pl-4 mt-1">
                  {dryRunResult.debugMessage.toString()}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </SidePanel>
  );
}

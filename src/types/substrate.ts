// Copyright 2021 @paritytech/substrate-contracts-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Blueprint as BlueprintBase, Contract as ContractBase } from '@polkadot/api-contract/base';

// types & interfaces
export type {
  AnyJson,
  CallFunction,
  Codec,
  Registry,
  RegistryError,
  TypeDef,
} from '@polkadot/types/types';
export type { DispatchError, EventRecord, Weight } from '@polkadot/types/interfaces';
export type { KeyringPair } from '@polkadot/keyring/types';
export type {
  AbiConstructor,
  AbiMessage,
  AbiParam,
  BlueprintOptions,
  ContractOptions,
} from '@polkadot/api-contract/types';
export type { ContractQuery, ContractTx } from '@polkadot/api-contract/base/types';
export type { SubmittableExtrinsic, VoidFn } from '@polkadot/api/types';

// classes
export { Bytes, Raw } from '@polkadot/types';
export { Keyring } from '@polkadot/ui-keyring';
export { Abi, ContractPromise, BlueprintPromise } from '@polkadot/api-contract';
export { BlueprintSubmittableResult, CodeSubmittableResult } from '@polkadot/api-contract/base';
export { ApiPromise, SubmittableResult } from '@polkadot/api';

export type Blueprint = BlueprintBase<'promise'>;
export type Contract = ContractBase<'promise'>;

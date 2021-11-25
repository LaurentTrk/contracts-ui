// Copyright 2021 @paritytech/substrate-contracts-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useState } from 'react';
import { useApi } from 'ui/contexts/ApiContext';
import { AbiParam, ApiPromise, Keyring, SetState } from 'types';
import { getInitValue } from 'ui/util';

type ArgValues = Record<string, unknown>;

function fromArgs(api: ApiPromise, keyring: Keyring, args: AbiParam[]): ArgValues {
  const result: ArgValues = {};

  args.forEach(({ name, type }) => {
    result[name] = getInitValue(api.registry, keyring, type);
  });

  return result;
}

export function useArgValues(
  args: AbiParam[]
): [ArgValues, SetState<ArgValues>, SetState<AbiParam[]>] {
  const { api, keyring } = useApi();
  const [params, setParams] = useState(args);
  const [value, setValue] = useState<ArgValues>(fromArgs(api, keyring, args));

  useEffect((): void => {
    setValue(fromArgs(api, keyring, params));
  }, [params, api, keyring]);

  return [value, setValue, setParams];
}

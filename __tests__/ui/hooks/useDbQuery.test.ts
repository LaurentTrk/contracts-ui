// Copyright 2021 @paritytech/substrate-contracts-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { act, RenderResult } from '@testing-library/react-hooks';
import { jest } from '@jest/globals';
import type { OrFalsy, OrNull, DbQuery } from 'types';
import { useDbQuery } from 'ui/hooks/useDbQuery';
import { customRenderHook, timeout } from 'test-utils';

interface ReturnType {
  foo: string;
}

let canReturnValid = true;

async function wrappedFn(argument: number): Promise<OrNull<ReturnType>> {
  await timeout();

  if (argument > 2) {
    return null;
  }

  if (argument === 2) {
    throw new Error('error');
  }

  if (argument === 1) {
    return { foo: 'baz' };
  }

  return canReturnValid ? { foo: 'bar' } : null;
}

function validate(value: OrFalsy<ReturnType>): boolean {
  return value?.foo === 'baz';
}

function mockQuery(argument: number): () => Promise<OrNull<ReturnType>> {
  return () => wrappedFn(argument);
}

const consoleError = console.error;

function extractResult(
  result: RenderResult<DbQuery<ReturnType>>
): Partial<Omit<DbQuery<ReturnType>, 'refresh' | 'updated'>> {
  return {
    data: result.current.data,
    isLoading: result.current.isLoading,
    isValid: result.current.isValid,
  };
}

function isUpdatedAccurate(result: RenderResult<DbQuery<ReturnType>>, gt = 0, lt = Date.now()) {
  return result.current.updated > gt && result.current.updated <= lt;
}

beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = consoleError;
});

test('should initialize correctly', () => {
  const [{ result }] = customRenderHook(() => useDbQuery(mockQuery(0)), {}, { isDbReady: true });

  expect(extractResult(result)).toStrictEqual({ data: null, isLoading: true, isValid: true });

  expect(typeof result.current.refresh).toBe('function');
});

test('should fetch data after initial mount', async () => {
  const [{ rerender, result, waitForValueToChange }] = customRenderHook(
    () => useDbQuery(mockQuery(0)),
    {},
    { isDbReady: true }
  );

  // isMounted = true
  rerender();

  await waitForValueToChange(() => result.current.data);

  expect(extractResult(result)).toStrictEqual({
    data: { foo: 'bar' },
    isLoading: false,
    isValid: true,
  });
  expect(isUpdatedAccurate(result)).toBe(true);
});

test('should handle query errors', async () => {
  const [{ result, rerender, waitForNextUpdate }] = customRenderHook(
    () => useDbQuery(mockQuery(2)),
    {},
    { isDbReady: true }
  );

  rerender();

  await waitForNextUpdate();

  expect(extractResult(result)).toStrictEqual({ data: null, isLoading: false, isValid: false });
  expect(isUpdatedAccurate(result)).toBe(true);
});

test('should refresh automatically when query is changed', async () => {
  let query = mockQuery(0);

  const [{ result, rerender, waitForValueToChange }] = customRenderHook(
    () => useDbQuery(query),
    {},
    { isDbReady: true }
  );

  rerender();

  await waitForValueToChange(() => result.current.data);

  expect(extractResult(result)).toStrictEqual({
    data: { foo: 'bar' },
    isLoading: false,
    isValid: true,
  });
  expect(isUpdatedAccurate(result)).toBe(true);

  const lastUpdate = result.current.updated;

  query = mockQuery(1);

  rerender();

  await waitForValueToChange(() => result.current.data);

  expect(extractResult(result)).toStrictEqual({
    data: { foo: 'baz' },
    isLoading: false,
    isValid: true,
  });
  expect(isUpdatedAccurate(result, lastUpdate)).toBe(true);
});

test('should provide working manual refresh callback', async () => {
  canReturnValid = false;

  const [{ result, rerender, waitForNextUpdate, waitForValueToChange }] = customRenderHook(
    () => useDbQuery(mockQuery(0)),
    {},
    { isDbReady: true }
  );

  rerender();

  await waitForNextUpdate();

  expect(extractResult(result)).toStrictEqual({ data: null, isLoading: false, isValid: false });
  expect(isUpdatedAccurate(result)).toBe(true);

  const lastUpdate = result.current.updated;

  canReturnValid = true;

  act(() => {
    result.current.refresh();
  });

  expect(result.current.isLoading).toBe(true);
  expect(result.current.isValid).toBe(true);

  await waitForValueToChange(() => result.current.data);

  expect(extractResult(result)).toStrictEqual({
    data: { foo: 'bar' },
    isLoading: false,
    isValid: true,
  });
  expect(isUpdatedAccurate(result, lastUpdate)).toBe(true);
});

test('accepts a custom validate function', async () => {
  const [{ result, rerender, waitForNextUpdate }] = customRenderHook(
    () => useDbQuery(mockQuery(0), validate),
    {},
    { isDbReady: true }
  );

  rerender();

  await waitForNextUpdate();

  expect(extractResult(result)).toStrictEqual({
    data: { foo: 'bar' },
    isLoading: false,
    isValid: false,
  });
});
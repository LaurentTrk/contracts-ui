// Copyright 2021 @paritytech/substrate-contracts-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Button, Buttons } from '../common/Button';
import { Form, useMetadataField, CodeHashField, ContractNameField } from '../form';
import { Loader } from '../common/Loader';
import { useNonEmptyString } from 'ui/hooks/useNonEmptyString';
import { useInstantiate } from 'ui/contexts';

export function Step1() {
  const { codeHash: codeHashUrlParam } = useParams<{ codeHash: string }>();

  const { stepForward, setData, data, currentStep } = useInstantiate();

  const { value: name, onChange: setName, ...nameValidation } = useNonEmptyString();

  const { metadata, isLoadingCodeBundle, isUsingStoredMetadata, isErrorMetadata, MetadataField } =
    useMetadataField();

  useEffect((): void => {
    if (metadata?.info.contract.name && !name) {
      setName(metadata?.info.contract.name.toString());
    }
  }, [metadata, name, setName]);

  function submitStep1() {
    setData &&
      setData({
        ...data,
        metadata: metadata,
        name,
        codeHash: codeHashUrlParam || undefined,
      });

    stepForward && stepForward();
  }

  if (currentStep !== 1) return null;

  return (
    <Loader isLoading={isLoadingCodeBundle}>
      <Form>
        <ContractNameField value={name} onChange={setName} {...nameValidation} />
        {codeHashUrlParam && (
          <CodeHashField
            codeHash={codeHashUrlParam}
            name={
              isUsingStoredMetadata
                ? metadata?.info?.contract.name.toString() || 'Contract'
                : 'Unidentified Code'
            }
          />
        )}
        {(!codeHashUrlParam || !isUsingStoredMetadata) && <MetadataField />}
      </Form>
      <Buttons>
        <Button
          isDisabled={!metadata || !nameValidation.isValid || isErrorMetadata}
          onClick={submitStep1}
          variant="primary"
        >
          Next
        </Button>
      </Buttons>
    </Loader>
  );
}

// Copyright 2021 @paritytech/contracts-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, Buttons } from '../common/Button';
import {
  Form,
  useAccountSelect,
  useMetadataField,
  CodeHashField,
  ContractNameField,
} from '../form';
import { Loader } from '../common/Loader';
import { useNonEmptyString } from 'ui/hooks/useNonEmptyString';
import { useInstantiate } from 'ui/contexts';

export function Step1() {
  const { t } = useTranslation();
  const { codeHash: codeHashUrlParam } = useParams<{ codeHash: string }>();

  const { stepForward, setData, data, currentStep } = useInstantiate();

  const { accountId, AccountSelectField } = useAccountSelect();
  const { value: name, onChange: setName, ...nameValidation } = useNonEmptyString();

  const { metadata, isLoadingCodeBundle, isUsingStoredMetadata, isErrorMetadata, MetadataField } =
    useMetadataField();

  useEffect((): void => {
    if (metadata && !name) {
      setName(metadata.info.contract.name.toString());
    }
  }, [metadata, name, setName]);

  function submitStep1() {
    setData &&
      setData({
        ...data,
        accountId,
        metadata,
        name,
        codeHash: codeHashUrlParam,
      });

    stepForward && stepForward();
  }

  if (currentStep !== 1) return null;

  return (
    <Loader isLoading={isLoadingCodeBundle}>
      <Form>
        <AccountSelectField />
        <ContractNameField value={name} onChange={setName} {...nameValidation} />
        {codeHashUrlParam && (
          <CodeHashField
            codeHash={codeHashUrlParam}
            name={
              isUsingStoredMetadata
                ? metadata?.info?.contract.name.toString() || t('contract', 'Contract')
                : t('unidentifiedCode', 'Unidentified Code')
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
          {t('next', 'Next')}
        </Button>
      </Buttons>
    </Loader>
  );
}

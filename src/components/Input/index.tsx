import React, { useState, useCallback, forwardRef, Ref, useRef } from 'react';

import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { Label, Container, Content, ErrorMsg } from './styles';

type InputProps = {
  icon?: React.ComponentType<IconBaseProps>;
  error?: string;
  label?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => Promise<void | boolean>;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => Promise<void | boolean>;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void | boolean>;
  inputRef?: Ref<unknown>;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name = '',
      icon: Icon = undefined,
      error = '',
      label = '',
      type = 'text',
      placeholder = '',
      defaultValue = '',
      disabled = false,
      onFocus,
      onBlur,
      onChange,
    }: InputProps,
    inputRef
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const internalRef = useRef<HTMLInputElement | null>();

    const handleInputFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        if (onFocus) {
          onFocus(e);
        }
        setIsFocused(true);
      },
      [onFocus]
    );

    const handleInputBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        if (onBlur) {
          onBlur(e);
        }
        setIsFocused(false);
      },
      [onBlur]
    );

    const isFilled = useCallback(() => {
      return internalRef && !!internalRef?.current?.value;
    }, []);

    return (
      <Container className="ctn-input">
        {label && (
          <Label
            htmlFor={`'ipt-'${name}`}
            isFocused={isFocused}
            isFilled={isFilled()}
            isDisabled={disabled}
          >
            {label}
          </Label>
        )}
        <Content
          id={`'ipt-c-'${name}`}
          isErrored={!!error}
          isFilled={isFilled()}
          isFocused={isFocused}
          isDisabled={disabled}
        >
          {Icon && <Icon size={20} />}
          <input
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChange={onChange}
            disabled={disabled}
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            min="0"
            defaultValue={defaultValue}
            ref={(ref) => {
              internalRef.current = ref;
              if (inputRef instanceof Function) {
                inputRef(ref);
              }
            }}
            onInput={() => {
              console.log('oninput');
            }}
          />

          {error && (
            <ErrorMsg title={error}>
              <FiAlertCircle color="#c53030" size={20} />
            </ErrorMsg>
          )}
        </Content>
      </Container>
    );
  }
);

Input.displayName = 'Input';

Input.defaultProps = {
  placeholder: '',
  type: '',
  name: '',
  label: '',
  icon: undefined,
  error: '',
  defaultValue: '',
  disabled: false,
  onFocus: undefined,
  onBlur: undefined,
  onChange: undefined,
  inputRef: undefined,
};

export default Input;

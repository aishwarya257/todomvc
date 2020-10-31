import {mergeValues} from 'components/EditingField/EditingField.Utils';
import taskConstants from 'constants/task';
import {render, screen, RenderResult} from '@testing-library/react';
import {ITodo, SlicedStateProps, Keys} from '../../../interfaces';
import userEvent from '@testing-library/user-event';
import React from 'react';
import TodoItem from '../TodoItem';
import {TodosConstants} from 'hooks/useTodos/useTodos.types';

interface EditModeReturnProps extends RenderResult {
    textboxes: Array<HTMLElement>;
    item: ITodo;
    oldItem: ITodo;
}

export const getHeading = (title: string, badges: string[]): string =>
    title + (title.length ? ' ' : '') + mergeValues(badges, taskConstants.displayDelimiter.badges);

export const setup = (
    setTodos: jest.Mock = jest.fn(() => {
        return {};
    })
) => {
    const item = {
        id: '1',
        title: 'Watch movies',
        completed: false,
        badges: ['netflix', 'amazon']
    };
    const utils = render(<TodoItem todo={item} setTodos={setTodos} key="1" />);
    return {
        ...utils,
        item,
        setTodos
    };
};

export const openEditMode = (...args) => {
    const data = setup(...args);
    const element = screen.getByText(data.item.title);
    userEvent.click(element);
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    userEvent.dblClick(element);

    return {...data, textboxes: screen.queryAllByRole('textbox')};
};

export const modifyTextInEditMode = ({
    newData = {title: 'Watch IPL', badges: ['Cricket', 'Sport']},
    setTodos = undefined,
    props = {clearText: false}
} = {}): EditModeReturnProps => {
    const {textboxes, item, ...otherProps} = openEditMode(setTodos);
    const formedText: SlicedStateProps = {title: '', badges: []};
    const clearText = props.clearText;
    textboxes.forEach((box) => {
        const name = (box as HTMLInputElement).name;
        const value = newData[name];
        const currentValue = item[name];
        const editDelimiter = taskConstants.editDelimiter[name];
        const isString = typeof value === 'string';
        const newValueToType = isString
            ? value
            : (clearText ? '' : editDelimiter) + newData[name].join(editDelimiter);
        if (props.clearText) {
            userEvent.clear(box);
        }
        userEvent.type(box, newValueToType);
        const concatenatedValue = isString
            ? (clearText ? '' : currentValue) + value
            : [...(clearText ? [] : currentValue), ...value];
        formedText[name] = concatenatedValue;

        expect((box as HTMLInputElement).value).toBe(
            isString ? concatenatedValue : concatenatedValue.join(editDelimiter)
        );
    });
    expect(screen.getByText(getHeading(formedText.title, formedText.badges))).toBeInTheDocument();

    return {
        textboxes,
        oldItem: {
            ...item
        },
        item: {
            ...item,
            ...formedText
        },
        ...otherProps
    };
};

export const doesExistInDom = (value: string): void =>
    expect(screen.queryByText(value)).toBeInTheDocument();


export const checkTextCommit = (item: ITodo): void => {
    Object.keys(item).forEach((key) => {
        const value = item[key];
        const editableFields = taskConstants.editableFields;
        if (editableFields.includes(key as Keys)) {
            if (typeof value === 'string') {
                doesExistInDom(value);
            } else if (value instanceof Array) {
                value.forEach((subValue) => doesExistInDom(subValue));
            }
        }
    });
};

export const getArray = (elements: HTMLElement[]): Array<HTMLElement> => Array.from(elements);

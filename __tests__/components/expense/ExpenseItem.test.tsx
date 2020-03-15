import TestRenderer from 'react-test-renderer';
import React from 'react';

import {createRandomExpense, createRandomVariableCategory} from '../../models';
import {chance} from '../../chance';
import ExpenseItem from '../../../src/components/expense/ExpenseItem';
import {SmallText} from '../../../src/components/generic/Text';
import CardView from '../../../src/components/generic/CardView';
import {Route} from '../../../src/enums/Route';
import * as hooks from '../../../src/utils/hooks';

jest.mock('@react-navigation/native');
jest.mock('../../../src/utils/hooks');

describe('ExpenseItem', () => {
    const {useBudgetNavigation} = hooks as jest.Mocked<typeof hooks>;

    let root,
        expectedVariableCategory,
        expectedNavigation,
        expectedProps;

    const render = (): void => {
        root = TestRenderer.create(
            <ExpenseItem {...expectedProps} />
        ).root;
    };

    beforeEach(() => {
        expectedVariableCategory = createRandomVariableCategory();
        expectedProps = {
            categoryName: chance.string(),
            expense: createRandomExpense({variableCategoryId: expectedVariableCategory.variableCategoryId})
        };
        expectedNavigation = {
            navigate: jest.fn()
        };

        useBudgetNavigation.mockReturnValue(expectedNavigation);

        render();
    });

    it('should render the category name and expense name', () => {
        root.findByProps({children: expectedProps.categoryName});
        root.findByProps({children: expectedProps.expense.name});
    });

    it('should call navigation.navigate onPress', () => {
        root.findByType(CardView).props.onPress();

        expect(expectedNavigation.navigate).toHaveBeenCalledTimes(1);
        expect(expectedNavigation.navigate).toHaveBeenCalledWith({
            name: Route.EXPENSE,
            params: {
                expenseId: expectedProps.expense.expenseId
            }
        });
    });

    it('should **not** render the expense name if there is not one', () => {
        expectedProps.expense.name = null;
        render();

        expect(root.findAllByType(SmallText)).toEqual([]);
    });
});

import React from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import {useQuery} from '@apollo/react-hooks';

import {IScreenFC} from '../types/global';
import {Route} from '../enums/Route';
import {getEarlyReturn} from '../services/error-and-loading-service';
import {getUserId} from '../services/auth-service';
import {getVariableCategoryQuery} from '../graphql/queries';
import EditVariableCategoryForm from '../components/budget/EditVariableCategoryForm';
import {GetVariableCategory, GetVariableCategoryVariables} from '../../autogen/GetVariableCategory';
import ExpenseItem from '../components/budget/ExpenseItem';
import {TitleText} from '../components/generic/Text';

export interface IVariableCategoryProps {
    variableCategoryId: string
}

const VariableCategory: IScreenFC<Route.VARIABLE_CATEGORY> = ({route: {params: {variableCategoryId}}}) => {
    const queryResult = useQuery<GetVariableCategory, GetVariableCategoryVariables>(getVariableCategoryQuery, {
        variables: {
            userId: getUserId(),
            variableCategoryId
        }
    });

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const {variableCategory} = queryResult.data;

    return (
        <SafeAreaView style={{alignItems: 'center'}}>
            <FlatList
                ListHeaderComponent={
                    <View style={{alignItems: 'center'}}>
                        <EditVariableCategoryForm variableCategory={variableCategory} />
                        <TitleText style={{marginTop: 16}}>
                            {'Expenses'}
                        </TitleText>
                    </View>
                }
                data={variableCategory.expenses}
                keyExtractor={(item): string => item.expenseId}
                renderItem={({item}): JSX.Element =>
                    <ExpenseItem
                        categoryName={variableCategory.name}
                        expense={item}
                    />
                }
            />
        </SafeAreaView>
    );
};

export default VariableCategory;

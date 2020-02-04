import React, {FC, useState} from 'react';
import {View} from 'react-native';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

import DefaultText from '../generic/DefaultText';
import {textStyles} from '../../styles/text-styles';
import Button from '../generic/Button';
import {screenWrapper} from '../../styles/shared-styles';
import {Route} from '../../enums/routes';

const now = moment().startOf('day').toISOString();
const fourWeeks = moment().startOf('day').add(4, 'w').toISOString();
const formats = {
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    sameDay: '[Today]',
    sameElse: 'ddd, MMM DD'
};

const NoActiveTimePeriod: FC = () => {
    const [beginDate, setBeginDate] = useState<Date>(new Date(now));
    const [endDate, setEndDate] = useState<Date>(new Date(fourWeeks));
    const navigation = useNavigation();

    return (
        <View style={screenWrapper}>
            <DefaultText style={textStyles.large}>{'Select Time Period'}</DefaultText>
            <DefaultText style={{marginTop: 16}}>{'Begin Date'}</DefaultText>
            <Button
                onPress={(): void => {
                    navigation.navigate({
                        name: Route.DATE_PICKER,
                        params: {
                            date: beginDate,
                            setDate: setBeginDate,
                            title: 'Begin Date'
                        }
                    });
                }}
                text={moment(beginDate).calendar(undefined, formats)}
            />
            <DefaultText style={{marginTop: 16}}>{'End Date'}</DefaultText>
            <Button
                onPress={(): void => {
                    navigation.navigate({
                        name: Route.DATE_PICKER,
                        params: {
                            date: endDate,
                            setDate: setEndDate,
                            title: 'End Date'
                        }
                    });
                }}
                text={moment(endDate).calendar(undefined, formats)}
            />
            <DefaultText style={[textStyles.medium, {marginVertical: 32}]}>
                {`${moment(endDate).diff(moment(beginDate), 'days')} days`}
            </DefaultText>
            <Button
                onPress={(): void => {}}
                text={'Create'}
            />
        </View>
    );
};

export default NoActiveTimePeriod;

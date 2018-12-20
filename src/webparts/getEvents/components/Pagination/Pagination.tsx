import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { getTheme, FontWeights, mergeStyleSets, ColorClassNames } from 'office-ui-fabric-react/lib/Styling';
import styles from './Pagination.module.scss';

export interface IPaginationProps{
    paginationOptions : IChoiceGroupOption[];
    paginationOnChange: (ev: React.FormEvent<HTMLInputElement>, option: any) => void;
}

const pagination = (props : IPaginationProps) => {
    return (
        <div className={styles.Pagination}>
            <ChoiceGroup
                className={styles.Choices}
                defaultSelectedKey={"0"}
                onChange={props.paginationOnChange}
                options={props.paginationOptions}
            />
        </div>
    );
};

export default pagination;
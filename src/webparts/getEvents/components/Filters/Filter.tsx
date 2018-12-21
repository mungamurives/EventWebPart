import * as React from 'react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import styles from './Filter.module.scss';

export interface IFilterProps{
    onFilterDropDownChange: (item: IDropdownOption) => void;
}

const filter = (props : IFilterProps) => {
    return (
        <div className={styles.Filter}>
            <div className={styles.LabelText}>
                Show Events :
            </div>
            <div className={styles.DropDownContainer}>
                <Dropdown
                    defaultSelectedKey={"A"}
                    options={
                        [
                            {
                                key: 'A', text: 'This Week' 
                            },
                            {
                                key: 'B', text: 'This Month' 
                            }
                        ]
                    }
                    onChanged={props.onFilterDropDownChange}
                />
            </div>
        </div>
    );
};

export default filter;

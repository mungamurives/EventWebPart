import * as React from 'react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import styles from './Filter.module.scss';

const filter = (props) => {
    return (
        <div className={styles.Filter}>
            <div className={styles.LabelText}>
                Show Events :
            </div>
            <div>
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
                />
            </div>
        </div>
    );
};

export default filter;

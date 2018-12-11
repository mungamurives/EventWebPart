import * as React from 'react';
import styles from './Event.module.scss';
import { DocumentCard } from 'office-ui-fabric-react/lib/DocumentCard';

export interface IEvents {
    Title: string;
    EventDate: string;
    EndDate: string;
    Location: string;
    Category: string;
    fAllDayEvent: boolean;
}
const events = (props: IEvents) => {
    return (
        <DocumentCard className={styles.Events}>
            <div className={styles.MainCard}>
                <div className={styles.SectionDate}>Date Will Go Here</div>
                <div className={styles.SectionDetails}>
                    <div>
                        <div>{props.Category}</div>
                        <div>{props.Title}</div>
                    </div>
                    <div>
                        <div>{props.EventDate}</div>
                        <div>{props.Location}</div>
                    </div>
                </div>
            </div>
        </DocumentCard>
    );
};
export default events;
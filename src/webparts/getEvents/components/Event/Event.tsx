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
    const startDate = new Date(props.EventDate).toUTCString();
    const endDate = new Date(props.EventDate).toUTCString();//Wed, 05 Dec 2018 00:00:00 GMT
    const startMonth = startDate.split(" ")[2];
    const startDay = startDate.split(" ")[1];

    const endMonth = endDate.split(" ")[2];
    const endDay = endDate.split(" ")[1];
    const dayDif: number = parseInt(endDay, 10) - parseInt(startDay, 10);
    return (
        <DocumentCard className={styles.Events}>
            <div className={styles.MainCard}>
                <div className={styles.DateBoxContainer}>
                    <div className={styles.SingleDayBox}>
                        <div className={styles.SingleMonth}>{startMonth}</div>
                        <div className={styles.SingleDay}>{startDay}</div>

                    </div>
                </div>

                <div className={styles.SectionDetails}>
                    <div>
                        <div className={styles.CategoryDateLocation}>
                            <div className={styles.CategoryLocation}>{props.Category}</div>

                        </div>
                        <div className={styles.Title}>{props.Title}</div>
                    </div>
                    <div>
                        <div className={styles.CategoryDateLocation}>
                            <div className={styles.Date}>{startDate}</div>
                        </div>
                        <div className={styles.CategoryDateLocation}>
                            <div className={styles.CategoryLocation}>{props.Location}</div>
                        </div>
                    </div>
                </div>
            </div>
        </DocumentCard>
    );
};
export default events;
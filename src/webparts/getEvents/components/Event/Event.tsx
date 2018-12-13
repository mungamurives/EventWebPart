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
    monthArray: string[];
    key: any;
    documentCardClicked: () => void;
}
const events = (props: IEvents) => {
    const tempStartDate = new Date(props.EventDate);
    const tempEndDate = new Date(props.EndDate);//Wed, 05 Dec 2018 00:00:00 GMT
    let dateIsDiff: boolean = false;
    if (new Date(Date.UTC(tempStartDate.getFullYear(), tempStartDate.getMonth(), tempStartDate.getDate(), 0, 0, 0, 0)).toUTCString() !== new Date(Date.UTC(tempEndDate.getFullYear(), tempEndDate.getMonth(), tempEndDate.getDate(), 0, 0, 0, 0)).toUTCString()) {
        dateIsDiff = true;
    }

    const startDay = tempStartDate.toString().split(" ")[1];

    return (
        <DocumentCard className={styles.Events} onClick={props.documentCardClicked}>
            <div className={styles.MainCard}>
                <div className={styles.DateBoxContainer}>
                    {

                        !dateIsDiff ?

                            <div className={styles.SingleDayBox}>
                                <div className={styles.SingleMonth}>{props.monthArray[tempStartDate.getUTCMonth()]}</div>
                                <div className={styles.SingleDay}>{tempStartDate.getUTCDate()}</div>
                            </div>
                            :
                            <div className={styles.MultipleDayBox}>
                                <div className={styles.MultipleMonthDay}>{props.monthArray[tempStartDate.getUTCMonth()]} {tempStartDate.getUTCDate()}</div>
                                <hr className={styles.Seperator} />
                                <div className={styles.MultipleMonthDay}>{props.monthArray[tempEndDate.getUTCMonth()]} {tempEndDate.getUTCDate()}</div>
                            </div>
                    }
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
                            <div className={styles.Date}></div>
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
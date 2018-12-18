import * as React from 'react';
import styling from './Event.module.scss';
import { DocumentCard } from 'office-ui-fabric-react/lib/DocumentCard';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { getTheme, FontWeights, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { ActionButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';

export interface IEventsProps {
    Title: string;
    EventDate: string;
    EndDate: string;
    Location: string;
    Category: string;
    fAllDayEvent: boolean;
    monthArray: string[];
    key: any;
    ID: number;
    eventUrl: string;
    Description: string;
}

export interface IEventState {
    isCallOutVisible: boolean;
}


const theme = getTheme();
const styles = mergeStyleSets({
    buttonArea: {
        verticalAlign: 'top',
        display: 'inline-block',
        textAlign: 'center'
    },
    callout: {
        minWidth: 250
    },
    container: {
        height: 220,
        width: 250,
        margin: '5px'
    },
    title: {
        height: '35%',
        width: '100%',
        display: 'flex'
    },
    dateBox: {
        margin: '5px 5px',
        height: '70px',
        width: '70px',
        border: '1px solid #ccc',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
    },
    dateBoxMonth: [
        theme.fonts.large,
        {
            backgroundColor: theme.palette.themePrimary,
            color: theme.palette.themeLighterAlt,
            height: '50%',
            width: '100%',
            fontWeight: 600,
            boxSizing: "border-box",
            lineHeight: 33,
            textTransform: "uppercase"
        }
    ],
    dateBoxDate: [
        theme.fonts.large,
        {
            height: '50%',
            width: '100%',
            fontWeight: '600',
            lineHeight: '33px',
            boxSizing: "border-box",
        }
    ],
    eventTitle: {
        height: '94%',
        width: '66%',
        margin: '5px 0px 0px 0px',
        display: "flex",
        flexDirection: 'column',
        boxSizing: 'border-box'
    },
    eventInnerTitle: [
        theme.fonts.large,
        {
            height: "50%",
            width: "100%",
            lineHeight: "33px",
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            paddingLeft: 6,
            whiteSpace: 'nowrap'
        }
    ],
    actions: {
        position: 'relative',
        marginTop: 20,
        width: '100%',
        whiteSpace: 'nowrap'
    },
    link: [
        theme.fonts.medium,
        {
            color: theme.palette.neutralPrimary
        }
    ]
});

export default class Events extends React.Component<IEventsProps, IEventState>{
    private _menuButtonElement = React.createRef<HTMLDivElement>();
    private itemID: string = this.props.eventUrl + '&ItemId=' + this.props.ID;
    /**
     *
     */
    constructor(props: IEventsProps) {
        super(props);
        this.state = {
            isCallOutVisible: false
        };

    }


    protected documentCardClickedHandler = (id: any) => {
        this.setState({
            isCallOutVisible: true
        });
    }

    protected _onCalloutDismiss = () => {
        this.setState({
            isCallOutVisible: false
        });
    }

    public render(): React.ReactElement<IEventsProps> {
        const { EndDate, EventDate, monthArray, Category, Title, Location, Description } = this.props;     

        const tempStartDate = new Date(EventDate);
        
        const tempEndDate = new Date(EndDate);//Wed, 05 Dec 2018 00:00:00 GMT
        let dateIsDiff: boolean = false;
        if (new Date(Date.UTC(tempStartDate.getFullYear(), tempStartDate.getMonth(), tempStartDate.getDate(), 0, 0, 0, 0)).toUTCString() !== new Date(Date.UTC(tempEndDate.getFullYear(), tempEndDate.getMonth(), tempEndDate.getDate(), 0, 0, 0, 0)).toUTCString()) {
            dateIsDiff = true;
        }

        const startDay: string = tempStartDate.toUTCString().split(',')[0].toString().trim();

        return (
            <div style={{ margin: "0px 10px", display: "flex" }}>
                <div className={styles.buttonArea} ref={this._menuButtonElement}>
                    <DocumentCard onClick={this.documentCardClickedHandler} className={styling.Events}>
                        <div className={styling.MainCard}>
                            <div className={styling.SectionDate}>
                                <div className={styling.DateBoxContainer}>
                                    {
                                        !dateIsDiff ?

                                            <div className={styling.DayBox}>
                                                <div className={styling.SingleMonth}>
                                                    {monthArray[tempStartDate.getUTCMonth()]}
                                                </div>
                                                <div className={styling.SingleDay}>
                                                    {tempStartDate.getUTCDate()}
                                                </div>
                                            </div>
                                            :
                                            <div className={styling.DayBox}>
                                                <div className={styling.MultipleMonthDay}>
                                                    {monthArray[tempStartDate.getUTCMonth()]} {tempStartDate.getUTCDate()}
                                                </div>
                                                <hr className={styling.Seperator} />
                                                <div className={styling.MultipleMonthDay}>
                                                    {monthArray[tempEndDate.getUTCMonth()]} {tempEndDate.getUTCDate()}
                                                </div>
                                            </div>
                                    }
                                </div>
                            </div>
                            <div className={styling.SectionDetails}>
                                <div className={styling.EventDetails}>
                                    <div className={styling.EventCategory}>{Category}</div>
                                    <div className={styling.EventTitle}>{Title}</div>
                                </div>
                                <div className={styling.EventDetails}>
                                    <div className={styling.EventDateTime}>
                                        {startDay}, {this.props.monthArray[tempStartDate.getUTCMonth()]} {tempStartDate.getDate()} {this.props.fAllDayEvent ? "All Day" : `${tempStartDate.getHours()}:${tempStartDate.getMinutes()}`}
                                    </div>
                                    <div className={styling.EventLocation}>{Location}</div>
                                </div>
                            </div>
                        </div>
                    </DocumentCard>
                </div>
                <Callout
                    gapSpace={0}
                    target={this._menuButtonElement.current}
                    onDismiss={this._onCalloutDismiss}
                    setInitialFocus={true}
                    hidden={!this.state.isCallOutVisible}
                    directionalHint={DirectionalHint.rightCenter}
                    className={styling.CallOut}
                >
                    <div className={styles.container}>
                        <div className={styles.title}>
                            <div className={styles.dateBox}>
                                <div className={styles.dateBoxMonth}>{this.props.monthArray[tempStartDate.getMonth()]}</div>
                                <div className={styles.dateBoxDate}>{tempStartDate.getDate()}</div>
                            </div>
                            <div className={styles.eventTitle}>
                                <div className={styles.eventInnerTitle}>{Title}</div>
                                <div>
                                    <ActionButton
                                        iconProps={{
                                            iconName: 'AddEvent'
                                        }}
                                    >
                                        Add to Outlook
                                    </ActionButton>
                                </div>
                            </div>
                        </div>
                        <div>{Description}</div>
                        <div>{Location}</div>
                        <div>{startDay}, {this.props.monthArray[tempStartDate.getUTCMonth()]} {tempStartDate.getDate()} {this.props.fAllDayEvent ? "All Day" : `${tempStartDate.getHours()}:${tempStartDate.getMinutes()}`}</div>
                        <div><Link href={this.itemID}>Click for more details</Link></div>
                    </div>
                </Callout>
            </div>
        );
    }

}
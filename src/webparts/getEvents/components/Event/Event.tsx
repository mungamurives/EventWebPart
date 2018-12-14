import * as React from 'react';
import styling from './Event.module.scss';
import { DocumentCard } from 'office-ui-fabric-react/lib/DocumentCard';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { getTheme, FontWeights, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

export interface IEventsProps {
    Title: string;
    EventDate: string;
    EndDate: string;
    Location: string;
    Category: string;
    fAllDayEvent: boolean;
    monthArray: string[];
    key: any;
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
        maxWidth: 300
    },
    header: {
        padding: '18px 24px 12px'
    },
    title: [
        theme.fonts.xLarge,
        {
            margin: 0,
            color: theme.palette.neutralPrimary,
            fontWeight: FontWeights.semilight
        }
    ],
    inner: {
        height: '100%',
        padding: '0 24px 20px'
    },
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
        const { EndDate, EventDate, monthArray, Category, Title, Location } = this.props;

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
                    directionalHint={DirectionalHint.rightCenter}
                    hidden={!this.state.isCallOutVisible}
                    className="ms-CalloutExample-callout"
                >
                    <div className={styling.HoverCardContainer}>
                        <div className={styling.HoverTitleContainer}>
                            <div>Date Here</div>
                            <div>{Title}</div>
                        </div>
                    </div>
                </Callout>
            </div>
        );
    }

}
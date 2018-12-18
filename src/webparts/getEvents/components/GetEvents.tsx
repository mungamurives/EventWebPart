import * as React from 'react';
import styles from './GetEvents.module.scss';
import { IGetEventsProps } from './IGetEventsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import pnp, { Item } from 'sp-pnp-js';
import { IEventsListItems } from './IEventsListItems';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import Event from '../components/Event/Event';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

export interface IGetEventsState {
  calendarItems: IEventsListItems[];
  showSpinner: boolean;
  isCallOutVisible: boolean;
}

export default class GetEvents extends React.Component<IGetEventsProps, IGetEventsState> {
  private monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  /**
   * Default Constructor
   */
  constructor(props: IGetEventsProps) {
    super(props);
    this.state = {
      calendarItems: [],
      showSpinner: true,
      isCallOutVisible: false
    };
  }

  public componentDidMount() {
    this.getListItems().then(() => { this.setState({ showSpinner: false }); });
  }

  protected getListItems = async () => {
    const tempTodayDate = new Date();
    //logic for today
    const todayDate = tempTodayDate.toISOString().substring(0, 10) + "T00:00:00Z";
    const tempWeekLastDayTemp=tempTodayDate.getDate()-tempTodayDate.getDay()+6;
    //logic for week day
    const weekLastDay=new Date(tempTodayDate.setDate(tempWeekLastDayTemp)).toISOString().substring(0, 10) + "T00:00:00Z";
    //logic for last day
    const monthLastDay=new Date(tempTodayDate.getFullYear(), tempTodayDate.getMonth()+1, 0, 23, 59, 59).toISOString().substring(0, 10) + "T00:00:00Z";

    const calendar = await pnp.sp.web.lists.getById(this.props.listGUID).items.filter(`EventDate ge dateTime'${todayDate}' and EventDate le dateTime'${monthLastDay}'`).configure({
      headers: {
        'Accept': 'application/json;odata=nometadata',
        'odata-version': ''
      }
    }).get().then(el => el);

    let tempGetCalendarItems: IEventsListItems[] = [...this.state.calendarItems];

    if (calendar && calendar.length > 0) {
      calendar.forEach((element: IEventsListItems) => {
        tempGetCalendarItems.push({
          Title: element.Title,
          EventDate: element.EventDate,
          EndDate: element.EndDate,
          Location: element.Location,
          Description: element.Description,
          Category: element.Category,
          fAllDayEvent: element.fAllDayEvent,
          fRecurrence: element.fRecurrence,
          ID: element.ID
        });
      });
    }

    this.setState({
      calendarItems: tempGetCalendarItems
    });

  }


  public render(): React.ReactElement<IGetEventsProps> {
    const showSpinner: JSX.Element = this.state.showSpinner ? <Spinner size={SpinnerSize.large} label={"Loading Data, please wait..."} /> : null;

    const showEvents: JSX.Element = this.state.calendarItems && this.state.calendarItems.length > 0 && !this.state.showSpinner ?
      <div style={{ display: "flex", overflowX: "auto", overflowY: "hidden" }}>
        {
          this.state.calendarItems.map((el, id) =>
            <Event
              Title={el.Title}
              EventDate={el.EventDate}
              EndDate={el.EndDate}
              Location={el.Location}
              Category={el.Category}
              fAllDayEvent={el.fAllDayEvent}
              monthArray={this.monthArray}
              key={id}
              ID={el.ID}
              eventUrl={"#"}
              Description={el.Description}
            />
          )
        }
      </div>
      :
      null;

    return (
      <div>
        {showSpinner}
        {showEvents}
        {/* <Link href={"#"}>See all</Link> */}
      </div>
    );
  }
}

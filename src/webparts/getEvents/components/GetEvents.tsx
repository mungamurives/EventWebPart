import * as React from 'react';
import styles from './GetEvents.module.scss';
import { IGetEventsProps } from './IGetEventsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import pnp, { Item } from 'sp-pnp-js';
import { IEventsListItems } from './IEventsListItems';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import Event from '../components/Event/Event';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import Pagination from './Pagination/Pagination';
import { IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import Filters from './Filters/Filter';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

export interface IGetEventsState {
  calendarItems: IEventsListItems[];
  calendarItemsToBeDisplayed: IEventsListItems[];
  showSpinner: boolean;
  isCallOutVisible: boolean;
  paginationTabs: IChoiceGroupOption[];
  pageSize: number;
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
      calendarItemsToBeDisplayed: [],
      isCallOutVisible: false,
      paginationTabs: [],
      pageSize: 3
    };
  }

  public componentDidMount() {
    const tempTodayDate = new Date();
    const todayDate = tempTodayDate.toISOString().substring(0, 10) + "T00:00:00Z";
    const tempWeekLastDayTemp = tempTodayDate.getDate() - tempTodayDate.getDay() + 6;
    const weekLastDay = new Date(tempTodayDate.setDate(tempWeekLastDayTemp)).toISOString().substring(0, 10) + "T00:00:00Z";
    const queryFilter: string = `EventDate ge dateTime'${todayDate}' and EventDate le dateTime'${weekLastDay}'`;

    this.getListItems(queryFilter).then(() => this.createPagination()).then(() => this.paginationOnChangeHandler(false, { key: "0" })).then(() => { this.setState({ showSpinner: false }); });
  }

  protected getListItems = async (filterQuery: string) => {

    this.setState({
      showSpinner: true
    });


    const calendar = await pnp.sp.web.lists.getById(this.props.listGUID).items.filter(`${filterQuery}`).top(30).configure({
      headers: {
        'Accept': 'application/json;odata=nometadata',
        'odata-version': ''
      }
    }).get().then(el => el);

    let tempGetCalendarItems: IEventsListItems[] = [];

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

  protected createPagination = () => {
    const calendarEvents: IEventsListItems[] = [...this.state.calendarItems];
    let paginationData: IChoiceGroupOption[] = [];
    const { pageSize } = this.state;

    if (calendarEvents && calendarEvents.length > 0) {
      let numberOfPaginatedButtons = Math.ceil(calendarEvents.length / pageSize);

      for (let index = 0; index < numberOfPaginatedButtons; index++) {
        paginationData.push({
          key: index.toString(),
          text: '',
        });
      }
    }

    this.setState({
      paginationTabs: paginationData
    });

  }

  private paginationOnChangeHandler = (ev: any, option: any): void => {
    debugger;
    let tempPaginationSelected: number = parseInt(option.key, 10);
    const { pageSize } = this.state;
    const calendarData: IEventsListItems[] = [...this.state.calendarItems];
    let calendarEventsToBeDisplayed: IEventsListItems[] = [];

    if (calendarData && calendarData.length > 0) {
      for (let index = 0; index < pageSize; index++) {
        if (calendarData[(tempPaginationSelected * pageSize) + index]) {
          calendarEventsToBeDisplayed.push(calendarData[(tempPaginationSelected * pageSize) + index]);
        }
      }
    }

    this.setState({
      calendarItemsToBeDisplayed: calendarEventsToBeDisplayed
    });
  }

  protected filterDropDownChangeHandler = (item: IDropdownOption) => {
    
    const tempTodayDate = new Date();
    //logic for today
    const todayDate = tempTodayDate.toISOString().substring(0, 10) + "T00:00:00Z";
    const tempWeekLastDayTemp = tempTodayDate.getDate() - tempTodayDate.getDay() + 6;
    let queryFilter: string = '';


    if (item.key === 'A') {
      const weekLastDay = new Date(tempTodayDate.setDate(tempWeekLastDayTemp)).toISOString().substring(0, 10) + "T00:00:00Z";
      queryFilter = `EventDate ge dateTime'${todayDate}' and EventDate le dateTime'${weekLastDay}'`;
    }
    else {
      const monthLastDay = new Date(tempTodayDate.getFullYear(), tempTodayDate.getMonth() + 1, 0, 23, 59, 59).toISOString().substring(0, 10) + "T00:00:00Z";
      queryFilter = `EventDate ge dateTime'${todayDate}' and EventDate le dateTime'${monthLastDay}'`;
    }

    this.getListItems(queryFilter).then(() => this.createPagination()).then(() => this.paginationOnChangeHandler(false, { key: "0" })).then(() => { this.setState({ showSpinner: false }); });

  }


  public render(): React.ReactElement<IGetEventsProps> {
    const showSpinner: JSX.Element = this.state.showSpinner ? <Spinner size={SpinnerSize.large} label={"Loading Data, please wait..."} /> : null;

    const showEvents: JSX.Element = this.state.calendarItemsToBeDisplayed && this.state.calendarItemsToBeDisplayed.length > 0 && !this.state.showSpinner ?
      <div style={{ display: "flex" }}>
        {
          this.state.calendarItemsToBeDisplayed.map((el, id) =>
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
              eventUrl={`${this.props.currentUrl}/_layouts/15/Event.aspx?ListGuid=${this.props.listGUID}&ItemId=${el.ID}`}
              Description={el.Description}
            />
          )
        }
      </div>
      :
      null;

    const pagination: JSX.Element = showEvents ?
      <div className={styles.pagination}>
        <Pagination
          paginationOptions={this.state.paginationTabs}
          paginationOnChange={this.paginationOnChangeHandler.bind(this)}
        />
      </div> : null;


    return (
      <div className={styles.getEvents}>
        <Filters
          onFilterDropDownChange={this.filterDropDownChangeHandler.bind(this)}
        />
        {
          showEvents ? showEvents : this.state.showSpinner ? showSpinner :
            <div className={styles.noItemsAvailable}>
              <div className={styles.messageNoItems}>No Events available</div>
            </div>
        }
        {pagination}
        {/* <Link href={"#"}>See all</Link> */}
      </div>
    );
  }
}

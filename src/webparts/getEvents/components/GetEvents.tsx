import * as React from 'react';
import styles from './GetEvents.module.scss';
import { IGetEventsProps } from './IGetEventsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import pnp, { Item } from 'sp-pnp-js';
import { IEventsListItems } from './IEventsListItems';
import { IGetEventsWebPartProps } from '../IGetEventsWebPartProps';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import Event from '../components/Event/Event';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

export interface IGetEventsState {
  calendarItems: IEventsListItems[];
  showSpinner: boolean;
}

export default class GetEvents extends React.Component<IGetEventsProps, IGetEventsState> {

  /**
   * Default Constructor
   */
  constructor(props: IGetEventsProps) {
    super(props);
    this.state = {
      calendarItems: [],
      showSpinner: true
    };
  }

  public componentDidMount() {
    this.getListItems().then(() => { this.setState({ showSpinner: false }); });
  }

  protected getListItems = async () => {
    const calendar = await pnp.sp.web.lists.getById(this.props.listGUID).items.top(3).configure({
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
          fRecurrence: element.fRecurrence
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
      <div className={styles.row}>
        {
          this.state.calendarItems.map(el =>
            <Event
              Title={el.Title}
              EventDate={el.EventDate}
              EndDate={el.EndDate}
              Location={el.Location}
              Category={el.Category}
              fAllDayEvent={el.fAllDayEvent}
            />
          )
        }
      </div>
      :
      null;

    return (
      <div>
        <WebPartTitle
          displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.fUpdateProperty}
        />
        <div className={styles.getEvents}>
          {showSpinner}
          {showEvents}
        </div>
      </div>
    );
  }
}

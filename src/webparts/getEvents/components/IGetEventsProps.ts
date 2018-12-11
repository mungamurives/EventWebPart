import { IEventsListItems } from '../components/IEventsListItems';
import { DisplayMode } from '@microsoft/sp-core-library';
import { IGetEventsWebPartProps } from '../IGetEventsWebPartProps';

export interface IGetEventsProps extends IGetEventsWebPartProps {
  displayMode: DisplayMode;
  fUpdateProperty: (value: string) => void;
  fPropertyPaneOpen: () => void;
}

 import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'GetEventsWebPartStrings';
import GetEvents from './components/GetEvents';
import { IGetEventsProps } from './components/IGetEventsProps';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import pnp, { sp, Items } from 'sp-pnp-js';

//Export the Interface of IGetEventsWebPartProps
import {IGetEventsWebPartProps} from './IGetEventsWebPartProps';
import {IEventsListItems} from './components/IEventsListItems';

export default class GetEventsWebPart extends BaseClientSideWebPart<IGetEventsWebPartProps> {
  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      pnp.setup({
        spfxContext: this.context
      });

    });
  } 
  public render(): void {
    const element: React.ReactElement<IGetEventsProps > = React.createElement(
      GetEvents,
      {
        listGUID:this.properties.listGUID,
        displayMode:this.displayMode,
        title:this.properties.title,
        fUpdateProperty: (value: string) => {
          this.properties.title = value;
        },
        fPropertyPaneOpen: this.context.propertyPane.open,
        currentUrl:this.context.pageContext.web.absoluteUrl
      }
    );
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupFields: [
                PropertyFieldListPicker('listGUID', {
                  label: 'Events list',
                  selectedList: this.properties.listGUID,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId',
                  baseTemplate:106
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

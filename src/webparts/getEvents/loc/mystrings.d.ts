declare interface IGetEventsWebPartStrings {
  PropertyPaneDescription: string;  
  EventsList:string;
  DropDownDescription:string;
}

declare module 'GetEventsWebPartStrings' {
  const strings: IGetEventsWebPartStrings;
  export = strings;
}

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'WhatWeDoWebPartStrings';
import WhatWeDo from './components/WhatWeDo';
import { IWhatWeDoProps } from './components/IWhatWeDoProps';
import { sp } from '@pnp/sp';

export interface IWhatWeDoWebPartProps {
  description: string;
}

export default class WhatWeDoWebPart extends BaseClientSideWebPart <IWhatWeDoWebPartProps> {

  protected onInit(): Promise<void> {
    sp.setup({
      spfxContext: this.context
    });

    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IWhatWeDoProps> = React.createElement(
      WhatWeDo,
      {
        description: this.properties.description
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
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ReportLinksWebPartStrings';
import ReportLinks from './components/ReportLinks';
import { IReportLinksProps } from './components/IReportLinksProps';
import { sp } from "@pnp/sp";

export interface IReportLinksWebPartProps {
  viewall: boolean;
}

export default class ReportLinksWebPart extends BaseClientSideWebPart <IReportLinksWebPartProps> {

  protected onInit(): Promise<void> {
    sp.setup({
      spfxContext: this.context
    });

    return super.onInit();
  }

  public render(): void {
    console.log('viewall', this.properties);
    const element: React.ReactElement<IReportLinksProps> = React.createElement(
      ReportLinks,
      {
        viewall: this.properties.viewall
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
                PropertyPaneToggle('viewall', {
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

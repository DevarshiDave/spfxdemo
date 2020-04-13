import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'DemoMasterApplicationCustomizerStrings';
require('./DemoMaster.css');
require("@pnp/logging");
require("@pnp/common");
require("@pnp/odata");
import { sp } from "@pnp/sp/presets/all";
import * as $ from 'jquery';

const LOG_SOURCE: string = 'DemoMasterApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IDemoMasterApplicationCustomizerProperties {
  // This is an example; replace with your own property
  Top: string;
  Bottom: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class DemoMasterApplicationCustomizer
  extends BaseApplicationCustomizer<IDemoMasterApplicationCustomizerProperties> {

  // These have been added
  private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    // Wait for the placeholders to be created (or handle them being changed) and then render.
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

    return Promise.resolve();
  }

  private _renderPlaceHolders(): void {
    sp.setup({
      spfxContext: this.context
    });

    console.log("HelloWorldApplicationCustomizer._renderPlaceHolders()");
    console.log(
      "Available placeholders: ",
      this.context.placeholderProvider.placeholderNames
        .map(name => PlaceholderName[name])
        .join(", ")
    );

    // Handling the top placeholder
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );

      // The extension should not assume that the expected placeholder is available.
      if (!this._topPlaceholder) {
        console.error("The expected placeholder (Top) was not found.");
        return;
      }

      if (this._topPlaceholder.domElement) {
        this._topPlaceholder.domElement.innerHTML = `
          <div id="mycustomheader" class="topbar">
            <div class="logo">
              <a href="https://onlinesharepoint2013.sharepoint.com/sites/SPFxDemoSite">
                <img src="https://onlinesharepoint2013.sharepoint.com/sites/SPFxDemoSite/Shared%20Documents/logo.jpg" />
              </a>
            </div>            
          </div>`;

        this.getNavItems();
      }
    }
  }

  private _onDispose(): void {
    console.log('[HelloWorldApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  }

  private getNavItems() {
    //hiding the default site header
    $('div[data-sp-feature-instance-id="_Site header host"]').addClass('makeithide');

    sp.web.lists.getByTitle('Header Links').items.select('ID, Title, Link').get().then((result: any[]) => {
      if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          $('#mycustomheader').append(`
          <div class="navitem">
              <a href="`+ result[i].Link.Url + `" class="navlink">
              `+ result[i].Title + `
              </a>
            </div>`);
        }
      }
    });
  }
}

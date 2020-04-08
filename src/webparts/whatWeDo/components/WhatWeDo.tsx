import * as React from 'react';
import styles from './WhatWeDo.module.scss';
import { IWhatWeDoProps } from './IWhatWeDoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import CardLarge from './card-large/CardLarge';
require("@pnp/logging");
require("@pnp/common");
require("@pnp/odata");
import { sp } from "@pnp/sp/presets/all";

export default class WhatWeDo extends React.Component<IWhatWeDoProps, { items: any[] }> {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    }

    this.getItems();
  }

  public render(): React.ReactElement<IWhatWeDoProps> {
    return (
      <div className={styles.whatWeDo}>
        <h2>What We Do</h2>
        <div className={styles.row}>
          {
            this.state.items.map((ele) => {
              return (
                <div className={styles["column-half"]}>
                  <CardLarge id={ele.ID} title={ele.Title} description={ele.description} image={ele.image ? ele.image.Url : ''}></CardLarge>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }

  private getItems() {
    sp.web.lists.getByTitle('What we do').items.select('ID, Title, description, image').orderBy('Created', false).get().then((result: any[]) => {
      this.setState({
        items: result
      });
    });
  }
}

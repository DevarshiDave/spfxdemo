import * as React from 'react';
import styles from './ReportLinks.module.scss';
import { IReportLinksProps } from './IReportLinksProps';
import { escape } from '@microsoft/sp-lodash-subset';
import CardSmall from './card-small/CardSmall';
require("@pnp/logging");
require("@pnp/common");
require("@pnp/odata");
import { sp } from "@pnp/sp/presets/all";

export default class ReportLinks extends React.Component<IReportLinksProps, { items: any[] }> {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }

    this.getItems();
  }

  public render(): React.ReactElement<IReportLinksProps> {
    const viewAllLink = this.props.viewall;
    if (!viewAllLink) {
      return (
        <div className={styles.reportLinks}>
          <h2>Report Links
            <a href="#" className={styles.viewAllLink}>View All</a>
          </h2>
          <div className={styles.row}>
            {
              this.state.items.map((ele) => {
                return (
                  <div className={styles["column-small"]}>
                    <CardSmall id={ele.ID} title={ele.Title} description={ele.description} image={ele.image ? ele.image.Url : ''}></CardSmall>
                  </div>
                )
              })
            }
          </div>
        </div>
      );
    }
    else {
      return (
        <div className={styles.reportLinks}>
          <h2>All Report Links</h2>
        </div>
      )
    }
  }

  private getItems() {
    sp.web.lists.getByTitle('Report Links').items.select('ID, Title, description, image').orderBy('Created', false).get().then((result: any[]) => {
      this.setState({
        items: result.slice(0, 9)
      });
    });
  }
}

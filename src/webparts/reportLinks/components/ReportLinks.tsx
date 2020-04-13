import * as React from 'react';
import styles from './ReportLinks.module.scss';
import { IReportLinksProps } from './IReportLinksProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPComponentLoader } from '@microsoft/sp-loader';
import CardSmall from './card-small/CardSmall';
require("@pnp/logging");
require("@pnp/common");
require("@pnp/odata");
import { sp } from "@pnp/sp/presets/all";
declare var $;

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
    const recentItems = this.state.items.slice(0, 9);
    if (!viewAllLink) {
      return (

        <div className={styles.reportLinks}>
          <h2>Report Links
            <a href="#" className={styles.viewAllLink}>View All</a>
          </h2>
          <div className={styles.row}>
            {
              recentItems.map((ele) => {
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
          <div className={styles.row}>
            <div className={styles["column-small"]}>
              <input type="text" className={styles.searchbar} placeholder="   Search..." />
            </div>
          </div>
          <ul id="itemContainer" className={styles.sliderul}>
            {
              this.state.items.map((ele) => {
                return (
                  <li className={styles.item}>
                    <div className={styles["column-small"]}>
                      <CardSmall id={ele.ID} title={ele.Title} description={ele.description} image={ele.image ? ele.image.Url : ''}></CardSmall>
                    </div>
                  </li>
                )
              })
            }
          </ul>
          <hr />
          <div className="holder"></div>
        </div>
      )
    }
  }

  private getItems() {
    sp.web.lists.getByTitle('Report Links').items.select('ID, Title, description, image').orderBy('Created', false).get().then((result: any[]) => {
      this.setState({
        items: result
      });
    });
  }

  public componentDidMount() {
    console.log('in component did mount');
    if (this.props.viewall) {
      SPComponentLoader.loadScript('https://luis-almeida.github.io/jPages/js/jPages.js', {
        globalExportsName: 'jPages'
      }).then(() => {
        console.log("jPages loaded");
        //TODO: Add your code here now that jQuery is available
        $("div.holder").jPages({
          containerID: "itemContainer",
          perPage: 9,
          startPage: 1,
          startRange: 1,
          midRange: 5,
          endRange: 1
        });
      });
    }
  }
}

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
  private allItems = [];

  constructor(props) {
    super(props);

    this.onSearch = this.onSearch.bind(this);

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
            <a href="https://onlinesharepoint2013.sharepoint.com/sites/SPFxDemoSite/SitePages/Report-Links.aspx" className={styles.viewAllLink} target="_blank">View All</a>
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
              <div className="wrap">
                <div className="search">
                  <input type="text" className="searchTerm" onChange={this.onSearch} placeholder="Search..." />
                  <button type="submit" className="searchButton">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" className="searchIcon" aria-hidden="true" focusable="false"><path d="M20.992 0c1.024 0 1.984.128 2.944.384s1.792.64 2.624 1.088S28.096 2.56 28.8 3.2c.64.704 1.216 1.408 1.728 2.24s.832 1.664 1.088 2.624.384 1.92.384 2.944-.128 1.984-.384 2.944-.64 1.792-1.088 2.624-1.088 1.536-1.728 2.176c-.704.64-1.408 1.216-2.24 1.728s-1.664.832-2.624 1.088-1.92.384-2.944.384c-1.28 0-2.56-.192-3.712-.64a10.46 10.46 0 0 1-3.264-1.92L1.728 31.68c-.192.192-.448.32-.704.32s-.512-.128-.704-.32-.32-.384-.32-.704.128-.512.32-.704l12.224-12.288a12.145 12.145 0 0 1-1.92-3.264c-.448-1.216-.64-2.432-.64-3.712 0-1.024.128-1.984.384-2.944s.64-1.792 1.088-2.624 1.024-1.536 1.728-2.24c.704-.64 1.408-1.216 2.24-1.728S17.088.64 18.048.384C19.008.128 19.968 0 20.992 0zm0 19.968c1.216 0 2.432-.256 3.52-.704s2.048-1.088 2.88-1.92 1.472-1.792 1.92-2.88.704-2.24.704-3.52-.256-2.432-.704-3.52-1.088-2.048-1.92-2.88S25.6 3.2 24.512 2.688c-1.088-.448-2.24-.704-3.52-.704s-2.432.256-3.52.704-2.048 1.088-2.88 1.92-1.472 1.792-1.92 2.88-.704 2.24-.704 3.52.256 2.432.704 3.52 1.088 2.048 1.92 2.88 1.792 1.472 2.88 1.92c1.152.448 2.304.64 3.52.64z"></path></svg>
                  </button>
                </div>
              </div>
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
          <div className={styles.row}>
            <div className={styles.column}>
              <hr />
              <div className="holder"></div>
            </div>
          </div>
        </div>
      )
    }
  }

  private getItems() {
    sp.web.lists.getByTitle('Report Links').items.select('ID, Title, description, image').orderBy('Created', false).get().then((result: any[]) => {
      this.allItems = JSON.parse(JSON.stringify(result));
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
        this.setPagination();
      });
    }
  }

  public onSearch(e: React.ChangeEvent<HTMLInputElement>) {
    let searchText = e.currentTarget.value;

    let filteredItems;
    if (searchText)
      filteredItems = this.allItems.filter(x => x.Title.toLowerCase().indexOf(searchText.toLowerCase()) != -1);
    else
      filteredItems = this.allItems;

    this.setState({
      items: filteredItems
    }, () => {
      this.setPagination();
    });
  }

  setPagination() {
    setTimeout(() => {
      $("div.holder").jPages({
        containerID: "itemContainer",
        perPage: 9,
        startPage: 1,
        startRange: 1,
        midRange: 5,
        endRange: 1
      });

      $('.jp-previous').html('Previous');
      $('.jp-next').html('Next');
    });


  }
}

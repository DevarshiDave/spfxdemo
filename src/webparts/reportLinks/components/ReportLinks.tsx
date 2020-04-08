import * as React from 'react';
import styles from './ReportLinks.module.scss';
import { IReportLinksProps } from './IReportLinksProps';
import { escape } from '@microsoft/sp-lodash-subset';
import CardSmall from './card-small/CardSmall';

export default class ReportLinks extends React.Component<IReportLinksProps, {}> {
  private dummyData = [
    { id: 1, title: 'Lorem Ipsum is simply dum', description: 'Lorem ipsum is simply dummy text for priniting and typesetting industry. Lorem Ipsum is', image: 'https://onlinesharepoint2013.sharepoint.com/sites/SPFxDemoSite/Shared%20Documents/img1.jpg' },
    { id: 2, title: 'Lorem Ipsum is simply dum', description: 'Lorem ipsum is simply dummy text for priniting and typesetting industry. Lorem Ipsum is', image: 'https://onlinesharepoint2013.sharepoint.com/sites/SPFxDemoSite/Shared%20Documents/img2.jpg' },
    { id: 3, title: 'Lorem Ipsum is simply dum', description: 'Lorem ipsum is simply dummy text for priniting and typesetting industry. Lorem Ipsum is', image: 'https://onlinesharepoint2013.sharepoint.com/sites/SPFxDemoSite/Shared%20Documents/img3.jpg' },
    { id: 4, title: 'Lorem Ipsum is simply dum', description: 'Lorem ipsum is simply dummy text for priniting and typesetting industry. Lorem Ipsum is', image: 'https://onlinesharepoint2013.sharepoint.com/sites/SPFxDemoSite/Shared%20Documents/img1.jpg' },
    { id: 5, title: 'Lorem Ipsum is simply dum', description: 'Lorem ipsum is simply dummy text for priniting and typesetting industry. Lorem Ipsum is', image: 'https://onlinesharepoint2013.sharepoint.com/sites/SPFxDemoSite/Shared%20Documents/img2.jpg' },
    { id: 6, title: 'Lorem Ipsum is simply dum', description: 'Lorem ipsum is simply dummy text for priniting and typesetting industry. Lorem Ipsum is', image: 'https://onlinesharepoint2013.sharepoint.com/sites/SPFxDemoSite/Shared%20Documents/img3.jpg' },
    { id: 7, title: 'Lorem Ipsum is simply dum', description: 'Lorem ipsum is simply dummy text for priniting and typesetting industry. Lorem Ipsum is', image: 'https://onlinesharepoint2013.sharepoint.com/sites/SPFxDemoSite/Shared%20Documents/img1.jpg' },
    { id: 8, title: 'Lorem Ipsum is simply dum', description: 'Lorem ipsum is simply dummy text for priniting and typesetting industry. Lorem Ipsum is', image: 'https://onlinesharepoint2013.sharepoint.com/sites/SPFxDemoSite/Shared%20Documents/img2.jpg' },
    { id: 9, title: 'Lorem Ipsum is simply dum', description: 'Lorem ipsum is simply dummy text for priniting and typesetting industry. Lorem Ipsum is', image: 'https://onlinesharepoint2013.sharepoint.com/sites/SPFxDemoSite/Shared%20Documents/img3.jpg' },
  ];
  public render(): React.ReactElement<IReportLinksProps> {
    return (
      <div className={styles.reportLinks}>
        <h2>Report Links
          <a href="#" className={styles.viewAllLink}>View All</a>
        </h2>
        <div className={styles.row}>
          {
            this.dummyData.map((ele) => {
              return (
                <div className={styles["column-small"]}>
                  <CardSmall id={ele.id} title={ele.title} description={ele.description} image={ele.image}></CardSmall>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

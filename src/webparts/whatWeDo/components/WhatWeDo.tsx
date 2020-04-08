import * as React from 'react';
import styles from './WhatWeDo.module.scss';
import { IWhatWeDoProps } from './IWhatWeDoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import CardLarge from './card-large/CardLarge';

export default class WhatWeDo extends React.Component<IWhatWeDoProps, {}> {
  private dummyData = [    
    { id: 4, title: 'Lorem Ipsum is simply dum', description: 'Lorem ipsum is simply dummy text for priniting and typesetting industry. Lorem Ipsum is', image: 'https://onlinesharepoint2013.sharepoint.com/sites/SPFxDemoSite/Shared%20Documents/img1.jpg' },
    { id: 5, title: 'Lorem Ipsum is simply dum', description: 'Lorem ipsum is simply dummy text for priniting and typesetting industry. Lorem Ipsum is', image: 'https://onlinesharepoint2013.sharepoint.com/sites/SPFxDemoSite/Shared%20Documents/img2.jpg' },
    { id: 6, title: 'Lorem Ipsum is simply dum', description: 'Lorem ipsum is simply dummy text for priniting and typesetting industry. Lorem Ipsum is', image: 'https://onlinesharepoint2013.sharepoint.com/sites/SPFxDemoSite/Shared%20Documents/img3.jpg' },
    { id: 7, title: 'Lorem Ipsum is simply dum', description: 'Lorem ipsum is simply dummy text for priniting and typesetting industry. Lorem Ipsum is', image: 'https://onlinesharepoint2013.sharepoint.com/sites/SPFxDemoSite/Shared%20Documents/img1.jpg' },
    { id: 8, title: 'Lorem Ipsum is simply dum', description: 'Lorem ipsum is simply dummy text for priniting and typesetting industry. Lorem Ipsum is', image: 'https://onlinesharepoint2013.sharepoint.com/sites/SPFxDemoSite/Shared%20Documents/img2.jpg' },
    { id: 9, title: 'Lorem Ipsum is simply dum', description: 'Lorem ipsum is simply dummy text for priniting and typesetting industry. Lorem Ipsum is', image: 'https://onlinesharepoint2013.sharepoint.com/sites/SPFxDemoSite/Shared%20Documents/img3.jpg' },
  ];

  public render(): React.ReactElement<IWhatWeDoProps> {
    return (
      <div className={styles.whatWeDo}>
        <h2>What We Do</h2>
        <div className={styles.row}>
          {
            this.dummyData.map((ele) => {
              return (
                <div className={styles["column-half"]}>
                  <CardLarge id={ele.id} title={ele.title} description={ele.description} image={ele.image}></CardLarge>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

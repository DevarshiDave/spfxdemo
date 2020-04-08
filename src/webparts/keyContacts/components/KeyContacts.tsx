import * as React from 'react';
import styles from './KeyContacts.module.scss';
import { IKeyContactsProps } from './IKeyContactsProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class KeyContacts extends React.Component<IKeyContactsProps, {}> {
  private dummyData = [
    { id: 4, fullname: 'John Doe', jobtitle: 'Manager', department: 'IT', image: 'https://onlinesharepoint2013.sharepoint.com/sites/SPFxDemoSite/Shared%20Documents/male.png' },
    { id: 5, fullname: 'Jane Doe', jobtitle: 'User', department: 'IT Dept', image: 'https://onlinesharepoint2013.sharepoint.com/sites/SPFxDemoSite/Shared%20Documents/female.jpg' },
    { id: 6, fullname: 'Nick William', jobtitle: 'Manager', department: 'IT', image: 'https://onlinesharepoint2013.sharepoint.com/sites/SPFxDemoSite/Shared%20Documents/male.png' },
    { id: 7, fullname: 'Anna Smith', jobtitle: 'HR', department: 'HR Dept', image: 'https://onlinesharepoint2013.sharepoint.com/sites/SPFxDemoSite/Shared%20Documents/female.jpg' },
    { id: 8, fullname: 'Diago Brando', jobtitle: 'Account', department: 'Accounts', image: 'https://onlinesharepoint2013.sharepoint.com/sites/SPFxDemoSite/Shared%20Documents/male.png' },
    { id: 9, fullname: 'Jonathan Joe', jobtitle: 'DevOps', department: 'IT', image: 'https://onlinesharepoint2013.sharepoint.com/sites/SPFxDemoSite/Shared%20Documents/male.png' },
  ];

  public render(): React.ReactElement<IKeyContactsProps> {
    return (
      <div className={styles.keyContacts}>
        <h2>Key Contacts</h2>
        <div className={styles.container}>
          {
            this.dummyData.map((ele) => {
              return (
                <div className={styles.row}>
                  <div className={styles["column-small"]}>
                    <img src={ele.image} className={styles["profile-img"]} />
                  </div>
                  <div className={styles["column-large"] + " " + styles["align-middle"]}>
                    <p className={styles["user-name"]}>{ele.fullname}</p>
                    <p><i>{ele.jobtitle}</i></p>
                    <p>{ele.department}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

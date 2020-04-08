import * as React from 'react';
import styles from './KeyContacts.module.scss';
import { IKeyContactsProps } from './IKeyContactsProps';
import { escape } from '@microsoft/sp-lodash-subset';
require("@pnp/logging");
require("@pnp/common");
require("@pnp/odata");
import { sp } from "@pnp/sp/presets/all";

export default class KeyContacts extends React.Component<IKeyContactsProps, { items: any[] }> {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    }

    this.getItems();
  }

  public render(): React.ReactElement<IKeyContactsProps> {
    return (
      <div className={styles.keyContacts}>
        <h2>Key Contacts</h2>
        <div className={styles.container}>
          {
            this.state.items.map((ele) => {
              return (
                <div className={styles.row}>
                  <div className={styles["column-small"]}>
                    <img src={ele.image ? ele.image.Url : ''} className={styles["profile-img"]} />
                  </div>
                  <div className={styles["column-large"] + " " + styles["align-middle"]}>
                    <p className={styles["user-name"]}>{ele.Title}</p>
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

  private getItems() {
    sp.web.lists.getByTitle('Key Contacts').items.select('ID, Title, jobtitle, department, image').orderBy('Created', false).get().then((result: any[]) => {
      this.setState({
        items: result
      });
    });
  }
}

import * as React from 'react';
import styles from './CardSmall.module.scss';
import { ICardSmallProps } from './ICardSmallProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class CardSmall extends React.Component<ICardSmallProps, {}> {
    public render(): React.ReactElement<ICardSmallProps> {
        return (
            <div className={styles["card-small-container"]}>
                <div className={styles.row}>
                    <div className={styles["column-small"]}>
                        <div className={styles["card-image"]}>
                            <img src={this.props.image} height="80px" width="80px" />
                        </div>
                    </div>
                    <div className={styles["column-large"]}>
                        <div className={styles["card-title"]}>
                            {this.props.title}
                        </div>
                        <div className={styles["card-desc"]}>
                            {this.props.description}
                        </div>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles["column-full"] + " " + styles["card-footer"]}>
                        <a href="#">View Details</a>
                    </div>
                </div>
            </div>

        );
    }
}
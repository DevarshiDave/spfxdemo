import * as React from 'react';
import styles from './CardLarge.module.scss';
import { ICardLargeProps } from './ICardLargeProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class CardLarge extends React.Component<ICardLargeProps, {}> {
    public render(): React.ReactElement<ICardLargeProps> {
        return (
            <div className={styles["card-lg-container"]}>
                <div className={styles.row}>
                    <div className={styles.column + " " + styles.noPadding}>
                        <div className={styles["card-image"]}>
                            <img src={this.props.image} />
                        </div>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles["card-title"]}>
                            {this.props.title}
                        </div>
                        <div className={styles["card-desc"]}>
                            {this.props.description}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
import IEntity from "../../core/ITableEntity";
import { v4 as uuid } from 'uuid';

/** 人を示すエンティティ */
export default class TR_User implements IEntity {
    constructor() {
        this.PartitionKey = "default";
        this.RowKey = uuid();
    }
    [key: string]: string | number | boolean | undefined;
    public PartitionKey: string;
    public RowKey: string;

    /** ユーザー名 */
    public UserName?: string;
}
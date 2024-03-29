import IEntity from "../../core/ITableEntity";
import { v4 as uuid } from 'uuid';

/** 個別の肉の焼き具合を示す関連エンティティ */
export default class TT_Preference implements IEntity {
    constructor() {
        this.PartitionKey = "default";
        this.RowKey = uuid();
    }
    [key: string]: string | number | boolean | undefined;
    public PartitionKey: string;
    public RowKey: string;

    /** ユーザー名 */
    public UserName?: string;
    /**  肉の部位 */
    public MeetName?: string;
    /** ユーザー毎の肉の部位別焼け具合時間 */
    public Secound?: number;
}
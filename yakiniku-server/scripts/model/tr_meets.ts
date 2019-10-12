import IEntity from "../../core/ITableEntity";
import { v4 as uuid } from 'uuid';

/** 肉を示すエンティティ */
export default class TR_Meets implements IEntity {
    constructor() {
        this.PartitionKey = "default";
        this.RowKey = uuid();
    }
    [key: string]: string | number | boolean | undefined;
    public PartitionKey: string;
    public RowKey: string;

    /** 肉の名前、ミノ、カルビ、上カルビ、タンとか */
    public MeetName?: string;
    /** 肉をレアで焼く場合のデフォルト時間 */
    public Rare?: number;
    /** 肉をミディアムで焼く場合のデフォルト時間 */
    public Medium?: number;
    /** 肉をウェルダンで焼く場合のデフォルト時間 */
    public Weldan?: number;

}
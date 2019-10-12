import * as storage from "azure-storage";
import * as dotenv from "dotenv";
import { resolve } from "url";

import IEntity from "./ITableEntity";


export default class EntityService {
    private tableService: storage.TableService;
    private tableName: string = "default";
    private constructor() {        
        this.tableService = storage.createTableService();
    }
    static async CreateEntityServiceAsync(tableName: string): Promise<EntityService> {
        var me = new EntityService();
        me.tableName = tableName;
        let error = await me.CreateIfDoesntExistTable();

        return me;
    }
    private async CreateIfDoesntExistTable(): Promise<storage.TableService.TableResult> {
        return new Promise((resolve, reject) => {
            try {
                this.tableService.createTableIfNotExists(this.tableName, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    ;
                    resolve(result);
                });
            }
            catch (err) {
                reject(err);
            }
        });
    }
    async AddOrMergeRecord(record: IEntity): Promise<IEntity> {
        return new Promise<IEntity>((resolve, reject) => {
            try {
                // const tr = record;
                const tr = this.convertToTableRecord(record);
                this.tableService.insertOrMergeEntity(this.tableName, tr, err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(record);
                    }
                });
            }
            catch (err) {
                reject(err);
            }
        });
    }

    async FindAsync(rowKey: string): Promise<IEntity>
    async FindAsync(rowKey: string, partitionKey: string = "default"): Promise<IEntity> {
        return new Promise<IEntity>((resolve, reject) => {
            try {
                this.tableService.retrieveEntity<IEntity>(
                    this.tableName,
                    partitionKey,
                    rowKey,
                    (err, entity) => {
                        if (err) {
                            reject(err);
                        } else {
                            //resolve(entity);
                            resolve(this.tableRecordToJavacript(entity));
                        }
                    });
            }
            catch (err) {
                reject(err);
            }
        });
    }
    private tableRecordToJavacript(entity: IEntity): IEntity {
        let result: any = {};
        Object.keys(entity).forEach(k => {
            if (k !== ".metadata") {
                let prop = Object.getOwnPropertyDescriptor(entity, k);
                if (prop) {
                    result[k] = prop.value["_"];
                }
            }
        });
        return result;
    }
    private convertToTableRecord(entity: IEntity) {
        let result: any = {};
        Object.keys(entity).forEach(k => {
            let prop = Object.getOwnPropertyDescriptor(entity, k);
            if (prop) {
                result[k] = new storage.TableUtilities.entityGenerator.EntityProperty(prop.value);
            }
        });
        return result;
    }
}

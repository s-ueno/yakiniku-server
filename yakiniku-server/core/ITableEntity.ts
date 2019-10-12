export default interface ITableEntity {
    PartitionKey: string;
    RowKey: string;
    [key: string]: string | number | boolean | undefined;
}

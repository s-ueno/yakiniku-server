import express = require('express');

/* モデルを永続化するためのヘルパーを参照 */
import entityService from "../../../core/entityService";

/* 各種モデルを参照 */
import user from "../../model/tr_user";
import meet from "../../model/tr_meets";
import prederence from "../../model/tt_preference";

export default class findUserFacade {

    public async execute(req: express.Request, res: express.Response, next: express.NextFunction) {
        // リクエストパラメーターからユーザー名を取得する
        let userName = req.param("name", "jone do");
        let userService = await entityService.CreateEntityServiceAsync("user");
        let record: user;

        // ひとまず、単純なユーザーをAzure情のストレージに保存・復元するサンプル
        try {
            record = await userService.FindAsync(userName);
        } catch (e) {
            record = {
                PartitionKey: "default",
                RowKey: userName,
                UserName: userName,
            };
            await userService.AddOrMergeRecord(record);
        }
        res.json({ user: record });
    }
}

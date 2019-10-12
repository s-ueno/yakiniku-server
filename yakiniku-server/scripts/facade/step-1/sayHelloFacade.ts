import express = require('express');

export default class sayHelloFacade {

    public execute(req: express.Request, res: express.Response, next: express.NextFunction) {
        // 返すための文字列を整形して・・・
        let result = "こんにちは(^^)/ " + req.param("name", "jone do") + " さん";
        // JSON化して返す
        res.json({
            message: result,
            number_type: 200,
            string_type: "つまりはOK！",
            boolean_type : true
        });
    }
}

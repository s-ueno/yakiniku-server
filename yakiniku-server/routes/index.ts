// リクエストのアドレスに対して、どの処理を割り当てるかを簡単に設定できる
// express framework
import express = require('express');


// 使いたい機能一覧をここに並べる
import index from "../index";
import sayHelloFacade from "../scripts/facade/step-1/sayHelloFacade";
import findUserFacade from "../scripts/facade/step-2/findUserFacade";

// ルーティングを簡単に振り分ける事ができる機能を有効化
const router = express.Router();
const cors = require('cors')({ Origin: true });



// ルートのアドレスにリクエストが来た場合は、このクラスの処理を返す
router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    cors(req, res, () => new index().execute(req, res, next));
});


// hello のアドレスにリクエストが来た場合は、このクラスの処理を返す
router.get('/hello', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    cors(req, res, () => new sayHelloFacade().execute(req, res, next));
});


// find のアドレスにリクエストが来た場合は、このクラスの処理を返す
router.get('/find', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    cors(req, res, () => new findUserFacade().execute(req, res, next));
});

export default router;


const express = require('express')
const app = express()
const port = 8008
const stripe = require('stripe')('sk_test_51JgsTjI1kL9gX8NEY2xmukVMA0F4c5zrCfHT77DFusrx9IV8zUgPqbWj4FP8Y86QBOhv9ZFlvQ07cjNpZzTNm0kQ00HK7KkFEJ');

app.get('/', async(req, res) => {
  //エクスプレスアカウントを使用
  const account = await stripe.accounts.create({
    type: 'standard',
  });
  console.log(account.id);
  // アカウント情報からアカウントIDを取得
  const accountId = account.id;
  // アカウントリンクを作成する
  const accountLinks = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: `http://localhost:${port}/reauth`,
    return_url: `http://localhost:${port}/return`,
    type: 'account_onboarding',
  });
  console.log(accountLinks);
  res.redirect(accountLinks.url)
})

app.get("/reauth", async(req,res)=>{
  console.log("reauth")
})
app.get("/return", async(req,res)=>{
  console.log("return")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

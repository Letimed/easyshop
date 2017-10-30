import { Injectable } from '@angular/core';
declare var require: any



@Injectable()
export class ShopService {

constructor() {
}

getShopType(){
	var unirest = require('unirest');

 	unirest.get("https://datagram-products-v1.p.mashape.com/chains/")
    .header("X-Mashape-Key", "q75JmrJtUImshhVN83hCaxDvQELbp1C5oAXjsnhNMVAXlTf1uh")
    .header("Accept", "application/json")
    .end(function (result) {
    console.log(result.status, result.headers, result.body);
    });
}

async getStoreInfo(id, callback){
	var unirest = require('unirest');

	var res = await unirest.get("https://datagram-products-v1.p.mashape.com/chains/" + id + "/stores/")
	.header("X-Mashape-Key", "q75JmrJtUImshhVN83hCaxDvQELbp1C5oAXjsnhNMVAXlTf1uh")
	.header("Accept", "application/json")
	.end(async function (result){
		//callback(result);
		console.log(result.body);
		return (await result);
  	//console.log(result.body);
	});
	//console.log(res);
	//return res;
}

StoreInfoCallBack(data)
{
	//console.log(data.body);
	//return data;
}

}

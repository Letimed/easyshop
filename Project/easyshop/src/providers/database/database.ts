import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class DatabaseProvider {
	public cmd = null;

  constructor(public http: Http, private sqlite: SQLite) {
    console.log('Hello DatabaseProvider Provider');
  }

  async execSQL(command, log) {
	let db: SQLiteObject;
	try {
	  db = await this.sqlite.create({
	  name: 'data.db',
      location: 'default'
      })
      try {
      	let res =  await db.executeSql(command,{});
      	console.log(log);
      	this.cmd = res;
      	return res.rows;
      }
      catch (e)
      { 
      console.log(e);
      }

	}
	catch(e)
	{ 
		console.log(e);
	}
	}
}

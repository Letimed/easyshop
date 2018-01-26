import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class DatabaseProvider {

  constructor(public http: Http, private sqlite: SQLite) {
    console.log('Hello DatabaseProvider Provider');
  }

  async execSQL(command, log) {
    /*this.sqlite.create({
      name: 'data.db',
      location: 'default'
      })
      .then((db: SQLiteObject) => {
      db.executeSql(command, {})
        .then(() => console.log(log))
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));*/
	
	let db: SQLiteObject;
	try {
	  db = await this.sqlite.create({
	  name: 'data.db',
      location: 'default'
      })
      try {
      	let res =  await db.executeSql(command,{});
      	console.log(log);
      	return res.rows;
      }
      catch (e)
      { console.log(e);}

	}
	catch(e)
	{ console.log(e); }
	}
}

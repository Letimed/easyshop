import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class DatabaseProvider {
	public cmd = null;
	public db: SQLiteObject = null;

  constructor(public http: Http, private sqlite: SQLite) {
  	console.log("HERRRRRRRRRRRE");
  	//this.launchDB();
  }

  async launchDB()
  {
	try {
	  this.db = await this.sqlite.create({
	  name: 'data.db',
      location: 'default'
      })
	}
    catch(e)
	{ 
		console.log(e);
	}
  }

  async execSQL(command, log) {
  	await this.launchDB();
      try {
      	var res =  await this.db.executeSql(command,{});
      	console.log(log);
      	this.cmd = res;
      	return res.rows;
      }
      catch (e)
      { 
      console.log(e);
      }

	}
	
}

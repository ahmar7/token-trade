
import { Injectable } from '@angular/core'; import * as CryptoJS from 'crypto-js';
@Injectable({ providedIn: 'root' }) export class EncrDecrService { //Private Key key = "encrypt!135790";
//constructor constructor() { }
//To encrypt input data public encrypt(password: string): string { return CryptoJS.AES.encrypt(password, this.key).toString(); }
//To decrypt input data public decrypt(passwordToDecrypt: string) { return CryptoJS.AES.decrypt(passwordToDecrypt, this.key).toString(CryptoJS.enc.Utf8); }
}
// Using this service in component class,
import { Component, inject } from '@angular/core'; import { UserinfoComponent } from '../userinfo/userinfo.component'; import { EncrDecrService } from '../encr-decr-service.service';
@Component({ selector: 'app-user-list', standalone: true, imports: [UserinfoComponent], templateUrl: './user-list.component.html', styleUrl: './user-list.component.css' }) export class UserListComponent { user= 'This is user list' encrypt =''; decripted=''; private _text = 'system!1233';
//Constructor constructor(private encrDecrService: EncrDecrService) {}
// ngOnInit(): void { console.log('Password :' + this._text);
// }
}
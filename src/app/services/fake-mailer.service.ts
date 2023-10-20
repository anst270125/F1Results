import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FakeMailerService {
    constructor(private httpClient: HttpClient) {}

    sendEmail(driver: string, subject: string, message: string): Observable<unknown> {
        return this.httpClient.post("https://f1MailPost.com", {
            driver,
            subject,
            message
        });
    }
}

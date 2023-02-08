import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { FbCreateResponse, Post } from './interface';

@Injectable({ providedIn: 'root' })
export class PostsService {
    constructor(private http: HttpClient) { }

    public create(post: Post): Observable<Post> {
        return this.http.post<any>(`${environment.FbDbUrl}/posts.json`, post)
            .pipe(map((response: FbCreateResponse) => {
                return {
                    ...post,
                    id: response.name,
                    date: new Date(post.date)
                }
            }))
    }

    public getAll(): Observable<any> {
        return this.http.get(`${environment.FbDbUrl}/posts.json`)
            .pipe(map((response: { [key: string]: any }) => {
                console.log('response', response)
                return Object.keys(response).map((key) => ({
                    ...response[key],
                    id: key,
                    date: new Date(response[key].date)
                }))
            }))
    }

    public remove(id: string): Observable<any> {
        return this.http.delete(`${environment.FbDbUrl}/posts/${id}.json`);
    }

    public getById(id: string): Observable<any> {
        return this.http.get(`${environment.FbDbUrl}/posts/${id}.json`)
            .pipe(map((post: any) => {
                return {
                    ...post,
                    id,
                    date: new Date(post.date)
                }
            }))
    }

    public update(post: Post): Observable<Post> {
        return this.http.patch<Post>(`${environment.FbDbUrl}/posts/${post.id}.json`, post)
    }
}

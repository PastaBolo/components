import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {
  BobUserConfigSerivce
} from '../../dashboard/ads/coworking/bob-user-config.service';
import * as connexionConfig from '../../config/connexion_config';

@Injectable()
export class ImageService {
  private uploadUrl = `${connexionConfig.baseWsUrl}ImageStorage/UploadImage`;

  constructor(
    private httpClient: HttpClient,
    private bobUserConfigSerivce: BobUserConfigSerivce
  ) {}

  upload(image: File, data: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('data', JSON.stringify(data));
    formData.append('file', image, image.name);

    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${this.bobUserConfigSerivce.token}`
    };

    return this.httpClient.post(this.uploadUrl, formData, {
      headers,
      params: {token: encodeURIComponent(this.bobUserConfigSerivce.token)}
    });
  }
}

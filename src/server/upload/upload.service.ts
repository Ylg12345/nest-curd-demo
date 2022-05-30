import { Injectable } from '@nestjs/common';
import { baseHosts } from 'src/libs/lib';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as Jimp from 'jimp';

const { NODE_ENV } = process.env;
const baseHost = baseHosts[NODE_ENV] || {
  uploadPath: 'public/',
  baseHost: 'http://localhost:3000/',
  domain: 'YLG',
};

@Injectable()
export class UploadService {
  async uploadFile(upload: any) {
    const { filename, path, mimetype } = upload;
    upload.uploaded = 1;
    upload.url = path.replace(baseHost.uploadPath, baseHost.baseHost);
    upload.fileName = filename;

    //加水印
    if (mimetype.includes('image')) {
      const text = baseHost.domain;
      Jimp.read(path).then((image) => {
        const { width, height } = image.bitmap;
        Jimp.loadFont(Jimp.FONT_SANS_16_WHITE).then((font) => {
          return image
            .print(font, width - text.length * 20, height - 50, text)
            .write(path);
        });
      });
    }
    return upload;
  }
}

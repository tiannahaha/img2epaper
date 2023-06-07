const fs = require('fs');
const Jimp = require('jimp');

// 转换明暗阈值
const LUM = 160;

/**
 * 将图片转为灰度模式
 * @param {string} filePath 图片路径
 * @returns {Promise<number[][]>} 灰度图像数组
 */

function toGrayImage(filePath) {
  return Jimp.read(filePath)
    .then((image) => {
      const width = image.bitmap.width;
      const height = image.bitmap.height;
      const result = new Array(height);

      for (let y = 0; y < height; y++) {
        result[y] = new Array(width);
        for (let x = 0; x < width; x++) {
          const rgb = Jimp.intToRGBA(image.getPixelColor(x, y));
          const r = rgb.r;
          const g = rgb.g;
          const b = rgb.b;
          const v = Math.round(0.2125 * r + 0.7154 * g + 0.0721 * b);
          result[y][x] = v;
        }
      }

      return result;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
}

/**
 * 将灰度图像转换为水墨屏支持的图像数据
 * @param {number[][]} image 灰度图像数组
 * @returns {string} 图像数据的十六进制字符串
 */
function getImgDataHex(image) {
  const width = image[0].length;
  const height = image.length;
  let hexString = '';

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x += 8) {
      let byte = 0;
      for (let i = 0; i < 8; i++) {
        const pixelValue = image[y][x + i] > LUM ? 1 : 0;
        byte |= pixelValue << (7 - i);
      }
      hexString += `0x${byte.toString(16)}, `;

    }
    hexString += '\n';
  }
  const arrayLength = width * height / 8;
  return `const unsigned char imageData[${arrayLength}] = {\n${hexString}};`; 
}

function getImgDataBinary(image) {
  const width = image[0].length;
  const height = image.length;
  const byteArray = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x += 8) {
      let byte = 0;
      for (let i = 0; i < 8; i++) {
        const pixelValue = image[y][x + i] > LUM ? 1 : 0;
        byte |= pixelValue << (7 - i);
      }
      byteArray.push(byte);
    }
  }

  return Buffer.from(byteArray);
}

function convertImageHex(inputFile, outputFile) {
  return toGrayImage(inputFile)
    .then((image) => {
      if (image) {
        const imageDataHex = getImgDataHex(image);
        fs.writeFileSync(outputFile, imageDataHex);
        console.log(`Image data saved to ${outputFile}`);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
function convertImageBinary(inputFile, outputFile) {
  return toGrayImage(inputFile)
    .then((image) => {
      if (image) {
        const imageDataBinary = getImgDataBinary(image);
        fs.writeFileSync(outputFile, imageDataBinary);
        console.log(`Image data saved to ${outputFile}`);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = {
  convertImageHex,
  convertImageBinary
};
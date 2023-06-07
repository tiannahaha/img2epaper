# Describe 
This package is used to convert an image into an array that can be displayed on epaper.

The input file should be one of the formats `[.png, .bmp, .jpeg]`, and the output will be either `.c` or `.bin`.
The .c file can be directly copied into the project and used as a global variable.
The .bin file is more suitable for communication over the network, such as obtaining and displaying it through HTTP requests.
It should be noted that the size of the input image must be the same as the screen size!

# Condition
Your node environment should install the following dependencies
```
  "dependencies": {
    "chalk": "^4.0.0",
    "commander": "^10.0.1",
    "jimp": "^0.22.8"
  }
```

# Use&Example

- Enter `imgconvert --help` to view help

The file name must include a file suffix.

- Convert the image to a .c file stored in hexadecimal format.

​    `imgconvert -i <input.png> -o <output.c> -H`
- Convert the image to a .bin file stored in binary format.

​    `imgconvert -i <input.png> -o <output.bin> -B`

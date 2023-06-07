# Describe 
This package is used to convert a png image into an array that can be displayed on the epaper screen.
The .c file can be directly copied into the project and used as a global variable.
The .bin file is more suitable for communication over the network, such as obtaining and displaying it through HTTP requests.

# Condition
Your nodejs environment should install the following dependencies
```
  "dependencies": {
    "chalk": "^4.0.0",
    "commander": "^10.0.1",
    "jimp": "^0.22.8"
  }
```

# Use
The first parameter is the input file, which is one of the types in [.png,.bmp,.jpeg].
The second parameter is the output file.
The file name must include a file suffix.

# Example
- Enter `imgconvert --help` to view help
- Convert the image to a .c file stored in hexadecimal format.
`imgconvert -i <input.png> -o <output.c> -H`
- Convert the image to a .bin file stored in binary format.
`imgconvert -i <input.png> -o <output.bin> -B`

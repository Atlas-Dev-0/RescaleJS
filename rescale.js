const sharp = require("sharp");
const fs = require("fs-extra");
const path = require("path");

class rescale {
  widthInInches;
  heightInInches;
  widthInPixels;
  heightInPixels;
  ppi;
  inputFilePath;
  outputFilePath;
  constructor(
    inputFilePath,
    outputFilePath,
    widthInInches,
    heightInInches,
    ppi,
  ) {
    this.widthInInches = widthInInches;
    this.heightInInches = heightInInches;
    this.ppi = ppi;
    this.inputFilePath = inputFilePath;
    this.outputFilePath = outputFilePath;
  }

  inchesToPixels(inches) {
    return Math.round(inches * this.ppi);
  }
  resize() {
    this.widthInPixels = this.inchesToPixels(this.widthInInches);
    this.heightInPixels = this.inchesToPixels(this.heightInInches);

    sharp(this.inputFilePath)
      .resize(this.widthInPixels, this.heightInPixels)
      .withMetadata({ density: this.ppi })
      .toFile(this.outputFilePath, (err, info) => {
        if (err) {
          console.error("Error:", err);
        } else {
          console.log("Image processed successfully:", info);
        }
      });
  }
}

const rescalejs = () => {
  const inputFilePath = "./imageinput";
  const outputFilePath = "./imageoutput";
  const widthInInches = 20;
  const heightInInches = 28;
  const ppi = 300;

  // Ensure output directory exists
  if (!fs.existsSync(outputFilePath)) {
    fs.mkdirSync(outputFilePath); //change to a better name which is "outputdir"
  }

  // Ensure output directory exists
  if (!fs.existsSync(inputFilePath)) {
    fs.mkdirSync(inputFilePath); //change to a better name which is "outputdir"
  }

  // Read all files from the input directory
  fs.readdir(inputFilePath, (err, files) => {
    if (err) {
      return console.error("Unable to scan directory: " + err);
    }
    // Process each file
    files.forEach((file) => {
      const inputDir = path.join(inputFilePath, file);
      const outputDir = path.join(outputFilePath, file);
      //the image will be inside the imageoutput
      const rescaleClass = new rescale(
        inputDir,
        outputDir,
        widthInInches,
        heightInInches,
        ppi,
      );
      rescaleClass.resize();
    });
  });
};

rescalejs();

const { webkit, devices } = require("playwright");
const prompt = require("prompt");
const colors = require("colors");
const deviceKeys = Object.keys(devices);

(async () => {
  while (true) {
    console.log(
      "The valid devices are the following. Please choose an index.".blue
    );
    console.log(
      deviceKeys.map((device, index) => `${index + 1}: ${device}`).join("\n")
        .yellow
    );
    console.log(`${deviceKeys.length + 1}: None (Laptop)`.yellow);

    const { index } = await prompt.get({
      properties: { index: { type: "number" } },
    });

    const device =
      index === deviceKeys.length + 1
        ? {}
        : devices[deviceKeys[(index - 1) % deviceKeys.length]];

    const browser = await webkit.launch({ headless: false });
    const page = await browser.newPage(device);
    await page.goto("http://localhost:3000");
  }
})();

import "./style.css";
import * as PIXI from "pixi.js";
import smile from "/smile.svg";
import smileInner from "/smile_inner.svg";
import shiny from "/texture.jpg";
import shinyGold from "/gold_foil.jpg";
import vertShad from "/vertShad.txt";
import fragShad from "/fragShad.txt";

const createPet = (
  outline: string,
  outlineMaterial: string,
  fill: string,
  fillMaterial: string
): PIXI.Sprite[] => {
  const outlineSprite = PIXI.Sprite.from(outline);
  const outlineMatSprite = PIXI.Sprite.from(outlineMaterial);
  const fillSprite = PIXI.Sprite.from(fill);
  const fillMatSprite = PIXI.Sprite.from(fillMaterial);
  const pets = [outlineSprite, outlineMatSprite, fillSprite, fillMatSprite];
  for (const pet of pets) {
    pet.width = 600;
    pet.height = 600;
    pet.anchor.set(0.5);
    pet.position.set(400, 400);
  }

  pets[1].mask = pets[0];
  pets[3].mask = pets[2];

  return [outlineSprite, outlineMatSprite, fillSprite, fillMatSprite].reverse();
};

const app = new PIXI.Application<HTMLCanvasElement>({
  background: "#1099bb",
  width: 800,
  height: 800,
});

// const fragShadLod = await PIXI.Assets.load<string>(fragShad);
// const vertShadLod = await PIXI.Assets.load<string>(vertShad);

// generate random seed
const seed = Math.max(1, Math.random() * 360);
const seed2 = Math.max(1, 360 * Math.random());

// Adding the application's view to the DOM
document.body.appendChild(app.view);

const pets = createPet(smile, shiny, smileInner, shinyGold);
pets[0].rotation = seed;
pets[2].rotation = seed2;

for (const pet of pets) {
  app.stage.addChild(pet);
}

const seedTextStyle = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 36,
  fill: "white",
});

const outlineSeedText = new PIXI.Text(`Outline Seed: ${seed}`, seedTextStyle);
const fillSeedText = new PIXI.Text(`Fill Seed: ${seed2}`, seedTextStyle);
fillSeedText.position.set(0, 50);
app.stage.addChild(outlineSeedText);
app.stage.addChild(fillSeedText);

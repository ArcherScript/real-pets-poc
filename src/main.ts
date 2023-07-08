import "./style.css";
import * as PIXI from "pixi.js";
import MumbyOutline from "/MumbyOutline.svg";
import Mumby from "/Mumby.svg";
import shiny from "/texture.jpg";
import shinyGold from "/gold_foil.jpg";
import vertShad from "/vertShad.txt";
import fragShad from "/fragShad.txt";

const resizeAndCenter = (material: PIXI.Sprite, size: number): PIXI.Sprite => {
  material.width = size;
  material.height = size;
  material.anchor.set(0.5);
  material.position.set(400, 400);

  return material;
};

const addAndApplyMask = (
  fill: string,
  fillMaterial: string,
  seed?: number
): PIXI.Sprite[] => {
  const fillSprite = PIXI.Sprite.from(fill);
  const fillMaterialSprite = PIXI.Sprite.from(fillMaterial);
  const materialsToApply = [fillSprite, fillMaterialSprite];
  const fillSpriteRes = resizeAndCenter(fillSprite, 600);
  const fillMaterialSpriteRes = resizeAndCenter(fillMaterialSprite, 800);

  fillMaterialSpriteRes.mask = fillSpriteRes;

  if (seed) {
    fillMaterialSpriteRes.rotation = seed;
  }

  return materialsToApply;
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

const pets = addAndApplyMask(MumbyOutline, shiny, seed);

app.stage.addChild(pets[1]);
app.stage.addChild(pets[0]);

const outline = PIXI.Sprite.from(Mumby);
const resizedOutline = resizeAndCenter(outline, 600);
app.stage.addChild(resizedOutline);
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

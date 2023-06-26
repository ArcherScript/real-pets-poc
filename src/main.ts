import "./style.css";
import * as PIXI from "pixi.js";
import smile from "/smile.svg";
import smileInner from "/smile_inner.svg";
import shiny from "/texture.jpg";
import shinyGold from "/gold_foil.jpg";
import vertShad from "/vertShad.txt";
import fragShad from "/fragShad.txt";

const app = new PIXI.Application<HTMLCanvasElement>({
  background: "#1099bb",
  width: 800,
  height: 800,
});
PIXI.settings.PREFER_ENV = PIXI.ENV.WEBGL2;

const fragShadLod = await PIXI.Assets.load<string>(fragShad);
const vertShadLod = await PIXI.Assets.load<string>(vertShad);

// generate random seed
const seed = Math.max(1, Math.random() * 360);

// Adding the application's view to the DOM
document.body.appendChild(app.view);

const smileSprite = PIXI.Sprite.from(smile);
const backText = PIXI.Sprite.from(shiny);
const backText2 = PIXI.Sprite.from(shinyGold);
const smileInnerSprite = PIXI.Sprite.from(smileInner);
backText.width = 600;
backText.height = 600;
backText2.width = 600;
backText2.height = 600;
smileSprite.width = 600;
smileSprite.height = 600;
smileInnerSprite.width = 600;
smileInnerSprite.height = 600;

backText.anchor.set(0.5);
backText.position.set(300, 300);
backText.angle = seed;

backText2.anchor.set(0.5);
backText2.position.set(300, 300);
backText2.angle = seed;

smileSprite.blendMode = PIXI.BLEND_MODES.DST_ATOP;
backText.mask = smileSprite;
backText2.mask = smileInnerSprite;
app.stage.addChild(backText2);
app.stage.addChild(smileInnerSprite);
app.stage.addChild(backText);
app.stage.addChild(smileSprite);

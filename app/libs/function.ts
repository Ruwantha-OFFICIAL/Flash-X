import fs from 'fs';

type group = 0 | 1 | 2;

const amount:Record<group,number> = {
  0: 1000,
  1: 2000,
  2: 4000
}


export function readTmplet(path: string): string {
  try {
    const text = fs.readFileSync(path, "utf-8");
    return text;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error("Can't Read File: " + message);
  }
}

export type typeOfGenrate = "otp" | "key" | "url";

export function genrater(t:typeOfGenrate):string{
  try {
    let chars:string[];
    let n:number;
    if(t === "otp"){
      chars = ["1","2","3","4","5","6","7","8","9","0"];
      n = 6;
    }else if(t === "key"){
      chars = ["a","b","c","d","e","f","1","2","3","4","5","6","7","8","9"];
      n = 16;
    }else if(t === "url"){
      chars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","p","q","t","u","v","s"];
      n = 12;
    }else{
      throw new Error("Not valid type.")
    }
    let result:string;
    for(let i = 0;i < n;i++){
      let randomIndex:number = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
    return result
  } catch (error) {
    throw new Error(error.message)
  }
}

export {
  amount
}
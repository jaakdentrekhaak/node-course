import { RequestContext } from "@mikro-orm/core";
import { OpenAI } from "openai";
import { gptResponseView } from "../../../contracts/gpt_response.view.js";
import * as fs from "node:fs";
import { Fridge } from "../../../entities/fridge.entity.js";
import { NotFound } from "@panenco/papi";

export const getSummaryAI = async (id: string) => {
  const em = RequestContext.getEntityManager();

  const fridge = await em.findOne(Fridge, { id }, { populate: ["products"] });

  if (!fridge) {
    throw new NotFound("fridgeNotFound", "Fridge not found");
  }

  const productNames = Array.from(
    fridge.products.getItems().map((product) => product.name)
  );

  const json = JSON.parse(
    await fs.promises.readFile("./openai_key.json", "utf8")
  );

  const client = new OpenAI({
    apiKey: json["key"],
  });

  const responseObject = await client.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `The products in the fridge are: ${productNames.join(
          ", "
        )}. Give a short summary of what is in the fridge.`,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  const response = responseObject.choices[0].message.content;
  return { response } as gptResponseView;
};

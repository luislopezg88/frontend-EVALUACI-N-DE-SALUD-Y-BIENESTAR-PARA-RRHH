import { useState } from "react";
import PortalLayout from "../layout/PortalLayout";

export default function Test() {
  const API_KEY = "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";

  async function getCompletion(prompt: string) {
    try {
      const response = await fetch(`https://api.openai.com/v1/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          // prompt: "give a random example of programming language",
          prompt: prompt,
          max_tokens: 5,
        }),
      });

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log("error");
    }
  }

  return (
    <PortalLayout>
      <div className="container">
        <div className="row">
          <div className="card mt-2 mb-5">
            <div className="card-header">
              <h2 className="text-center text-primary ">
                Biblioteca de Recursos
              </h2>
            </div>

            <div className="col-12 col-sm-12 mt-4">
              <div className="">
                <div className="">test</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { RxReload } from "react-icons/rx";

export const IngredientRecognition = () => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [ingredient, setIngredient] = useState("");

  const generateTextToText = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setIngredient("");

    try {
      const response = await fetch("/api/ingredients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (response.ok && data.text) {
        setIngredient(data.text);
      } else {
        setIngredient("Failed to recognize ingredients.");
      }
    } catch (error) {
      console.error(error);
      setIngredient("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const refreshForm = () => {
    setPrompt("");
    setIngredient("");
  };

  return (
    <Tabs defaultValue="ingredient-recognition" className="w-[580px]">
      <TabsList>
        <TabsTrigger value="ingredient-recognition">
          Ingredient Recognition
        </TabsTrigger>
      </TabsList>

      <TabsContent value="ingredient-recognition">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between">
            <div className="text-xl font-semibold">
              Ingredient Recognition
            </div>
            <Button onClick={refreshForm} type="button" variant="outline">
              <RxReload size={16} />
            </Button>
          </div>

          <form
            onSubmit={generateTextToText}
            className="flex flex-col gap-3"
          >
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your food..."
            />

            <Button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Generating..." : "Generate"}
            </Button>
          </form>

          <div>
            <div className="text-xl font-semibold">
              Identified Ingredients
            </div>

            {ingredient ? (
              <div className="mt-2">{ingredient}</div>
            ) : (
              <div className="text-sm text-muted-foreground mt-2">
                First, enter your text to recognize ingredients.
              </div>
            )}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};
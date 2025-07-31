// src/controllers/review.controller.ts
import { PrismaClient, Sentiment } from "@prisma/client";
import { Request, Response }       from "express";
import { classifySentiment }       from "../lib/gemini";
import { extractTags }             from "../lib/tagger";

const prisma = new PrismaClient();

export const createReview = async (req: Request, res: Response) => {
  try {
    const { name, date, rating, product, productType, text, source } = req.body;

    // classify sentiment
    const raw   = await classifySentiment(text);
    const senti = raw === "POSITIVE" ? Sentiment.POSITIVE : Sentiment.NEGATIVE;

    // extract tags via Gemini
    const tags = await extractTags(text); // e.g. ["ราคา","โปรโมชั่น"]

    // create review and upsert tags
    const review = await prisma.review.create({
      data: {
        name,
        date:        new Date(date),
        rating,
        product,
        productType,
        text,
        source,
        sentiment:   senti,
        reviewsTags: {
          create: tags.map((tagName) => ({
            tag: {
              connectOrCreate: {
                where:  { name: tagName },
                create: { name: tagName },
              },
            },
          })),
        },
      },
      include: {
        reviewsTags: { include: { tag: true } },
      },
    });

    return res.status(201).json(review);
  } catch (err) {
    console.error("createReview error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const listReviews = async (req: Request, res: Response) => {
  try {
    const selectedTags = (req.query.tags as string | undefined)
      ?.split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const where: any = { sentiment: Sentiment.POSITIVE };
    if (selectedTags?.length) {
      where.reviewsTags = {
        every: { tag: { name: { in: selectedTags } } },
      };
    }

    const reviews = await prisma.review.findMany({
      where,
      include: {
        reviewsTags: { include: { tag: true } },
      },
      orderBy: [{ date: "desc" }, { rating: "desc" }],
    });

    return res.json(reviews);
  } catch (err) {
    console.error("listReviews error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

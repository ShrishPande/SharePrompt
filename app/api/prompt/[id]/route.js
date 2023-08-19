import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("prompt nor found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("failed to fetch all prompts", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();
    const existringPrompt = await Prompt.findById(params.id);
    if (!existringPrompt)
      return new Response("prompt not found", { staus: 404 });

    existringPrompt.prompt = prompt;
    existringPrompt.tag = tag;
    await existringPrompt.save();
    return new Response(JSON.stringify(existringPrompt), { status: 200 });
  } catch (error) {
    return new Response("failed to update prompt", {
      status: 500,
    });
  }
};

export const DELETE = async (request, { params }) => {
  try {
      await connectToDB();

      // Find the prompt by ID and remove it
      await Prompt.findByIdAndRemove(params.id);

      return new Response("prompt deleted successfully", { status: 200 });
  } catch (error) {
      return new Response("error deleting prompt", { status: 500 });
  }
};
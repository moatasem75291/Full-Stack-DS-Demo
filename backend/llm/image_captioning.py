import os
import logging
from typing import List
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import dotenv
import io
import uvicorn

import PIL.Image
import google.generativeai as genai


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    filename="image_cap_api.log",
)
logger = logging.getLogger(__name__)

dotenv.load_dotenv()
GEMINI_KEY = os.getenv("GEMINI_KEY")

genai.configure(api_key=GEMINI_KEY)

app = FastAPI(title="Image Captioning APP")

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ImageCaptionRequest(BaseModel):
    """
    Represents the structure of the image captioning request.
    Attributes:
        prompt (str): The textual input prompt for generating the image caption.
    """

    prompt: str


async def generate_response(prompt: str, image: PIL.Image.Image):
    """
    Generates a response using the generative AI model based on the given prompt and image.

    Args:
        prompt (str): The textual input used to guide the caption generation.
        image (PIL.Image.Image): The image to be captioned.

    Returns:
        Generator: A generator that streams the response in chunks.

    Raises:
        Exception: If an error occurs during the response generation.
    """
    try:
        model = genai.GenerativeModel(model_name="gemini-1.5-pro")
        response = model.generate_content([prompt, image], stream=True)

        async def response_generator():
            for chunk in response:
                yield f"{chunk.text}"

        return response_generator()

    except Exception as e:
        logger.error(f"Error generating response: {str(e)}")
        raise


@app.post("/generate")
async def generate_caption(prompt: str, image: UploadFile = File(...)):
    """
    Handles requests to generate a caption for a given image based on a prompt.

    Args:
        prompt (str): The textual input to guide the caption generation.
        image (UploadFile): The uploaded image file.

    Returns:
        StreamingResponse: A streaming response containing the generated caption.

    Raises:
        Exception: If an error occurs while processing the request.
    """
    try:
        logger.info(f"Received request with prompt: {prompt}")

        image_content = await image.read()
        pil_image = PIL.Image.open(io.BytesIO())

        logger.info("Image successfully loaded")

        generator = await generate_response(prompt, pil_image)

        return StreamingResponse(generator, media_type="text/plain")

    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        raise


if __name__ == "__main__":
    """
    Entry point for the FastAPI application.
    Starts the server on the specified host and port.
    """
    uvicorn.run(app, host="0.0.0.0", port=7088)

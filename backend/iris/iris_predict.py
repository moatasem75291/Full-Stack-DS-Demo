import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
from typing import List
import uvicorn
import joblib


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    filename="iris_api.log",
)
logger = logging.getLogger(__name__)

model = joblib.load(open("voting_iris_clf.pkl", "rb"))
class_names = ["setosa", "versicolor", "virginica"]

app = FastAPI(title="Iris Prediction API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class IrisFeatures(BaseModel):
    """
    Pydantic model for Iris features input

    Attributes:
        features (List[float]): List of 4 float values representing sepal length, sepal width,
                              petal length, and petal width
    """

    features: List[float]


class IrisPrediction(BaseModel):
    """
    Pydantic model for Iris prediction output

    Attributes:
        flower_name (str): Predicted iris flower species
    """

    flower_name: str


@app.post("/predict", response_model=IrisPrediction)
async def predict_iris(iris_data: IrisFeatures):
    """
    Endpoint to predict iris flower species based on input features

    Args:
        iris_data (IrisFeatures): Input features of the iris flower

    Returns:
        IrisPrediction: Predicted iris species

    Raises:
        HTTPException: If input validation fails
    """
    try:
        if len(iris_data.features) != 4:
            raise HTTPException(
                status_code=400, detail="Exactly 4 features are required"
            )

        features = np.array(iris_data.features).reshape(1, -1)

        prediction = model.predict(features)[0]
        flower_name = class_names[prediction]
        logger.info(f"Prediction made successfully: {flower_name}")
        return IrisPrediction(flower_name=flower_name)

    except Exception as e:
        logger.error(f"Error during prediction: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run("iris_predict:app", host="0.0.0.0", port=7099, reload=True)

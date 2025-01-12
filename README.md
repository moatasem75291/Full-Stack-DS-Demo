# Full-Stack-DS-Demo

## Image Captioning and Iris Classification Project

This project is a full-stack application that combines image captioning using a generative AI model and iris flower classification using a machine learning model. The project is divided into three main components:

1. **Backend for Iris Classification**: A FastAPI-based backend that predicts the species of an iris flower based on input features.
2. **Backend for Image Captioning**: A FastAPI-based backend that generates captions for images using a generative AI model.
3. **Frontend**: A React-based frontend that provides a user interface for interacting with both the Iris Classification and Image Captioning services.

## Project Structure

The project is organized into the following directories:

- **backend/iris**: Contains the FastAPI backend for the Iris Classification service.
- **backend/llm**: Contains the FastAPI backend for the Image Captioning service.
- **frontend**: Contains the React frontend application.
- **models**: Contains the trained machine learning model for Iris Classification.
- **experiments**: Contains experimental notebook code or scripts.
- **run_project.py**: A Python script to run all Docker containers for the project.

## Prerequisites

Before running the project, ensure you have the following installed:

- Docker
- Docker Compose (optional, but recommended for managing multiple containers)
- Python 3.8 or higher
- Node.js (for frontend development, if needed)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/moatasem75291/Full-Stack-DS-Demo.git
cd Full-Stack-DS-Demo.git
```

### 2. Build and Run Docker Containers

The project uses Docker to containerize each component. You can build and run the Docker containers using the provided `run_project.py` script.

**Running the Project**

1. Navigate to the root directory of the project.

2. Run the following command to start all Docker containers:

```bash
python run_project.py
```

This script will start the following containers:

**Iris Classification Backend:** Running on port `7099`

**Image Captioning Backend:** Running on port `7088`

**Frontend:** Running on port `7077`

### 3. Access the Frontend

Once the containers are running, you can access the frontend by navigating to:

```sh
http://localhost:7077
```

The frontend provides two main functionalities:

- **Iris Classification:** Input the sepal length, sepal width, petal length, and petal width to predict the iris species.

- **Image Captioning:** Upload an image and provide a prompt to generate a caption for the image.

### 4. Stopping the Containers

To stop the Docker containers, you can use the following commands:

```bash
docker stop <container-id>
```

Alternatively, you can stop all running containers using:

```bash
docker stop $(docker ps -q)
```

## Backend Services

#### Iris Classification Backend

- **Port:** `7099`

- **API Endpoint:** `http://localhost:7099/predict`

- **Input:** A JSON object containing four features: `sepalLength`, `sepalWidth`, `petalLength`, and `petalWidth` as a _List[float]_.

- **Output:** The predicted iris species (`setosa`, `versicolor`, or `virginica`).

#### Image Captioning Backend

- **Port:** `7088`

- **API Endpoint:** `http://localhost:7088/generate`

- **Input:** An image file and a text prompt.

- **Output:** A generated caption for the image based on the provided prompt.

## Frontend

The frontend is built using React and provides a user-friendly interface for interacting with the backend services. It consists of two main pages:

- **Iris Classification Page:** Allows users to input iris features and get a prediction.

- **Image Captioning Page:** Allows users to upload an image and provide a prompt to generate a caption.

## Dockerfiles

The project includes three Dockerfiles, one for each component:

1. **Dockerfile for Iris Backend:** Located in `backend/iris`.

2. **Dockerfile for Image Captioning Backend:** Located in `backend/llm`.

3. **Dockerfile for Frontend:** Located in `frontend`.

Each Dockerfile contains instructions for building the Docker image for the respective component.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.

2. Create a new branch for your feature or bugfix.

3. Make your changes and commit them.

4. Push your changes to your fork.

5. Submit a pull request to the main repository.

## Acknowledgments

- The Iris Classification model is based on the classic Iris dataset.

- The Image Captioning service uses Google's Gemini generative AI model.

- The frontend is built using React and styled with CSS.

## Contact

- For any questions or feedback, feel free to reach out at [Moatasem](mo5les75291@gmail.com).

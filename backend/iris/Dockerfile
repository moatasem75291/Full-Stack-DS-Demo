FROM python:3.10

WORKDIR /iris_app

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

EXPOSE 7099

CMD ["python", "iris_predict.py"]


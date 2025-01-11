import subprocess
import time
import os


def run_docker_containers():
    containers = [
        {
            "path": r"F:\Fixed Solutions\January\first_week\projects\test\demo\backend\iris",  # Put your own Path to the project
            "command": "docker run -p 7099:7099 iris-app-v2",
        },
        {
            "path": r"F:\Fixed Solutions\January\first_week\projects\test\demo\backend\llm",  # Put your own Path to the project
            "command": "docker run -p 7088:7088 image-cap-app",
        },
        {
            "path": r"F:\Fixed Solutions\January\first_week\projects\test\demo\frontend",  # Put your own Path to the project
            "command": "docker run -p 7077:7077 demo-react-app",
        },
    ]

    for container in containers:
        print(f"Navigating to: {container['path']}")
        os.chdir(container["path"])

        print("Waiting 4 seconds before container launch...")
        time.sleep(4)

        cmd = f"start cmd /k {container['command']}"
        print(f"Running: {cmd}")
        subprocess.Popen(cmd, shell=True)


if __name__ == "__main__":
    run_docker_containers()

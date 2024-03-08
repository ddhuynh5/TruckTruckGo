# Introduction 
TruckTruckGo

# Getting Started

##### File Structure:
```
local_repo/
├── venv
├── frontend
├── backend
├──.dockerignore
├──.gitignore
├──docker-compose.yaml
├── README.md
└── .gitignore
```

1.	Installation & Environment Setup
    * Start a new Python virtual environment
        ```
        python -m venv venv
        ```
    * Activate your virtual environment
        ```
        ./venv/Scripts/activate
        ```
    * Setup a local git repo
        ```
        git init

        git remote add origin https://S23-Team10-Huynh-Bhupathi-Germany-Sandomeno-Spivey@dev.azure.com/S23-Team10-Huynh-Bhupathi-Germany-Sandomeno-Spivey/S23-Team10.Huynh.Bhupathi.Germany.Sandomeno.Spivey/_git/S23-Team10.Huynh.Bhupathi.Germany.Sandomeno.Spivey
        ```
    * Pull **main** branch from Azure DevOps
        ```
        git pull origin main
        ```
2.	Dependencies & Packages
    * Install Python Packages [Make sure to be in /backend]
        ```
        pip install -r requirements.txt
        ```
    * Install Node Packages [Make sure to be in /frontend]
        ```
        npm install

        or

        npm ci
        ```
    * If installing Node packages
        ```
        npm install --save [new-dependency]
        ```

# Build and Test
1. Run Backend Server [Make sure to be in /backend]:
    ```
    python manage.py runserver
    ```
2. Run Frontend Server [Make sure to be in /frontend]:
    ```
    npm start
    ```

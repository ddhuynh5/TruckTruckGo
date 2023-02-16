# Introduction 
CPSC 4910: Good Truck Driver Incentive Program

# Getting Started

##### File Structure:
```
local_repo/
├── venv
├── frontend
├── backend
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
    * Install Packages
        ```
        pip install -r requirements.txt
        ```


# Build and Test
1. Backend:
    ```
    python manage.py runserver
    ```
2. Frontend:
    ```
    npm start
    ```

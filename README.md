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
    * Install Python Packages [Make sure to be in top-level directory]
        ```
        pip install -r requirements.txt
        ```
    * Install Node Packages [Make sure to be in /frontend]
        ```
        npm install
        ```
    * If installing Node packages
        ```
        npm install --save new-dependency
        ```


# Build and Test
1. Backend [Make sure to be in /backend]:
    ```
    python manage.py runserver
    ```
    If you run into this or a similar message:
    ```
    You have 18 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
    Run 'python manage.py migrate' to apply them.
    ```
    Run the following to initialize a local test database:
    ```
    python manage.py makemigrations
    python manage.py migrate
    ```
2. Frontend [Make sure to be in /frontend]:
    ```
    npm start
    ```

running backend:

```cd backend```
```pip install -r requirements.txt```

scrape data:

```python manage.py import_sat_json data/cb-digital-questions.json```

after you make changes to the models.py, you need to migrate the changes to the db:

```python manage.py makemigrations```
```python manage.py migrate```

To create an account to login to the django admin, run:

```python manage.py createsuperuser```

To actually run the backend: 

```python manage.py runserver```
(should be running on port http://127.0.0.1:8000)



Running the frontend:

```cd frontend```
```npm install```
```npm run dev```



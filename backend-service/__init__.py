from flask import Flask
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

app = Flask(__name__)
CORS(app)

engine = create_engine('sqlite:///database.db')
Session = sessionmaker(bind=engine)

from app.routes import edit_task, get_tasks, toggle_task_status, update_task_text

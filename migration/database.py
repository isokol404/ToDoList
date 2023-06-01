import os

from sqlalchemy import create_engine, Column, Integer, String, DateTime, Boolean
from sqlalchemy.orm import declarative_base, sessionmaker

# Получение текущего каталога проекта
project_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Полный путь к файлу базы данных
database_path = os.path.join(project_dir, 'database.db')

# Создание движка SQLAlchemy с указанием полного пути к файлу базы данных
engine = create_engine(f'sqlite:///{database_path}')

# Создание базы данных и установка соединения
Base = declarative_base()
Session = sessionmaker(bind=engine)
session = Session()

# Определение модели таблицы пользователей
class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(50), nullable=False)
    password = Column(String(50), nullable=False)
    email = Column(String(100), nullable=False)

# Определение модели таблицы задач
class Task(Base):
    __tablename__ = 'tasks'

    id = Column(Integer, primary_key=True)
    username = Column(String(50), nullable=False)
    email = Column(String(100), nullable=False)
    task_text = Column(String(150), nullable=False)
    status = Column(Boolean, nullable=False)


# Создание таблицы в базе данных
Base.metadata.create_all(bind=engine)

# Закрытие соединения с базой данных
session.close()
